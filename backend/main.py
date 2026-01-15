import os

from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from supabase_client import supabase
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from razorpay_client import razorpay
from fastapi import Request
from fastapi.responses import PlainTextResponse
from datetime import datetime, timedelta

load_dotenv()
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
    name:str
    email:str
    password:str
    role:str

@app.post("/register")
def register(user:UserCreate):
    supabase.table("users").insert({
        "email":user.email,
        "password":user.password,
        "role":user.role,
        "name":user.name
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
    res=supabase.table("users").select("id,email,role,name,created_at").execute()
    return res.data

@app.get("/admin/donations")
def donations_in_admin():
    res=supabase.table("donations").select("donation_id,amount,user_id,created_at,users(email),status").execute()
    return res.data

@app.get("/admin/stats")
def get_stats():
    res=supabase.table("donations").select("amount,status").execute()
    users = supabase.table("users").select("id").execute()
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
        "total_users": len(users.data),
        "total_amount":total,
        "success":success,
        "failed":failed,
        "pending":pending
    }

class CreatePaymentData(BaseModel):
    donation_id:str
    amount:float
    
@app.post("/create-payment")
def payment(data: CreatePaymentData):
    order = razorpay.order.create({
        "amount": int(data.amount * 100),
        "currency": "INR",
    })

    # 🔑 Store order id against donation
    supabase.table("donations").update({
        "razorpay_order_id": order["id"]
    }).eq("donation_id", data.donation_id).execute()

    return {
        "order_id": order["id"],
        "amount": data.amount,
        "currency": "INR",
        "key": os.getenv("RAZORPAY_KEY_ID"),
    }

@app.post("/update-payment-status")
async def update_payment_status(donation_id: str):
    # Fetch the donation details from the database
    donation = supabase.table("donations").select("*").eq("donation_id", donation_id).execute()
    if not donation.data:
        return {"error": "Donation not found"}

    # Extract the Razorpay order ID from the donation record
    razorpay_order_id = donation.data[0]["razorpay_order_id"]

    # Fetch payment details from Razorpay
    payment_details = razorpay.order.payments(razorpay_order_id)

    # Check the payment status
    if payment_details["items"]:
        payment_status = payment_details["items"][0]["status"]

        # Update the donation status in the database
        if payment_status == "captured":
            supabase.table("donations").update({"status": "success"}).eq("donation_id", donation_id).execute()
        elif payment_status == "failed":
            supabase.table("donations").update({"status": "failed"}).eq("donation_id", donation_id).execute()
        else:
            supabase.table("donations").update({"status": "pending"}).eq("donation_id", donation_id).execute()

        return {"status": "updated", "payment_status": payment_status}

    return {"error": "No payment details found"}

@app.get("/admin/export/donations")
def export_donations_csv():
    res = supabase.table("donations") \
        .select("donation_id,amount,status,created_at,users(email)") \
        .execute()

    csv = "donation_id,amount,status,created_at,email\n"

    for d in res.data:
        email = d["users"]["email"] if d["users"] else ""
        csv += f'{d["donation_id"]},{d["amount"]},{d["status"]},{d["created_at"]},{email}\n'

    return PlainTextResponse(csv)

@app.get("/admin/export/users")
def export_users_csv():
    res = supabase.table("users").select("id,name,email,role,created_at").execute()

    csv = "id,name,email,role,created_at\n"

    for u in res.data:
        csv += f'{u["id"]},{u["name"]},{u["email"]},{u["role"]},{u["created_at"]}\n'

    return PlainTextResponse(csv)




@app.get("/admin/users/filter")
def filter_users(from_date: str = None, to_date: str = None):
    query = supabase.table("users").select("id,name,email,role,created_at")

    if from_date:
        query = query.gte("created_at", from_date)

    if to_date:
        end_date = datetime.fromisoformat(to_date) + timedelta(days=1)
        query = query.lt("created_at", end_date.isoformat())

    return query.execute().data

from datetime import datetime, timedelta

@app.get("/admin/donations/filter")
def filter_donations(min_amount: float = 0, from_date: str = None, to_date: str = None):
    query = supabase.table("donations") \
        .select("donation_id,amount,status,created_at,users(email)")

    if min_amount > 0:
        query = query.gte("amount", min_amount)

    if from_date:
        query = query.gte("created_at", from_date)

    if to_date:
        end_date = datetime.fromisoformat(to_date) + timedelta(days=1)
        query = query.lt("created_at", end_date.isoformat())

    return query.execute().data
