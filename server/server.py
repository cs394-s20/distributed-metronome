import asyncio
import websockets
import sys
from pydub import AudioSegment
import json
import struct

aud = AudioSegment.empty()

if len(sys.argv) < 2:
    port = 3000
else:
    port = sys.argv[1]

async def hello(websocket, path):
    while True:
        data = await websocket.recv()
        asyncio.create_task(handle_message(websocket, data))

async def handle_message(websocket, data):
    data_loaded = json.loads(data)
    # print(data_loaded)

    if data_loaded["type"] == "data":
        byte_string = b''
        for k,v in data_loaded["data"].items():
            byte_string += struct.pack('f',v)
        
        aud.append(AudioSegment(data=byte_string,sample_width=1024,frame_rate=48000,channels=1), crossfade=0)
    
    elif data_loaded["type"] == "stop_metronome":
        aud.export("anything.mp3", format="mp3")

    await websocket.send(data)

start_server = websockets.serve(hello, "localhost", port)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
