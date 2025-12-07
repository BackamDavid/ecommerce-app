from werkzeug.security import generate_password_hash, check_password_hash
from config.db import db

class User:
    collection = db["users"]

    @staticmethod
    def create_user(name, email, password, role="user"):
        if User.collection.find_one({"email": email}):
            return None
        hashed_pw = generate_password_hash(password)
        User.collection.insert_one({
            "name": name,
            "email": email,
            "password": hashed_pw,
            "role": role
        })
        return True

    @staticmethod
    def find_by_email(email):
        return User.collection.find_one({"email": email})

    @staticmethod
    def check_password(user, password):
        return check_password_hash(user["password"], password)
