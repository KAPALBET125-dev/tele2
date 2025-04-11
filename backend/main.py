
from fastapi import FastAPI, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from datetime import datetime, timedelta
import json
import os

app = FastAPI()

SECRET_KEY = "secretkey"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_token(data: dict):
    data.update({"exp": datetime.utcnow() + timedelta(hours=5)})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def get_user(token: str = Depends(oauth2_scheme)):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except:
        raise HTTPException(status_code=401, detail="Invalid Token")

@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    with open("data/admins.json") as f:
        for admin in json.load(f):
            if admin["username"] == username and admin["password"] == password:
                return {"access_token": create_token({"sub": username, "role": admin["role"]}), "token_type": "bearer"}
    raise HTTPException(status_code=403, detail="Invalid credentials")

@app.get("/accounts")
def get_accounts(user=Depends(get_user)):
    with open("data/accounts.json") as f:
        return json.load(f)

@app.post("/accounts")
def add_account(phone: str = Form(...), user=Depends(get_user)):
    with open("data/accounts.json") as f:
        data = json.load(f)
    data.append({"phone": phone})
    with open("data/accounts.json", "w") as f:
        json.dump(data, f)
    return {"message": "added"}

@app.get("/schedules")
def get_schedules(user=Depends(get_user)):
    with open("data/schedules.json") as f:
        return json.load(f)

@app.post("/schedules")
def add_schedule(phone: str = Form(...), target: str = Form(...), interval: int = Form(...), user=Depends(get_user)):
    with open("data/schedules.json") as f:
        data = json.load(f)
    data.append({"phone": phone, "target": target, "interval": interval})
    with open("data/schedules.json", "w") as f:
        json.dump(data, f)
    return {"message": "scheduled"}

@app.get("/admins")
def get_admins(user=Depends(get_user)):
    if user["role"] != "superadmin":
        raise HTTPException(status_code=403, detail="Forbidden")
    with open("data/admins.json") as f:
        return json.load(f)

@app.post("/admins")
def add_admin(username: str = Form(...), password: str = Form(...), role: str = Form(...), user=Depends(get_user)):
    if user["role"] != "superadmin":
        raise HTTPException(status_code=403, detail="Forbidden")
    with open("data/admins.json") as f:
        admins = json.load(f)
    admins.append({"username": username, "password": password, "role": role})
    with open("data/admins.json", "w") as f:
        json.dump(admins, f)
    return {"message": "admin added"}
