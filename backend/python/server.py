#!/usr/bin/env python
import asyncio
import websockets

from heartbeat import heartbeat
from crud import adapter


async def adapter_handler(websocket, path):
    async for message in websocket:
        await adapter(message)


async def heartbeat_time(websocket, path):
    while True:
        await websocket.send(await heartbeat())
        await asyncio.sleep(1)


async def handler(websocket, path):
    consumer_task = asyncio.ensure_future(adapter_handler(websocket, path))
    producer_task = asyncio.ensure_future(heartbeat_time(websocket, path))
    done, pending = await asyncio.wait([consumer_task, producer_task],
                                       return_when=asyncio.FIRST_COMPLETED)
    for task in pending:
        task.cancel()

def entry_point():
    try:
        start_server = websockets.serve(handler, "0.0.0.0", 1337)
        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()
    except KeyboardInterrupt:
        pass

if __name__ == '__main__':
    entry_point()


