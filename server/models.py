
from flask_sqlalchemy import SQLAlchemy                                                     
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    # messages = db.relationship('Message', backref='users', lazy=False)
    message = db.relationship('ChatbotResponse', back_populates='users', lazy=False)


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            # any other fields you want to include
        }

    # Relationship with user
    user = db.relationship('ChatbotResponse',back_populates='messages',lazy=False)


class ChatbotResponse(db.Model):
    __tablename__ = 'chatbot_responses'

    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    response_content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    def to_dict(self):
        return {
            'id': self.id,
            'message_id': self.message_id,
            'user_id': self.user_id,
            'response_content': self.response_content,
            # any other fields you want to include
        }

    users = db.relationship('User', back_populates='message', lazy=False)
    messages = db.relationship('Message', back_populates='user', lazy=False)



# from flask_sqlalchemy import SQLAlchemy                                                     
# from sqlalchemy import MetaData
# from sqlalchemy.orm import validates
# from sqlalchemy.ext.associationproxy import association_proxy
# from sqlalchemy_serializer import SerializerMixin

# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })
# db = SQLAlchemy(metadata=metadata)

# class User(db.Model):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=True)
#     username = db.Column(db.String, unique=True, nullable=False)
#     email = db.Column(db.String, unique=True, nullable=False)
#     password = db.Column(db.String, nullable=False)

#     # messages = db.relationship('Message', backref='users', lazy=False)
#     messages = db.relationship('Message', backref='user', lazy='dynamic', foreign_keys='Message.user_id')

# class Message(db.Model):
#     __tablename__ = 'messages'

#     id = db.Column(db.Integer, primary_key=True)
#     content = db.Column(db.Text, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate = db.func.now())

#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     user = db.relationship('User', backref=db.backref('messages', lazy='joined'), lazy=True)
#     response = db.relationship('ChatbotResponse', backref='message', lazy=True, uselist=False)

# class ChatbotResponse(db.Model):
#     __tablename__ = 'chatbot_responses'

#     id = db.Column(db.Integer, primary_key=True)
#     message_id = db.Column(db.Integer, db.ForeignKey('messages.id'))
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     response_content = db.Column(db.Text, nullable=False)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate = db.func.now())

#     users = db.relationship('User', back_populates='message', lazy=False)
#     message = db.relationship('Message', backref=db.backref('response', lazy='joined'), lazy=True, uselist=False)












