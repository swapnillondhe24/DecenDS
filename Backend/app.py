from flask_restful import Api
import jwt
from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timedelta
from functools import wraps
from dotenv import load_dotenv
import os
from flask_cors import CORS
import random

load_dotenv()



app = Flask(__name__)
cors = CORS(app)

uri = os.getenv("MONGO_URI")
secret = os.getenv("SECRET_KEY")

client = MongoClient(uri)
db = client['DecenDS']
users = db['DecenDS_users']
app.config['SECRET_KEY'] = secret

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # print(request.headers)
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[0]

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = users.find_one({'_id': ObjectId(data['user_id'])})
        except:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/register', methods=['POST'])
def register():
    
    data = request.get_json()
    # print(data)
    if users.find_one({'username': data['username']}):
        return jsonify({'message': 'Username already exists'}), 400
    
    hashed_password = generate_password_hash(data['password'], method='sha256')
    user = {'username': data['username'], 'password': hashed_password,'email': data['email']}
    users.insert_one(user)
    return jsonify({'message': 'User registered successfully'})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    # print(data)
    user = users.find_one({'username': data['username']})
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Invalid username or password'}), 401
    # Generate JWT token
    payload = {
        'user_id': str(user['_id']),
        'exp': datetime.utcnow() + timedelta(minutes=30)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'token': token})



@app.route('/android_auth', methods=['POST'])
def android_auth():
    data = request.get_json()
    user = users.find_one({'username': data['username']})
    if not user or not (user['peerId'] != data['peerId']):
        return jsonify({'message': 'Invalid username or PeerID'}), 401
    # Generate JWT token
    payload = {
        'user_id': str(user['_id']),
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'token': token})



@app.route('/upload_file', methods=['POST'])
@token_required
def upload_file(current_user):
    data = request.files['file']
    filename = request.get_json()['filename']

    if not data:
        return jsonify({'message': 'No file selected'}), 400
    
    # data.save(f'./files/{filename}')
    # uploa dto IPFS and save hash in DB
    return jsonify({'message': 'File uploaded successfully'})



@app.route('/onboarding', methods=['POST'])
@token_required
def onboarding(current_user):
    storage_rented = request.json.get('storageRented')
    if storage_rented:
        users.update_one(
            {'_id': ObjectId(current_user['_id'])},
            {'$set': {'storageRented': storage_rented}}
        )
        return jsonify({'message': f'{current_user["username"]} has been onboarded! with {storage_rented} GB of storage'})
    else:
        return jsonify({'message': 'Missing storageRented field in request body'})




@app.route('/dashboard', methods=['POST'])
@token_required
def dashboard(current_user):
    try:
        temp_ret = {
    "username": current_user["username"],
    "peerId": current_user["peerId"],
    "storage_rented": current_user["storage_rented"],
    "coins_earned": random.uniform(0.000000,10.000000),
    "bandwidth_used": random.randint(4000,100000),
    "data_uploaded": random.randint(4000,100000),
    "data_downloaded": random.randint(4000,100000),
    "space_used": random.randint(current_user['spacerented'])
    }
    except:
        return jsonify({'message': 'Invalid username or PeerID'}), 401

    return temp_ret




if __name__ == '__main__':
    app.run()
