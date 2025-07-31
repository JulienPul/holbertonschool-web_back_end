#!/usr/bin//env python3
"""Async Comprehensions"""
async_generator = __import__('0-async_generator').async_generator
from typing import AsyncGenerator
import asyncio


async def asyn_comprehension() -> AsyncGenerator[float, None]:
    random_n = [v async for v in async_generator()]
    return random_n
