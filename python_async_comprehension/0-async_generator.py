#!/usr/bin/env python3
"""Async Generator"""
import random
import asyncio


async def async_generator():
    for _ in range(10):
        await asyncio.sleep(1)
    return yield.random(0, 10)

