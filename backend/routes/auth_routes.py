from flask import Blueprint, request, jsonify
from models.user_model import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "user")  # optional, default "user"

    if not all([name, email, password]):
        return jsonify({"error": "All fields are required"}), 400

    user = User.create_user(name, email, password, role)
    if not user:
        return jsonify({"error": "Email already registered"}), 400

    token = create_access_token(identity={"email": email, "role": role})
    return jsonify({"message": "User registered successfully", "token": token, "role": role}), 201

@auth_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"error": "Email and password required"}), 400

    user = User.find_by_email(email)
    if not user or not User.check_password(user, password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity={"email": email, "role": user["role"]})
    return jsonify({"message": "Login successful", "token": token, "role": user["role"]}), 200
