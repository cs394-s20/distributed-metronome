import asyncio
import websockets
import sys
import json
import struct
import audioop
import datetime
import time

if len(sys.argv) < 2:
    port = 3000
else:
    port = sys.argv[1]

STATE = {
    "rooms": {},
    "connections": []
}
MESSAGE_QUEUE = []

async def hello(websocket, path):
    STATE['connections'].append(websocket)
    try:
        while True:
            data = await websocket.recv()
            t = time.time()
            data_loaded = json.loads(data)
            if data_loaded["type"] == "data":
                for channel in range(2):
                    data_loaded["data"]["channels"][channel] = [x for x in data_loaded["data"]["channels"][channel]]
                                
                #await websocket.send(json.dumps(data_loaded))
                asyncio.create_task(send_message(websocket, json.dumps(data_loaded)))

            elif data_loaded["type"] == "start_metronome":
                start_time = datetime.datetime.utcnow().timestamp() + 5
                data_loaded = {"type": "start_metronome", "data":{"ts":  start_time}}
                asyncio.create_task(send_all(json.dumps(data_loaded)))
            elif data_loaded["type"] == "stop_metronome":
                asyncio.create_task(send_all(json.dumps(data_loaded)))

            print(time.time() - t)
    except Exception as e:
        print(e)
    STATE['connections'].remove(websocket)

async def send_all(message):
    for websocket in STATE['connections']:
        if websocket.open is True:
            asyncio.create_task(send_message(websocket, message))

async def send_message(websocket, message):
    await websocket.send(message)
    

start_server = websockets.serve(hello, "0.0.0.0", port)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
