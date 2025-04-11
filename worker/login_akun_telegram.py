
import os
from pyrogram import Client

api_id = 21568771
api_hash = "67c02cbc7ba43b88a717fc3019cf3771"
os.makedirs("sessions", exist_ok=True)

phone = input("Nomor HP (dengan +62): ")
app = Client(f"sessions/{phone}", api_id=api_id, api_hash=api_hash)
app.start()
print("Login berhasil dan session disimpan.")
app.stop()
