# routes/order_routes.py
from flask import Blueprint, request, jsonify
from models.order_model import Order
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin

order_bp = Blueprint("order_bp", __name__)

# -------------------- Create Order --------------------
@order_bp.route("", methods=["POST"])
@cross_origin(origins="http://localhost:3000", supports_credentials=True)  # ✅ Enable CORS for this route
@jwt_required()
def create_order():
    """
    Create a new order for the logged-in user.
    Expects JSON body: { "product_ids": ["id1", "id2", ...] }
    """
    try:
        current_user = get_jwt_identity()
        
        # JWT identity is now a string (email) due to user_identity_loader
        # But handle both cases for backwards compatibility
        if isinstance(current_user, dict):
            user_id = str(current_user.get("email", current_user))
        else:
            user_id = str(current_user)

        # Print debug information
        print(f"User ID from JWT: {user_id}")

        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing request body"}), 400

        product_ids = data.get("product_ids")
        if not product_ids:
            return jsonify({"error": "product_ids field is required"}), 400
        if not isinstance(product_ids, list):
            return jsonify({"error": "product_ids must be an array"}), 422
        
        # Convert all product IDs to strings if they aren't already
        product_ids = [str(pid) for pid in product_ids]
        
        # Validate that all are non-empty strings
        if not all(isinstance(pid, str) and pid.strip() for pid in product_ids):
            return jsonify({
                "error": "All product IDs must be non-empty strings",
                "received": product_ids
            }), 422

        # Print debug information
        print(f"Received product IDs: {product_ids}")
        
        order = Order.create_order(user_id=user_id, product_ids=product_ids)
        
        # Print debug information
        print(f"Order result: {order}")
        
        if not order.get("products"):
            return jsonify({
                "error": "No valid product IDs provided. None of the provided product IDs exist in the database.",
                "received_ids": product_ids
            }), 422

        return jsonify(order), 201

    except Exception as e:
        import traceback
        print(f"Error creating order: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": f"Failed to create order: {str(e)}"}), 422


# -------------------- Get User Orders --------------------
@order_bp.route("", methods=["GET"])
@cross_origin(origins="http://localhost:3000", supports_credentials=True)  # ✅ Enable CORS for GET as well
@jwt_required()
def get_user_orders():
    """
    Get all orders for the authenticated user.
    """
    try:
        current_user = get_jwt_identity()
        
        # JWT identity is now a string (email) due to user_identity_loader
        # But handle both cases for backwards compatibility
        if isinstance(current_user, dict):
            user_id = str(current_user.get("email", current_user))
        else:
            user_id = str(current_user)
        
        # Print debug information
        print(f"Fetching orders for user_id: {user_id}")
        
        orders = Order.get_orders_by_user(user_id)
        
        # Print debug information
        print(f"Found {len(orders)} orders for user {user_id}")
        
        return jsonify(orders), 200

    except Exception as e:
        import traceback
        print(f"Error fetching orders: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 422
