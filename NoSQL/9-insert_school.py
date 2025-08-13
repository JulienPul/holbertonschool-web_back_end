#!/usr/bin/env python3
"""Module Insert a document in Python"""
from pymongo import MongoClient


def insert_school(mongo_collection, **kwargs):
    result = mongo_collection.insert_one(kwargs)
    return result.id
