from pymongo import MongoClient

MONGO_URI = "mongodb+srv://SD:FULLSTACK@cluster0.rvtfxej.mongodb.net/ecommerce?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["ecommerce"]

print("✅ Connected to MongoDB Atlas successfully!")
