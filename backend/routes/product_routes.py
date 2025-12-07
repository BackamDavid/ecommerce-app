from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from models.product_model import Product
import os

product_bp = Blueprint("product_bp", __name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Serve uploaded images
@product_bp.route("/uploads/<filename>")
def uploaded_file(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename)
    except Exception as e:
        return jsonify({"error": f"File not found: {str(e)}"}), 404

# Add product
@product_bp.route("", methods=["POST"])
def add_product():
    try:
        name = request.form.get("name", "").strip()
        description = request.form.get("description", "").strip()
        price = float(request.form.get("price", 0))
        stock = int(request.form.get("stock", 0))
        category = request.form.get("category", "").strip()
        gender = request.form.get("gender", "").strip()
        sizes = [s.strip() for s in request.form.get("sizes", "").split(",") if s.strip()]
        colors = [c.strip() for c in request.form.get("colors", "").split(",") if c.strip()]

        image_file = request.files.get("image")
        image_filename = None
        if image_file and allowed_file(image_file.filename):
            image_filename = secure_filename(image_file.filename)
            image_file.save(os.path.join(UPLOAD_FOLDER, image_filename))
            image_filename = f"/api/products/uploads/{image_filename}"

        product_data = {
            "name": name,
            "description": description,
            "price": price,
            "stock": stock,
            "category": category or None,
            "gender": gender or None,
            "sizes": sizes,
            "colors": colors,
            "image": image_filename
        }

        product = Product.create_product(**product_data)
        return jsonify(product), 201

    except Exception as e:
        return jsonify({"error": f"Failed to add product: {str(e)}"}), 400

# Get all products with optional gender filtering
@product_bp.route("", methods=["GET"])
def get_products():
    try:
        gender_filter = request.args.get("gender", None)
        products = Product.get_all_products()
        
        # Filter by gender if specified
        if gender_filter and gender_filter in ["men", "women"]:
            products = [p for p in products if p.get("gender") == gender_filter]
        
        if not products:
            return jsonify({"message": "No products available"}), 200
        return jsonify(products), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch products: {str(e)}"}), 500
