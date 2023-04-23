import pymongo

client = pymongo.MongoClient("mongodb+srv://<username>:<password>@mycluster.s7bglaq.mongodb.net/?retryWrites=true&w=majority")

db = client.nio
db.user.insert_one({
    "name":"abc",
    "email":"abc@gmail.com",
    "password":"abc123",
    "mobile_number":"6170000000",
    "DOB":"<2023-01-01>",
    "gender":"male",
    "height":"6.0",
    "weight":"150"
})

db = client.nio
db.meal.insert_one({
    "meal":"lunch",
    "food1":"apple",
    "quantity1":2,
    "food2":"beef",
    "quantity2":1,
    "food3":"eggs",
    "quantity3":3,
    "total_calories":500,
    "date_created":"<2023-01-01>"
})

db = client.nio
db.recipe.insert_one({
    "meal":"lunch",
    "food1":"apple",
    "quantity1":2,
    "food2":"beef",
    "quantity2":1,
    "food3":"eggs",
    "quantity3":3,
    "total_calories":500
})

db = client.nio
db.food.insert_one({
    "meal":"lunch",
    "food1":"apple",
    "quantity1":2,
    "food2":"beef",
    "quantity2":1,
    "food3":"eggs",
    "quantity3":3,
    "total_calories":500
})
print("data added")
