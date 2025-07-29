#!/usr/bin/env python3
"""Let's execute multiple coroutines at the same time with async"""
import asyncio
from typing import List
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """async routine wait_n that takes 2 int arguments n and max_delay.
    spawn wait_random n times with the specified max_delay.
    wait_n return the list of all the delays (float values)"""
    coroutine = [wait_random(max_delay) for _ in range(n)]
    delays = await asyncio.gather(*coroutine)
    return delays
