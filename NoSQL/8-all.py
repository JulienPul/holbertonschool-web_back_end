#!/usr/bin/env python3
"""Module to list all documents in a MongoDB collection"""

def list_all(mongo_collection):
    """
    Lists all documents in MongoDB collection.
    Returns:
        List of documents, or empty list if none exist.
    """
    return list(mongo_collection.find()) or []
