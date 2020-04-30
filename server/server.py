import asyncio
import websockets
import sys
import json
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

            elif data_loaded["type"] == "stop_metronome":
                asyncio.create_task(send_all(json.dumps(data_loaded)))
                for user in room.users:
                    room.user_data[user] = {}

            elif data_loaded["type"] == "create_room":
                code = Room.generate_code()
                room = Room()
                room.users.append(websocket)
                room.user_data[websocket] = {}
                STATE['rooms'][code] = room
                data_loaded["data"] = {"code": code}
                asyncio.create_task(send_message(websocket, json.dumps(data_loaded)))

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
    
    for i in range(2):
        for j in range(len(original_data["data"]["channels"][i])):
            original_data["data"]["channels"][i][j] = 0
    
    await asyncio.sleep(2)
    for i in range(2):
        for w in room.users:
            
            for j in range(len(original_data["data"]["channels"][i])):
                try:
                    original_data["data"]["channels"][i][j] += room.user_data[w][chunk_id][i][j]
                except:
                    pass
    for i in range(2):
        for j in range(len(original_data["data"]["channels"][i])):
            original_data["data"]["channels"][i][j] = max(-1, min(1, original_data["data"]["channels"][i][j]))

    
    for w in room.users:
        # del room.user_data[w][chunk_id]
        if w.open is True and (final_chunk == None or final_chunk == chunk_id):
            asyncio.create_task(send_message(w, json.dumps(original_data)))

async def send_all(message):
    for websocket in STATE['connections']:
        if websocket.open is True:
            asyncio.create_task(send_message(websocket, message))

async def send_message(websocket, message):
    await websocket.send(message)
    

start_server = websockets.serve(hello, "0.0.0.0", port)
# start_server = websockets.serve(hello, "localhost", port)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
