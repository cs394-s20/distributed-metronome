import asyncio
import websockets

async def hello(websocket, path):
    while True:
        data = await websocket.recv()
        asyncio.create_task(handle_message(websocket, data))

async def handle_message(websocket, data):
    await websocket.send(data)
start_server = websockets.serve(hello, "0.0.0.0", 3000)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
