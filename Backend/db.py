
from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://DecenDS:DecenDS@decends.ldkjtlr.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri)

# database and collection code goes here
db_name = "DecenDS"

db = client[db_name]

collection = db["DecenDS_users"]

# insert code goes here
docs = [
	{"name": "Swapnil Londhe", "peerId": "123456789", "storage_rented": 30468, "coins_earned": 3.4175, "password_hash": "somethinghashed"},
    ]

result = collection.insert_many(docs)

# display the results of your operation
print(result.inserted_ids)

# Close the connection to MongoDB when you're done.
client.close()
