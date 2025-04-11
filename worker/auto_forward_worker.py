
import asyncio
import json
from pyrogram import Client

with open("data/accounts.json") as f:
    accounts = json.load(f)
with open("data/schedules.json") as f:
    schedules = json.load(f)

async def forward_worker(account):
    session = f"sessions/{account['phone']}"
    app = Client(session, api_id=21568771, api_hash="67c02cbc7ba43b88a717fc3019cf3771")
    await app.start()
    while True:
        for job in filter(lambda j: j["phone"] == account["phone"], schedules):
            try:
                source, target, interval = job["source"], job["target"], job["interval"]
                async for msg in app.get_chat_history(source, limit=1):
                    await app.forward_messages(chat_id=target, from_chat_id=source, message_ids=msg.message_id)
                    break
                await asyncio.sleep(interval * 60)
            except Exception as e:
                print(f"Error: {e}")
                await asyncio.sleep(10)

async def main():
    await asyncio.gather(*(forward_worker(a) for a in accounts))

if __name__ == "__main__":
    asyncio.run(main())
