#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict, Any


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Return a deletion-resilient page starting at `index`.
        - index: start index used
        - next_index: index to request next time
        - page_size: number of items actually returned
        - data: rows collected (skipping deleted holes)
        """
        indexed = self.indexed_dataset()

        if index is None:
            index = 0
        assert isinstance(index, int) and index >= 0
        assert isinstance(page_size, int) and page_size > 0

        max_key = max(indexed.keys())
        assert index <= max_key

        data = []
        cursor = index
        while len(data) < page_size:
            if cursor in indexed:
                data.append(indexed[cursor])
            cursor += 1

        return {
            "index": index,
            "data": data,
            "page_size": len(data),
            "next_index": cursor,
        }
