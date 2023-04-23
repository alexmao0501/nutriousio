from flask import Flask, request, jsonify
import pymongo
import certifi
from flask_cors import CORS
from usda import retrieve_from_usda
import random
import bcrypt


app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})
client = pymongo.MongoClient("mongodb+srv://nutriousio:cscs@mycluster.s7bglaq.mongodb.net/?retryWrites=true&w=majority",
                             tlsCAFile=certifi.where())
db = client.nio


@app.route('/login', methods=['POST'])
def login():
    user = db.user.find_one({
        'email': request.json['email'].lower()
    })
    if user and bcrypt.checkpw(request.json['password'].encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'email': user['email'],
                        'firstName': user['first_name'],
                        'lastName': user['last_name'],
                        'calorieLimit': user['calorie_limit'],
                        'weight': user['weight']
                        })

    return jsonify({'error': 'Invalid email or password'}), 401


@app.route('/signup', methods=['POST'])
def signup():
    email = request.json['email'].lower()
    hashed_password = bcrypt.hashpw(
        request.json['password'].encode('utf-8'), bcrypt.gensalt())
    calorie_limit = request.json['calorie_limit']
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    weight = request.json['weight']
    # mobile_number = request.form['mobile_number']
    # DOB = request.form['DOB']
    # gender = request.form['gender']
    # height = request.form['height']
    # weight = request.form['weight']

    existing_user = db.user.find_one({'email': email})
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    try:
        calorie_limit = int(calorie_limit)
    except ValueError:
        return jsonify({'error': 'Invalid calorie limit'}), 400

    user = {
        'email': email,
        'password': hashed_password.decode('utf-8'),
        'calorie_limit': calorie_limit,
        'first_name': first_name,
        'last_name': last_name,
        # 'mobile_number': mobile_number,
        # 'DOB' :DOB,
        # 'gender': gender,
        # 'height': height,
        'weight': weight
    }
    db.user.insert_one(user)

    return jsonify({'message': 'User created successfully'})


@app.route('/mealcreator', methods=['GET'])
def get_all_food():
    all_food = []
    for item in db.food_info.find():
        all_food.append({
            'name': item['description'],
            'dataType': item['dataType'],
            'calories': item['energy_per_100g'],
            'carbs': item['macro_carbohydrate_per_100g'],
            'fat': item['macro_fat_per_100g'],
            'protein': item['macro_protein_per_100g']
        })

    return jsonify({'all_food': all_food})


@app.route('/savemeal', methods=['POST'])
def save_meal():

    email = request.json['email']
    meal = {
        # 'email': email,
        'date': request.json['date'],
        'meal': request.json['meal'],
        'mealType': request.json['mealType']
    }

    db.user.update_one({'email': email}, {'$push': {'meals': meal}})

    return jsonify({'message': 'Meal saved successfully'})


@app.route('/mealHistory', methods=['POST'])
def get_meal_history():

    email = request.json['email']
    meals = db.user.find_one({'email': email}, {"_id": 0, "meals": 1})

    return jsonify(meals)

@app.route('/update_user', methods=['POST'])
def update_user():
    email = request.json['email']

    user = db.user.find_one({'email': email})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user['first_name'] = request.json.get('first_name', user['first_name'])
    user['last_name'] = request.json.get('last_name', user['last_name'])
    user['calorie_limit'] = request.json.get(
        'calorie_limit', user['calorie_limit'])
    user['weight'] = request.json.get('weight', user['weight'])

    db.user.update_one({'email': email}, {'$set': user})

    return jsonify({'message': 'User updated successfully'})


# TODO: method below is NOT tested.
@app.route('/usda_search', methods=['POST'])
def find_food_in_usda():
    query = request.json['query']
    raw_response = retrieve_from_usda.search_by_name(mongo_db=db, query=query)
    food_data = []
    for item in raw_response:
        food_data.append({
            'name': item['description'],
            'calories': item['energy_per_100g'],
            'fat': item['macro_fat_per_100g'],
            'carbs': item['macro_carbohydrate_per_100g'],
            'protein': item['macro_protein_per_100g']
        })
    if raw_response is not None:
        return jsonify(food_data)
        # return jsonify(raw_response)
    else:
        return jsonify({'error': 'no food found'}), 404


@app.route('/recommendedRecipes', methods=['POST'])
def find_recipe_within_calorie_limit():
    calorie_limit = request.json['calorie_limit']
    types = ["Breakfast", "Lunch", "Dinner"]

    within_limit_recipes_found = False
    while not within_limit_recipes_found:
        selected_recipes = []
        total_calories = 0

        for meal_type in types:
            count = db.recipe.count_documents({"type": meal_type})
            num = random.randint(0, count - 1)
            recipe_after_num = db.recipe.find(
                {"type": meal_type}).skip(num).limit(1)
            recommend_recipe = recipe_after_num[0]
            selected_recipes.append({
                'id': recommend_recipe['id'],
                'name': recommend_recipe['name'],
                'type': recommend_recipe['type'],
                'ingredients': recommend_recipe['ingredients'],
                'macros': recommend_recipe['macros'],
                'instructions': recommend_recipe['instructions'],
                'imgSrc': recommend_recipe['imgSrc'],
                'isLowCalorie': recommend_recipe['isLowCalorie'],
                'isHighCalorie': recommend_recipe['isHighCalorie']
            })
            total_calories += recommend_recipe["macros"]["calories"]

        if total_calories <= int(calorie_limit):
            within_limit_recipes_found = True

    return jsonify(selected_recipes)


@app.route('/allRecipes', methods=['POST'])
def get_all_recipes():
    all_recipes = []
    for recipe in db.recipe.find():
        all_recipes.append({
            'id': recipe['id'],
            'name': recipe['name'],
            'type': recipe['type'],
            'ingredients': recipe['ingredients'],
            'macros': recipe['macros'],
            'instructions': recipe['instructions'],
            'imgSrc': recipe['imgSrc'],
            'isLowCalorie': recipe['isLowCalorie'],
            'isHighCalorie': recipe['isHighCalorie']
        })        
        
    return jsonify(all_recipes)


if __name__ == '__main__':
    app.run(debug=True)
