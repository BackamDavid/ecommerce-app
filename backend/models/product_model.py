# models/product_model.py
from config.db import db
from bson.objectid import ObjectId

products_collection = db["products"]

class Product:
    @staticmethod
    def create_product(name, description, price, stock, category=None, sizes=None, colors=None, image=None, gender=None):
        # Handle sizes input
        if isinstance(sizes, str):
            sizes_list = [s.strip() for s in sizes.split(",") if s.strip()]
        elif isinstance(sizes, list):
            sizes_list = sizes
        else:
            sizes_list = []

        # Handle colors input
        if isinstance(colors, str):
            colors_list = [c.strip() for c in colors.split(",") if c.strip()]
        elif isinstance(colors, list):
            colors_list = colors
        else:
            colors_list = []

        product = {
            "name": name,
            "description": description,
            "price": price,
            "stock": stock,
            "category": category,
            "sizes": sizes_list,
            "colors": colors_list,
            "image": image,
            "gender": gender
        }

        result = products_collection.insert_one(product)
        product["_id"] = str(result.inserted_id)
        return product

    @staticmethod
    def get_all_products():
        products = list(products_collection.find())
        for p in products:
            p["_id"] = str(p["_id"])
        return products

    @staticmethod
    def get_product_by_id(product_id):
        try:
            product = products_collection.find_one({"_id": ObjectId(product_id)})
            if product:
                product["_id"] = str(product["_id"])
            return product
        except:
            return None

    @staticmethod
    def update_product(product_id, data):
        products_collection.update_one({"_id": ObjectId(product_id)}, {"$set": data})
        return Product.get_product_by_id(product_id)

    @staticmethod
    def delete_product(product_id):
        return products_collection.delete_one({"_id": ObjectId(product_id)})
