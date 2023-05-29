import os
from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from models import db, User, Message, ChatbotResponse

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
    def post(self):
        data = request.get_json()
        username = data.get('username')
        if not username:
            return make_response({'error': 'Username is required'}, 422)

        try:
            new_user = User(
                name=data.get('name'),
                username=username,
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
                    'email': user.email,
                    'user_id': session['user_id']  # return user_id to frontend
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

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return make_response({'message': 'Logged out successfully'}, 200)


class UserEmail(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return {'email': user.email}
        else:
            return make_response({'error': 'User not found'}, 401)

api.add_resource(UserEmail, '/user/email')

class Messages(Resource):
    def post(self):
        data = request.get_json()
        user_id = session.get('user_id')
        if not user_id:
            return make_response({'error': 'User not authenticated'}, 401)

        content = data.get('content')
        if not content:
            return make_response({'error': 'Message content is required'}, 422)

        try:
            new_message = Message(
                content=content,
                user_id=user_id
            )
            db.session.add(new_message)
            db.session.commit()

            # Generate a chatbot response here. This is a placeholder.
            # Replace with your chatbot's actual response generation logic.
            response_content = "Response to: " + content

            new_response = ChatbotResponse(
                message_id=new_message.id,
                user_id=user_id,
                response_content=response_content
            )
            db.session.add(new_response)
            db.session.commit()

            return make_response({'message': 'Message and response created'}, 200)
        except Exception as e:
            print('Error:', repr(e))
            return make_response({'error': 'An error occurred'}, 422)



api.add_resource(Messages, '/messages')

@app.route('/responses', methods=['POST'])
def create_response():
    content = request.json.get('response_content', '')
    message_id = request.json.get('message_id', '') 
    user_id = request.json.get('user_id', '')
    chatbotresponse = ChatbotResponse(
        message_id = message_id,
        user_id = user_id,
        response_content = content
    )
    db.session.add(chatbotresponse)
    db.session.commit()
    return jsonify({'id': chatbotresponse.id}), 201





class PastMessages(Resource):
    def get(self, user_id):
        messages = Message.query.filter(Message.user_id == user_id).all()
        responses = ChatbotResponse.query.filter(ChatbotResponse.user_id == user_id).all()

        # Preparing the messages data
        messages_data = []
        for message in messages:
            message_data = {
                "message_id": message.id,
                "content": message.content,
                "user_id": message.user_id
            }
            messages_data.append(message_data)
        
        # Preparing the responses data
        responses_data = []
        for response in responses:
            response_data = {
                "response_id": response.id,
                "message_id": response.message_id,
                "user_id": response.user_id,
                "response_content": response.response_content
            }
            responses_data.append(response_data)

        return make_response({'messages': messages_data, 'responses': responses_data}, 200)

api.add_resource(PastMessages, '/past_messages/<user_id>')


if __name__ == "__main__":
    app.run(port=5555, debug=True)


# class PastMessages(Resource):
#     def get(self, user_id):
#         messages = Message.query.filter(Message.user_id == user_id).all()
#         responses = ChatbotResponse.query.filter(ChatbotResponse.user_id == user_id).all()

#         message_list = [message.to_dict() for message in messages]
#         response_list = [response.to_dict() for response in responses]

#         return {'messages': message_list, 'responses': response_list}

# api.add_resource(PastMessages, '/past_messages/<int:user_id>')



# @app.route('/messages/<user_id>', methods=['GET'])
# def get_messages(user_id):
#     # Fetch all messages and responses for the specified user from the database
#     messages = Message.query.filter_by(user_id=user_id).all()
#     responses = ChatbotResponse.query.filter_by(user_id=user_id).all()

#     # Convert the messages and responses to dictionaries so they can be JSON serialized
#     messages = [message.__dict__ for message in messages]
#     responses = [response.__dict__ for response in responses]

#     # Return the messages and responses as JSON
#     return jsonify({'messages': messages, 'responses': responses})




# class Messages(Resource):
#     def post(self):
#         data = request.get_json()
#         user_id = session.get('user_id')
#         if not user_id:
#             return make_response({'error': 'User not authenticated'}, 401)

#         content = data.get('content')
#         if not content:
#             return make_response({'error': 'Message content is required'}, 422)

#         try:
#             new_message = Message(
#                 content=content,
#                 user_id=user_id
#             )

#             db.session.add(new_message)
#             db.session.commit()
#             return make_response({'message': 'Message created'}, 200)
#         except Exception as e:
#             print('Error:', repr(e))
#             return make_response({'error': 'An error occurred'}, 422)


# api.add_resource(Messages, '/messages')



    

# class Messages(Resource): 
#     def get(self, user_id):
#         user = User.query.get(user_id)
#         if user:
#             return jsonify([message.to_dict() for message in user.messages])
#         else:
#             return make_response({'error': 'User not found'}, 404)

#     def post(self, user_id):
#         data = request.get_json()
#         message = Message(content=data.get('content'), user_id=user_id)
#         db.session.add(message)
#         db.session.commit()
#         return make_response({'message': 'Message created'}, 200)

# api.add_resource(Messages, '/users/<int:user_id>/messages')






# class Messages(Resource):
#     def post(self):
#         data = request.get_json()
#         content = data['content']
#         user_id = data.get('user_id')

#         if not user_id:
#             return make_response({'error': 'User ID is required'}, 400)

#         try:
#             message = Message(content=content, user_id=user_id)
#             db.session.add(message)
#             db.session.commit()
#             return make_response(message.to_dict(), 201)
#         except Exception as e:
#             return make_response({'error': str(e)}, 500)

# api.add_resource(Messages, '/messages')






