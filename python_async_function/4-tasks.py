#!usr/bin/env python3
"""Tasks"""
import asyncio
from typing import List
task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """async routine wait_n that takes 2 int arguments n and max_delay.
    spawn wait_random n times with the specified max_delay.
    wait_n return the list of all the delays (float values)"""
    coroutine = [task_wait_random(max_delay) for _ in range(n)]
    delays = await asyncio.gather(*coroutine)
    return(delays)
