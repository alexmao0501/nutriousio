from usda import usda_call, usda_parse
from usda import mongo_init_access
# testing purposes
import json


# TODO: update usda-parse method so that it supports branded foods.
def search_by_name(mongo_db, query: str, no_branded=False, collection='food_info', page_size=-1):
    # prep db and params
    usda = usda_call.UsdaCall(key_path='usda/secrets/api-key.txt')
    if no_branded:
        food_type = ['Foundation', 'Survey (FNDDS)', 'SR Legacy']
    else:
        food_type = None
    if page_size != -1:
        foods = usda.search_for_foods_by_name(query=query, food_type=food_type, page_size=page_size)
    else:
        # the call
        foods = usda.search_for_foods_by_name(query=query, food_type=food_type)
    # parse
    if foods is not None:
        fe_response = []
        for food in foods:  # for every food item that usda returns
            # parse it for db and FE
            food_dict = usda_parse.get_food_info(food)
            # throw it into db
            # using upsert so that mongodb doesn't get duplicate inserts.
            collection_chosen = mongo_db[collection]
            result = collection_chosen.update_one(
                filter={'fdcId': food['fdcId']},
                update={'$set': food_dict},
                upsert=True)
            food_name = food['description']
            food_id = food['fdcId']
            if result.upserted_id is not None:
                print(f'new food inserted:<{food_name}>, id:{food_id}')
            else:
                print(f'<{food_name}> already in database, updated, id:{food_id}')
            # add it to FE response
            fe_response.append(food_dict)
            pass
        return fe_response
    else:
        return None


if __name__ == '__main__':
    # sample call
    print(
        json.dumps(
            search_by_name('apple'),
            indent=2
        )
    )
    pass
