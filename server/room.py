import random
import string
import os
import threading
import time
import json
import struct


class Room:
    def __init__(self):
        self.users = []
        self.user_data = {}
        self.combined_data = {}
        self.code = Room.generate_code()
        self.delay = 6

    @staticmethod
    def generate_code():
        possible = string.ascii_uppercase + '0123456789'
        return ''.join([random.choice(possible) for i in range(4)])

    def combine_chunks(self, chunk_id):
        self.combined_data[chunk_id] = [[0 for j in range(8192)] for i in range(2)]
        for u in self.users:
            try:
                for ch in range(2):
                    for j in range(len(self.combined_data[chunk_id][ch])):
                        self.combined_data[chunk_id][ch][j] += self.user_data[u][chunk_id][ch][j]
                del self.user_data[u][chunk_id]
            except:
                pass
        
        #for ch in range(2):
         #   for j in range(len(self.combined_data[chunk_id][ch])):
          #      self.combined_data[chunk_id][ch][j] = max(-1.0, min(1.0, self.combined_data[chunk_id][ch][j]))
        

                    

    
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


