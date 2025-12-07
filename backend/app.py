from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from werkzeug.security import generate_password_hash
from config.db import db
import os

from routes.auth_routes import auth_bp
from routes.product_routes import product_bp
from routes.order_routes import order_bp

app = Flask(__name__)

# ✅ Enable CORS for all origins
CORS(app)   
# JWT setup
app.config["JWT_SECRET_KEY"] = "your_secret_key_here"
jwt = JWTManager(app)

# Configure JWT to handle dictionary identities
@jwt.user_identity_loader
def user_identity_lookup(user):
    """
    Convert dictionary identity to string for JWT token.
    If identity is a dict, return the email; otherwise return as string.
    """
    if isinstance(user, dict):
        return user.get("email", str(user))
    return str(user)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(product_bp, url_prefix="/api/products")
app.register_blueprint(order_bp, url_prefix="/api/orders")

# Serve uploaded product images
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/')
def home():
    return {"message": "E-commerce API running successfully!"}

# ✅ Create admin user if not exists
def create_admin_user():
    users_collection = db["users"]
    if users_collection.find_one({"email": "admin@example.com"}):
        print("✅ Admin user already exists.")
        return

    admin_user = {
        "name": "Admin",
        "email": "admin@example.com",
        "password": generate_password_hash("admin123"),
        "role": "admin"
    }
    users_collection.insert_one(admin_user)
    print("✅ Admin user created: admin@example.com / admin123")

create_admin_user()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
