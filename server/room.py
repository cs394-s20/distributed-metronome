import random
import string
import os
import threading
import time
import json
import struct
import subprocess


class Room:
    def __init__(self):
        self.users = []
        self.user_data = {}
        self.combined_data = {}
        self.code = Room.generate_code()
        self.generate_pipes()
        self.delay = 6
        self.stream_started = False
        self.starting_stream = False
        self.last_chunk = -1

    def generate_pipes(self):
        self.audio_channel_paths = ['/tmp/' + self.code + str(i) for i in range(2)]
        for p in self.audio_channel_paths:
            os.mkfifo(p)

    @staticmethod
    def generate_code():
        possible = string.ascii_uppercase + '0123456789'
        return ''.join([random.choice(possible) for i in range(4)])

    def combine_chunks(self, chunk_id):
        self.combined_data[chunk_id] = [[0 for j in range(16384)] for i in range(2)]
        for u in self.users:
            try:
                for ch in range(2):
                    for j in range(len(self.combined_data[chunk_id][ch])):
                        self.combined_data[chunk_id][ch][j] += self.user_data[u][chunk_id][ch][j]
                del self.user_data[u][chunk_id]
            except Exception as e:
                print(e)
                
        if self.starting_stream:
            self.start_stream()
        if self.stream_started: 
            for j in range(len(self.combined_data[chunk_id][ch])):
                for ch in range(2):
                    self.audio_writer.write(struct.pack('>f', self.combined_data[chunk_id][ch][j]))
                #self.combined_data[chunk_id][ch][j] = max(-1.0, min(1.0, self.combined_data[chunk_id][ch][j]))
                
    def start_stream(self):

        self.starting_stream = False
        if self.stream_started:
            return
        command = 'ffmpeg -thread_queue_size 4096 -f f32be -ac 2 -ar 48000 -i ' + self.audio_channel_paths[0] + ' -stream_loop -1 -r 15 -i test.png -preset ultrafast -s 1280x720 -af asetpts=PTS,arealtime,asetpts=PTS -codec:v libx264 -codec:a aac -ar 48000 -pix_fmt yuv420p -crf 40 -f flv rtmp://live-ord02.twitch.tv/app/live_206561454_WB6SYeSn330x8TgYEtodTJc1tDtSRM'
        print(command)
        self.ffmpeg_thread = subprocess.Popen(command.split(' '))
        self.stream_started = True
        self.audio_writer = open(self.audio_channel_paths[0], "wb")
        print("stream has started")

    def end_stream(self):
        self.stream_started = False
        self.ffmpeg_thread.kill()

                    

    
class AudioWriter(threading.Thread):
    def __init__(self, channel, room):
        threading.Thread.__init__(self)
        self.room = room
        self.channel = channel
        self.running = False

    def run(self):
        self.running = True
        time.sleep(self.room.delay + 1)

        while self.running:
            pass


