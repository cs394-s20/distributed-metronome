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
            for i in range(len(data_loaded["data"])):
                data_loaded["data"][i] = [struct.unpack('f', struct.pack('f', v)) for k, v in data_loaded["data"][i].items()]
            await websocket.send(json.dumps(data_loaded))
            print("next")
            continue 
            byte_string = b''
            for i in range(len(data_loaded["data"][0])):
                byte_string += struct.pack('f',data_loaded["data"][0][i][0])
                byte_string += struct.pack('f',data_loaded["data"][1][i][0])

            STATE['audio'] = STATE['audio'].append(AudioSegment(data=byte_string,sample_width=4,frame_rate=48000,channels=2), crossfade=0)
    
        elif data_loaded["type"] == "stop_metronome":
            print("here")
            STATE['audio'].export("/home/ec2-user/anything.mp3", format="mp3")
            STATE['audio'] = AudioSegment.empty()

        await websocket.send(json.dumps(data_loaded))


start_server = websockets.serve(hello, "0.0.0.0", port)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
