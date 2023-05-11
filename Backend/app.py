import jwt
from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timedelta
from functools import wraps
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

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
        print(request.headers)
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
    print(data)
    if users.find_one({'username': data['username']}):
        return jsonify({'message': 'Username already exists'}), 400
    
    hashed_password = generate_password_hash(data['password'], method='sha256')
    user = {'username': data['username'], 'password': hashed_password,'email': data['email']}
    users.insert_one(user)
    return jsonify({'message': 'User registered successfully'})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
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


@app.route('/android', methods=['POST'])
def androiduser():
    data = request.get_json()
    email = data['email']
    return jsonify({'message': 'Hello, Android User! you sent'+ str(email)})



@app.route('/dashboard')
@token_required
def protected(current_user):
    return jsonify({'message': f'Hello, {current_user["username"]}!'})

if __name__ == '__main__':
    app.run()
