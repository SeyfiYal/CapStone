from flask import Flask, request, make_response, jsonify, session                                                             
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from models import db,User

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


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

    def post (self):
        data = request.get_json()
        try:
            newUser = User(
                name = data['name'],
                email = data['email'],
                username= data["username"],
                password = data["password"],
            )

            db.session.add(newUser)
            db.session.commit()
            return make_response (newUser.to_dict(), 200)
        except Exception as e:
            # db.session.rollback()
            return make_response({'error': f'{repr(e)}'}, 422)

api.add_resource(Users, '/users')


if __name__ == "__main__":
    app.run(port=5555, debug=True)
