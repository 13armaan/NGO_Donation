from fastapi import FastAPI
from pydantic import BaseModel
from supabase_client import supabase
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

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

class LoginData(BaseModel):
    email:str
    password:str

@app.post("/login")
def Login(data:LoginData):
    res=supabase.table("users").select("*").eq("email",data.email).execute()

    if len(res.data)==0:
        return{"error":"user not found"}
    
    user=res.data[0]

    if user["password"]!=data.password:
        return{"error":"invalid password"}
    
    return{
        "message":"Login success",
        "user_id":user["id"],
        "role":user["role"],
        "email":user["email"]
    }

class donationData(BaseModel):
    amount:float
    user_id:int
    
    

@app.post("/donate")
def Donation(data:donationData):
    res=supabase.table("donations").insert({
        "user_id":data.user_id,
        "status":"pending",
        
        "amount":data.amount
    }).execute()
    
    return{
        "message":"Donation created",
        "donation_id":res.data[0]["donation_id"]
    }
        
@app.get("/my_donations/{user_id}")
def my_donations(user_id:int):
    res=supabase.table("donations").select("*").eq("user_id",user_id).order("donation_id",desc=True).execute()
    return res.data
  
@app.get("/admin/users")
def users_in_admin():
    res=supabase.table("users").select("id,email,role").execute()
    return res.data

@app.get("/admin/donations")
def donations_in_admin():
    res=supabase.table("donations").select("donation_id,amount,user_id,created_at").execute()
    return res.data

@app.get("/admin/stats")
def get_stats():
    res=supabase.table("donations").select("amount,status").execute()

    total=0
    success=0
    pending=0
    failed=0

    for d in res.data:
        if d["status"]=="success":
            total+=d["amount"]
            success+=1
        elif d["status"]=="pending":
            pending+=1
        else:
            failed+=1

    return{
        "Total Donated Amount":total,
        "success":success,
        "failed":failed,
        "pending":pending
    }