import asyncio
import websockets
import sys
import json
import ssl
import pathlib
import struct
import audioop
import datetime
import time
from room import Room
import copy

if len(sys.argv) < 2:
    port = 3000
else:
    port = sys.argv[1]

STATE = {
    "rooms": {},
    "connections": []
}
MESSAGE_QUEUE = []

final_chunk = None

async def hello(websocket, path):
    STATE['connections'].append(websocket)
    room = None
    code = None
    try:
        while True:
            data = await websocket.recv()
            
            data_loaded = json.loads(data)
            if data_loaded["type"] == "data":
                if data_loaded["isFinal"] == True:
                    final_chunk = data_loaded["data"]["id"]
                
                room.user_data[websocket][data_loaded["data"]["id"]] = copy.deepcopy(data_loaded["data"]["channels"])
                
                if room.users[0] == websocket:
                    asyncio.create_task(delay_combine_send(data_loaded["data"]['id'], room, data_loaded))
                

            elif data_loaded["type"] == "start_metronome":
                start_time = datetime.datetime.utcnow().timestamp() + 5
                data_loaded = {"type": "start_metronome", "data":{"ts":  start_time}}
                asyncio.create_task(send_all(json.dumps(data_loaded)))
                if room.stream_started is False:
                    room.starting_stream = True 
                    print("starting stream")
                

            elif data_loaded["type"] == "stop_metronome":
                room.starting_stream = False
                room.last_chunk = data_loaded["data"]["id"]
                room.end_stream()
                asyncio.create_task(send_all(json.dumps(data_loaded)))

            elif data_loaded["type"] == "create_room":
                room = Room()
                code = room.code
                room.users.append(websocket)
                room.user_data[websocket] = {}
                STATE['rooms'][code] = room
                data_loaded["data"] = {"code": code}
                asyncio.create_task(send_message(websocket, json.dumps(data_loaded)))

            elif data_loaded["type"] == "clear_data":
                for w in room.users:
                    room.user_data[w] = {}

            elif data_loaded["type"] == "join_room":
                code = data_loaded["data"]["code"]
                
                if code in STATE['rooms']:
                    room = STATE['rooms'][code]
                    room.users.append(websocket)
                    asyncio.create_task(list_users(room))
                    room.user_data[websocket] = {}
                    asyncio.create_task(send_message(websocket, json.dumps(data_loaded)))
                    
                else:
                    data_loaded["data"]["code"] = None
                    asyncio.create_task(send_message(websocket, json.dumps(data_loaded)))


            
    except Exception as e:
        print(e)
    if room is not None:
        room.users.remove(websocket)
        asyncio.create_task(list_users(room))
        if len(room.users) == 0:
            del STATE['rooms'][code]
    STATE['connections'].remove(websocket)
    
def num_users(room):
    return json.dumps({
        "type": "list_users",
        "data": {
            'count': len(room.users)
        }
    })

async def list_users(room):
    message = num_users(room)
    for user in room.users:
        asyncio.create_task(send_message(user, message))


async def delay_combine_send(chunk_id, room, original_data):
    
    if room.last_chunk < 0 or chunk_id <= room.last_chunk:
        await asyncio.sleep(2)

        await room.combine_chunks(chunk_id)
    
        original_data["data"]["channels"] = copy.deepcopy(room.combined_data[chunk_id])
        del room.combined_data[chunk_id]
        for w in room.users:
            asyncio.create_task(send_message(w, json.dumps(original_data)))

async def send_all(message):
    for websocket in STATE['connections']:
        if websocket.open is True:
            asyncio.create_task(send_message(websocket, message))

async def send_message(websocket, message):
    await websocket.send(message)
    
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain(certfile="/etc/letsencrypt/live/dm.johnflaboe.com/fullchain.pem", keyfile="/etc/letsencrypt/live/dm.johnflaboe.com/privkey.pem")
start_server = websockets.serve(hello, "0.0.0.0", 443, ssl=ssl_context)
# start_server = websockets.serve(hello, "localhost", port)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
