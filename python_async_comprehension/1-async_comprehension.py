#!/usr/bin/env python3
"""Async Comprehensions"""
async_generator = __import__('0-async_generator').async_generator
import asyncio
from typing import List


async def async_comprehension() -> List[float]:
    random_n = [v async for v in async_generator()]
    return random_n
