import asyncio
import websockets
import sys
from pydub import AudioSegment
import json
import struct
import numpy as np

aud = AudioSegment.empty()
STATE = {'audio': AudioSegment.empty()}

count = 1

if len(sys.argv) < 2:
    port = 3000
else:
    port = sys.argv[1]

async def hello(websocket, path):
    while True:
        
        data = await websocket.recv()
        data_loaded = json.loads(data)
    # print(data_loaded)
    
        if data_loaded["type"] == "data":
            byte_string = b''
            for k,v in data_loaded["data"].items():
                byte_string += struct.pack('f',v)
            STATE['audio'] = STATE['audio'].append(AudioSegment(data=byte_string,sample_width=4,frame_rate=48000,channels=1), crossfade=0)
    
        elif data_loaded["type"] == "stop_metronome":
            print("here")
            STATE['audio'].export("anything.mp3", format="mp3")

        await websocket.send(data)
        #print(aud)
        #asyncio.create_task(handle_message(websocket, data, aud))

async def handle_message(websocket, data, segment):
    data_loaded = json.loads(data)
    # print(data_loaded)
    
    if data_loaded["type"] == "data":
        byte_string = b''
        for k,v in data_loaded["data"].items():
            byte_string += struct.pack('f',v)
        segment = segment.append(AudioSegment(data=byte_string,sample_width=4,frame_rate=48000,channels=1), crossfade=0)
    
    elif data_loaded["type"] == "stop_metronome":
        print("here")
        segment.export("anything.mp3", format="mp3")

    await websocket.send(data)

start_server = websockets.serve(hello, "0.0.0.0", port)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
