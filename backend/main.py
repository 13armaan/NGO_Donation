from fastapi import FastAPI
from pydantic import BaseModel
from supabase_client import supabase
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status":"NGO backend running"}

class UserCreate(BaseModel):
    email:str
    password:str
    role:str

@app.post("/register")
def register(user:UserCreate):
    supabase.table("users").insert({
        "email":user.email,
        "password":user.password,
        "role":user.role
    }).execute()
    return{"message":"registered"}