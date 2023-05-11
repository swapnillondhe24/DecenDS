from flask import Flask, jsonify, request
from flask_cors import CORS

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt_identity
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Sequence, Float,PrimaryKeyConstraint, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, backref
from sqlalchemy.sql import *
import os
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
import pymysql
from flask_jwt_extended import JWTManager

Base = declarative_base()

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
cors = CORS(app)

app.config['JWT_SECRET_KEY'] = 'my-secret-key'
jwt = JWTManager(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Shantanu_.003@localhost/ingredients_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


def connect_db():
    #_load_db_vars()
    # create db create_engine
    db = create_engine('mysql://root:Shantanu_.003@localhost/ingredients_db')
    return db



db=connect_db() #establish connection
Session = sessionmaker(bind=db)
session = Session()



class Ingredient(Base):
    __tablename__ = 'ingredients'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit = Column(String(50), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)



class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), nullable=False)

    ingredients = relationship('Ingredient', backref='user', lazy=True)

    def get_token(self, expires_delta=None):
        return create_access_token(identity=self.id, expires_delta=expires_delta)

engine = connect_db()
User.__table__.create(bind=engine, checkfirst=True)
Ingredient.__table__.create(bind=engine, checkfirst=True)




@app.route('/api/users/<int:user_id>/ingredients', methods=['GET'])
def get_user_ingredients(user_id):
    # user = session.query(User).(user_id)
    ingredients = session.query(Ingredient).filter_by(user_id=user_id).all()
    result_lst = []
    for ingredient in ingredients:    
        result_dict = {
            "name" : ingredient.name, 
            "unit" : ingredient.unit, 
            "quantity": ingredient.quantity}
        result_lst.append(result_dict)
    
    return jsonify(result_lst) 



@app.route('/api/users/<int:user_id>/ingredients', methods=['POST'])
def add_ingredient(user_id):
    name = request.json['name']
    quantity = request.json['quantity']
    unit = request.json['unit']

    user = session.query(User).filter_by(id=user_id).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    ingredient = Ingredient(name=name.capitalize(), quantity=quantity, unit=unit, user_id=user_id)

    session.add(ingredient)
    session.commit()

    return jsonify({'message': 'Ingredient added successfully'}), 201


@app.route('/api/users/<int:user_id>/ingredients/<string:name>', methods=['PUT'])
def update_ingredient(user_id, name):
    # get the user and ingredient
    # user = User.query.get(user_id)
    ingredient = session.query(Ingredient).filter_by(name=name.capitalize(), user_id=user_id).first()

    # check if the ingredient exists and belongs to the user
    if not ingredient:
        return jsonify({'error': 'Ingredient not found'}), 404

    # update the ingredient data from the request
    ingredient_data = request.json
    ingredient.name = ingredient_data['name']
    ingredient.quantity = ingredient_data['quantity']
    ingredient.unit = ingredient_data['unit']

    # save the changes to the database
    session.commit()

    return jsonify({'message': 'Ingredient updated successfully'})

@app.route('/api/users/<int:user_id>/ingredients/<int:ingredient_id>', methods=['DELETE'])
def delete_ingredient(user_id, ingredient_id):
    # First, check if the ingredient exists and belongs to the user
    ingredient = session.query(Ingredient).filter_by(id=ingredient_id, user_id=user_id).first()
    if not ingredient:
        return jsonify({'error': 'Ingredient not found or does not belong to this user'}), 404

    # Delete the ingredient
    session.delete(ingredient)
    session.commit()

    # Return a success response
    return jsonify({'message': 'Ingredient deleted successfully'}), 200


@app.route('/api/add_user', methods=['POST'])
def add_user():
    email = request.json['email']
    password = request.json['password']
    
    # Check if user with email already exists
    user = session.query(User).filter_by(email=email).first()
    if user:
        return jsonify({'error': 'User with email already exists.'})

    # Create new user
    new_user = User(email=email, password=password)
    # new_user.set_password(password)
    session.add(new_user)
    session.commit()

    # Issue a JWT for the user "added newly"
    access_token = new_user.get_token()
    
    return jsonify({'message': 'User added successfully.', 'access_token': access_token})

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = session.query(User).get(user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    # get the request data
    data = request.get_json()

    # update user data
    user.email = data['email']
    user.password = data['password']

    try:
        session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    except:
        session.rollback()
        return jsonify({'message': 'Failed to update user'}), 500
    finally:
        session.close()

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = session.query(User).get(user_id)
    if not user:
        return jsonify({'message': 'User not found.'}), 404

    session.delete(user)
    session.commit()
    return jsonify({'message': 'User deleted successfully.'}), 200


@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # db fetch
    users = session.query(User).all()

    # Find user by email and password
    user = None
    for u in users:
        if u.email == email and u.password == password:
            user = u
            break

    if not user:
        return jsonify({'message': 'Invalid email or password'}), 401

    # Login the user using Flask-Login
    # login_user(user)

    # Generate and return JWT token
    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token}), 200


if __name__ == "__main__":
    app.run(debug=True)