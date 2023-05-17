from collections import UserString                                     
from faker import Faker
from app import app
from models import db, User
from random import choice as rc, randint
from app import app
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
fake = Faker()

with app.app_context():
    User.query.delete()



    for _ in range(10):
        user = User(
            name = fake.name(),
            email = fake.email(),
            username = fake.user_name(),

        )
        db.session.add(user)
        db.session.commit()

# def user():
#     User.query.delete()
#     users = []
#     for _ in range(10):
#         user = User(
#             name = fake.name(),
#             email = fake.email(),
#             username = fake.user_name(),

#         )
#         users.append(user)
#     db.session.add_all(users)
#     db.session.commit()




if __name__ == '__main__':
    with app.app_context():
        user()


