import string
from flask_restful import Api
import jwt
from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timedelta
from functools import wraps
import os
from flask_cors import CORS
import random
from Web3_storageAPI.rest import REST_WEB3
from dotenv import load_dotenv
from flask import Flask, render_template, request
from flask_mail import Mail, Message


load_dotenv()


web3 = REST_WEB3()

app = Flask(__name__)
cors = CORS(app,resources={r"/*": {"origins": "*"}})
cors = CORS(app,resources={r"/api/*": {"origins": "*"}})

uri = os.getenv("MONGO_URI")
secret = os.getenv("SECRET_KEY")

client = MongoClient(uri)
db = client['DecenDS']
users = db['DecenDS_users']
app.config['SECRET_KEY'] = secret





app.config['MAIL_SERVER'] = 'smtp.titan.email'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'noreply@decends.live'
app.config['MAIL_PASSWORD'] = '!DecenDS@2023'

mail = Mail(app)


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
    peer_id = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
    # print(data)
    if users.find_one({'username': data['username']}):
        return jsonify({'message': 'Username already exists'}), 400
    
    hashed_password = generate_password_hash(data['password'], method='sha256')
    user = {'username': data['username'], 'password': hashed_password,'email': data['email'], 'peerId': peer_id,"storageRented": 0,"activeTime": 0,"files": []}
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



@app.route('/upload_file', methods=['POST','GET'])
@token_required
def upload_file(current_user):
    
    data = request.files['file']
    print(data)
    filename = request.form.get('filename')

    print(filename)

    if not data:
        return jsonify({'message': 'No file selected'}), 400
    
    # data.save(f'./files/{filename}')
    # uploa dto IPFS and save hash in DB
    ret = web3.addFileToIPFS(data, filename)

    cid = ret['cid']

    users.update_one(
            {'_id': ObjectId(current_user['_id'])},
            {'$push': {'files': cid}}
        )
    
    return jsonify({
        'message': 'File uploaded successfully',
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
        return jsonify({'message': f'{current_user["username"]} has been onboarded! with {storage_rented} MB of storage'})
    else:
        return jsonify({'message': 'Missing storageRented field in request body'})


@app.route('/rateinout', methods=['POST'])
@token_required
def rateinout(current_user):
    print(request.json)
    rin = request.json.get('RateIn')
    rout = request.json.get('RateOut')
    tin = request.json.get('TotalIn')
    tout = request.json.get('TotalOut')
    if rin and rout and tin and tout:
        try:
            users.update_one(
                {'_id': ObjectId(current_user['_id'])},
                {'$set': {'RateIn': rin,'RateOut': rout,'TotalIn': tin,'TotalOut': tout}}
            )
        except Exception as e:
            print(e)
            return jsonify({'message': 'Date update failed'}),401
        return jsonify({'message': 'Data updated successfully'}),200
    else:
        return jsonify({'message': 'Date missing'}),400



@app.route('/dashboard', methods=['POST'])
@token_required
def dashboard(current_user):
    try:
        space = current_user["storageRented"]
    except:
        return jsonify({'message': 'User has not been onboarded yet'}), 400
    
    
    try:
        temp_ret = {
    "username": current_user["username"],
    "peerId": current_user["peerId"],
    "storage_rented": space,
    "coins_earned": round(random.uniform(0.000, 0.0004) * space, 5),
    "bandwidth_used": random.randint(4000,10000),
    "data_uploaded": random.randint(4000,10000),
    "data_downloaded": random.randint(4000,10000),
    "space_used": "0.00 MB"
    }
    except Exception as e:
        print("Error", e)
        return jsonify({'message': 'Invalid username or PeerID'}), 401

    return temp_ret


@app.route('/get_file_list', methods=['POST'])
@token_required
def get_file_list(current_user):
    files = current_user['files']
    # print("files: ",files)
    try:
        temp_ret = web3.getAllFiles()
        ret = []
        for i in temp_ret:
            if i['cid'] in files:
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


# @app.route('/download_file', methods=['POST'])
# @token_required
# def download_file(current_user):
#     try:
#         cid = request.json.get('cid')
#         strng = "https://"+cid+".ipfs.w3s.link/"

#         return {"url": strng}
#     except Exception as e:
#         print("Error", e)
#         return jsonify({'message': 'Invalid Credentials'}), 401
    

@app.route('/send_reset_email', methods=['POST'])
def send_reset_email():
    email = request.json['email']
    # print(email)

    # Generate a random OTP (6 digits)
    otp = ''.join(str(random.randint(0, 9)) for _ in range(6))

    try:
        users.find_one({'email': email})
    except:
        return {"status":"failure","message":'Email not found, Please register first'}

    users.update_one(
            {'email': email},
            {'$set': {'otp': otp}}
        )
    # Create the email message

    message = Message(subject='Password Reset')
    message.sender = app.config['MAIL_USERNAME']
    message.recipients = [email]
    message.body = f"Your password reset OTP is: {otp}"

    try:
        # Send the email
        mail.send(message)
        return {"status":"success","message":'Email sent successfully'}
    
    except Exception as e:
        print("Error", e)
        return {"status":"failure","message":'Unable to send otp at this time, Please try again later'}
    


@app.route('/verify_otp', methods=['POST'])
def verify_otp():

    try:
        email = request.json['email']
    except:
        return {"status":"failure","message":'Email not found'}
    
    
    try:
        otp = str(request.json['otp'])
    except:
        return {"status":"failure","message":'OTP not found'}

    
    try:
        password = request.json['newPassword']
    except:
        return {"status":"failure","message":'Password not found'}
    

    try:
        user_otp = str(users.find_one({'email': email})['otp'])
    except:
        return {"status":"failure","message":'User email or username incorrect or does not exist or OTP is incorrect'}

    hashed_password = generate_password_hash(password, method='sha256')

    if otp == user_otp:

        users.update_one(
            {'email': email},
            {'$unset': {'otp': ''}}
        )
        users.update_one(
            {'email': email},
            {'$set': {'password': hashed_password}}
        )

        return {"status":"success","message":'OTP verified successfully'}
    else:
        return {"status":"failure","message":'OTP verification failed'}



@app.route('/addpeer', methods=['POST'])
@token_required
def add_peer(current_user):
    try:
        peer_id = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
        users.update_one({'_id': current_user['_id']}, {'$set': {'peerId': peer_id}})
        return jsonify({'peerId': peer_id})
    
    except Exception as e:
        print("Error", e)
        return jsonify({'message': 'Invalid Credentials'}), 401
    


@app.route('/active_time', methods=['POST'])
@token_required
def active_time(current_user):
    try:
        active_time = request.json.get('active_time')
        if active_time:
            try:
                users.update_one(
                {'_id': ObjectId(current_user['_id'])},
                {'$inc': {'activeTime': active_time}}
                )
                print("update")
                return jsonify({'message': f'{current_user["username"]} active time has been updated!'})
            except:
                users.update_one(
                {'_id': ObjectId(current_user['_id'])},
                {'$set': {'activeTime': active_time}}
                )
                print("Set")
                return jsonify({'message': f'{current_user["username"]} active time has been Set!'})
        else:
            return jsonify({'message': 'Missing active_time field in request body'}), 400
    except Exception as e:
        print("Error", e)
        return jsonify({'message': 'Error occurred while updating active time'}), 500



# @app.route('/addpeer', methods=['POST'])
# @token_required
# def addPeer(current_user):
#     peer = request.json.get('peerId')
#     if peer:
#         users.update_one(
#             {'_id': ObjectId(current_user['_id'])},
#             {'$set': {'peerId': peer}}
#         )
#         return jsonify({'message': 'PeerID added successfully'})
#     else:
#         return jsonify({'message': 'Missing peerId field in request body'})

# _id type name cid


# Configure Flask-Mail settings



if __name__ == '__main__':
    app.run()
