from typing import Dict, Any


def get_calorie_of_food(food: dict) -> float:
    # helper function for dealing with multiple types of calories.
    # assume you have the precise id of the food
    nutrients = food['foodNutrients']
    for n in nutrients:
        # just in case usda decides to change the name...
        # if n['nutrientName'] == 'Energy':
        if n['nutrientId'] == 1008:  # energy
            return n['value']
        if n['nutrientId'] == 2048:  # energy (At water specific factor)
            return n['value']
        if n['nutrientId'] == 2047:  # energy (At water general factor)
            return n['value']
    return -1


def get_macros_of_food(food: dict) -> tuple[float, float, float]:
    carbs, fat, protein = -1, -1, -1
    nutrients = food['foodNutrients']
    for n in nutrients:
        if n['nutrientId'] == 1003:  # protein
            protein = n['value']
        if n['nutrientId'] == 1004:  # lipids(fat)
            fat = n['value']
        if n['nutrientId'] == 1005:  # carbs
            carbs = n['value']
    return carbs, fat, protein


def get_food_info(food: dict) -> dict[str, Any]:
    # returns a dictionary of a food item with all the basic info
    # when you get the json from a search query
    # TODO: add branded foods brand name support.
    macros = get_macros_of_food(food=food)
    my_dict = {
        'fdcId': food['fdcId'],
        'dataType': food['dataType'],
        'description': food['description'],
        'energy_per_100g': get_calorie_of_food(food),
        'macro_carbohydrate_per_100g': macros[0],
        'macro_fat_per_100g': macros[1],
        'macro_protein_per_100g': macros[2],
    }
    if food['dataType'] == 'Branded':
        my_dict.update({'brand': food['brandOwner']})
    return my_dict
