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
from Web3_storageAPI.rest import REST_WEB3
load_dotenv()


web3 = REST_WEB3()

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
    if not user or not (user['peerId'] == data['peerId']):
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
    # print(data)
    filename = request.form.get('filename')
    print(filename)

    if not data:
        return jsonify({'message': 'No file selected'}), 400
    
    # data.save(f'./files/{filename}')
    # uploa dto IPFS and save hash in DB
    ret = web3.addFileToIPFS(data, filename)
    
    return jsonify({
        'message': 'File uploaded successfully',
        'web3': ret
    })



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
        space=current_user['storageRented']
        print(space)
        temp_ret = {
    "username": current_user["username"],
    "peerId": current_user["peerId"],
    "storage_rented": space,
    "coins_earned": random.uniform(0.000000,10.000000),
    "bandwidth_used": random.randint(4000,10000),
    "data_uploaded": random.randint(4000,10000),
    "data_downloaded": random.randint(4000,10000),
    "space_used": random.randint(1,int(space-1))
    }
    except Exception as e:
        print("Error", e)
        return jsonify({'message': 'Invalid username or PeerID'}), 401

    return temp_ret


@app.route('/get_file_list', methods=['POST'])
@token_required
def get_file_list(current_user):
    try:
        temp_ret = web3.getAllFiles()
        ret = []
        for i in temp_ret:
            ret.append({
                "_id": i['_id'],
                "name": i['name'],
                "cid": i['cid'],
                "type": i['type']
            })
            
        return ret
    except Exception as e:
        print("Error", e)
        return jsonify({'message': 'Invalid Credentials'}), 401


@app.route('/download_file', methods=['POST'])
@token_required
def download_file(current_user):
    try:
        cid = request.json.get('cid')
        strng = "https://"+cid+".ipfs.w3s.link/"

        return {"url": strng}
    except Exception as e:
        print("Error", e)
        return jsonify({'message': 'Invalid Credentials'}), 401




@app.route('/addpeer', methods=['POST'])
def addPeer(current_user):
    peer = request.json.get('peerId')
    if peer:
        users.update_one(
            {'_id': ObjectId(current_user['_id'])},
            {'$set': {'peerId': peer}}
        )
        return jsonify({'message': 'PeerID added successfully'})
    else:
        return jsonify({'message': 'Missing peerId field in request body'})

# _id type name cid



if __name__ == '__main__':
    app.run()
