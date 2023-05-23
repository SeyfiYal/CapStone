from collections import UserString                                     
from faker import Faker
from app import app
from models import db, User,Message,ChatbotResponse
from random import choice as rc, randint
from app import app
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


fake = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Seed Users
    users = []
    for i in range(5):
        user = User(
            name=fake.name(),
            username=fake.user_name(),
            email=fake.email(),
            password='password'
        )
        db.session.add(user)
        users.append(user)

    db.session.commit()

    for user in users:
        message = Message(
            content = "Hello",
            user_id=user.id
        )
        db.session.add(message)
        db.session.commit()

        chatbotresponse = ChatbotResponse(
            message_id = message.id,
            user_id = user.id,
            response_content = "Response"
        )
        db.session.add(chatbotresponse)
        db.session.commit()




    # for i in range(5):
    #     chatbotresponse = ChatbotResponse(
    #         message_id=fake.message_id(),
    #         user_id = fake.user(),
    #         response_content = fake.response_content()

    #     )

    #     db.session.add(user)

    # db.session.commit()



    # # Seed Messages
    # users = User.query.all()
    # for user in users:
    #     for i in range(3):
    #         message = Message(
    #             content=fake.text(),
    #             user=user
    #         )
    #         db.session.add(message)

    # db.session.commit()

    # # Seed ChatbotResponses
    # messages = Message.query.all()
    # for message in messages:
    #     response = ChatbotResponse(
    #         message=message,
    #         response_content=fake.text()
    #     )
    #     db.session.add(response)

    # db.session.commit()

