from config.db import db
from bson.objectid import ObjectId
from models.product_model import Product

orders_collection = db["orders"]

class Order:
    @staticmethod
    def create_order(user_id, product_ids):
        """
        Create an order for a user with valid product IDs.
        Invalid or non-existent product IDs are ignored.
        """
        valid_product_ids = []
        invalid_count = 0

        for pid in product_ids:
            try:
                obj_id = ObjectId(pid)
                if Product.get_product_by_id(pid):
                    valid_product_ids.append(obj_id)
                else:
                    invalid_count += 1
            except Exception:
                invalid_count += 1

        if not valid_product_ids:
            # No valid products to create order
            return {"products": [], "warning": "No valid product IDs provided"}

        order_data = {
            "user_id": user_id,
            "products": valid_product_ids
        }

        result = orders_collection.insert_one(order_data)
        order_data["_id"] = str(result.inserted_id)
        order_data["products"] = [str(p) for p in valid_product_ids]

        if invalid_count > 0:
            order_data["warning"] = f"{invalid_count} invalid product ID(s) were ignored."

        return order_data

    @staticmethod
    def get_orders_by_user(user_id):
        """
        Get all orders for a specific user.
        user_id should be a string (email address).
        """
        # Debug: Print what we're searching for
        print(f"Searching for orders with user_id: '{user_id}' (type: {type(user_id)})")
        
        # Query orders by user_id
        orders = list(orders_collection.find({"user_id": user_id}))
        
        # Debug: Print what we found
        print(f"Found {len(orders)} raw orders in database")
        if orders:
            print(f"Sample order user_id: '{orders[0].get('user_id')}' (type: {type(orders[0].get('user_id'))})")
        
        for o in orders:
            o["_id"] = str(o["_id"])
            detailed_products = []

            # Convert product IDs to strings (they're stored as ObjectId in DB)
            for pid in o["products"]:
                # Convert ObjectId to string if needed
                product_id_str = str(pid) if pid else None
                if product_id_str:
                    prod = Product.get_product_by_id(product_id_str)
                    if prod:
                        detailed_products.append({
                            "id": product_id_str,
                            "name": prod.get("name"),
                            "price": prod.get("price"),
                            "category": prod.get("category"),
                            "sizes": prod.get("sizes", []),
                            "colors": prod.get("colors", []),
                            "image": prod.get("image")
                        })
            o["products"] = detailed_products
        return orders
