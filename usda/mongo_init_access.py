from typing import Type
import pymongo


def mongo_init(key_path='secrets/mongo-key.txt') -> Type[pymongo.MongoClient]:
    mongo_key = open(key_path, 'r').read()
    client = pymongo.MongoClient(mongo_key)
    db = client.nio
    return db
