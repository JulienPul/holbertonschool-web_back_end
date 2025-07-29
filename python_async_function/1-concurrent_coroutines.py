#!/usr/bin/env python3
"""Let's execute multiple coroutines at the same time with async"""
wait_random = __import__('0-basic_async_syntax').wait_random
import _asyncio
from typing import List


async def wait_n(n: int, max_delay: int) -> (List[float]):
    coroutine = []
    for i in range (0, n):
        coroutine.append(wait_random(max_delay)) 
    delays = await _asyncio.sleep(*coroutine)
    return delays
    