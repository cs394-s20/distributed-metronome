import random
import string

class Room:
    def __init__(self):
        self.users = []
        self.user_data = {}

    @staticmethod
    def generate_code():
        possible = string.ascii_uppercase + '0123456789'
        return ''.join([random.choice(possible) for i in range(4)])
    
