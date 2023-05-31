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
            content=fake.sentence(),  # generate a random sentence
            user_id=user.id
        )
        db.session.add(message)





        chatbotresponse = ChatbotResponse(
            message_id = message.id,
            user_id = user.id,
            response_content = fake.sentence(),
        )
        db.session.add(chatbotresponse)
        db.session.commit()


