import asyncio
import websockets
import sys
import json
import struct
import audioop


if len(sys.argv) < 2:
    port = 3000
else:
    port = sys.argv[1]

STATE = {
    "rooms": {},
    "connections": []
}

async def hello(websocket, path):
    STATE['connections'].append(websocket)
    try:
        while True:
            data = await websocket.recv()
            data_loaded = json.loads(data)
            if data_loaded["type"] == "data":
                for channel in range(2):
                    data_loaded["data"][channel] = [x for x in data_loaded["data"][channel]]    

            elif data_loaded["type"] == "stop_metronome":
                pass

            await websocket.send(json.dumps(data_loaded))
    except Exception as e:
        print(e)
    STATE['connections'].remove(websocket)


    

start_server = websockets.serve(hello, "0.0.0.0", port)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
