import requests


class UsdaCall:
    api_key = 'DEMO_KEY'
    session = None

    def __init__(self, specified_key='DEMO_KEY', key_path=''):
        self.api_key = specified_key
        if key_path != '':
            self.api_key = open(key_path, 'r').read()
        self.session = requests.session()
        self.session.headers.update({'X-Api-Key': self.api_key})

    # the foundation of everything
    def custom_call(self, endpoint: str, params=None) -> dict:

        if endpoint[0] == '/':
            endpoint = endpoint[1:]
        # you'll need to specify these
        usda_url = 'https://api.nal.usda.gov/fdc/' + endpoint

        response = self.session.get(usda_url, params=params)
        if response.status_code == 200:
            data = response.json()
        else:
            print("Request failed with status code:", response.status_code)
            data = None

        return data

    # predefined call sets for easy access
    def search_for_foods_by_name(self, query: str, food_type=None, page_size=10) -> dict:
        params = {
            "query": query.lower(),
            "pageSize": page_size,
        }

        if food_type is not None:
            if type(food_type) == str:
                food_type_list = [food_type]
            else:
                food_type_list = food_type

            params['dataType'] = food_type_list
            # end if

        data = self.custom_call(endpoint='v1/foods/search', params=params)
        return data['foods']
