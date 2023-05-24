import os
from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = b'\xef\x81J\x18\x0e\xc9\xb2+\x14BvYn\x80\xca#\x13\x90\x1e\x158\xbfX\x95'
app.config['SESSION_TYPE'] = 'filesystem'

CORS(app, supports_credentials=True)
migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)


@app.route('/')
def index():
    return '<h1> Hello World </h1>'


class Users(Resource): 
    def get(self):
        user_list = [user.to_dict() for user in User.query.all()]
        if len(user_list) == 0:
            return make_response({'error': 'no Users'}, 404)
        return make_response(user_list, 200)

    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                name=data.get('name'),  # Updated to retrieve 'name' from request data
                email=data.get('email'),
                password=data.get('password'),
            )

            db.session.add(new_user)
            db.session.commit()
            return make_response({'message': 'User created'}, 200)
        except Exception as e:
            print('Error:', repr(e))
            return make_response({'error': 'An error occurred'}, 422)


api.add_resource(Users, '/users')


class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password']
        user = User.query.filter_by(email=email).first()
        if user:
            if user.password == password:
                session['user_id'] = user.id
                return make_response({
                    'id': user.id,
                    'name': user.name,
                    'username': user.username,
                    'email': user.email
                    # Include other relevant attributes
                }, 200)
            else:
                return make_response({'error': 'Incorrect password'}, 401)
        return make_response({'error': 'User not found'}, 401)


api.add_resource(Login, '/login')


class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized session'}, 401


api.add_resource(CheckSession, '/check_session')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
