from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import google.generativeai as genai
from dotenv import load_dotenv
import os

from database import engine, SessionLocal
from models import User, Base

# Load Environment Variables
load_dotenv()

# Gemini Configuration
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.0-flash")

# Create Database Tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Request Models
# ==========================

class ChatRequest(BaseModel):
    message: str


class RegisterRequest(BaseModel):
    name: str
    email: str
    mobile: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class AdminLoginRequest(BaseModel):
    username: str
    password: str


# ==========================
# Home API
# ==========================

@app.get("/")
def home():
    return {
        "message": "RailGPT Backend Running Successfully"
    }


# ==========================
# Register API
# ==========================

@app.post("/register")
def register(data: RegisterRequest):

    db = SessionLocal()

    existing_user = (
        db.query(User)
        .filter(User.email == data.email)
        .first()
    )

    if existing_user:
        return {
            "success": False,
            "message": "Email already exists"
        }

    new_user = User(
        name=data.name,
        email=data.email,
        mobile=data.mobile,
        password=data.password
    )

    db.add(new_user)
    db.commit()

    return {
        "success": True,
        "message": "Registration successful"
    }


# ==========================
# Login API
# ==========================

@app.post("/login")
def login(data: LoginRequest):

    db = SessionLocal()

    user = (
        db.query(User)
        .filter(
            User.email == data.email,
            User.password == data.password
        )
        .first()
    )

    if user:
        return {
            "success": True,
            "message": "Login successful",
            "name": user.name
        }

    return {
        "success": False,
        "message": "Invalid credentials"
    }


# ==========================
# Admin Login API
# ==========================

@app.post("/admin/login")
def admin_login(data: AdminLoginRequest):

    if (
        data.username == "admin"
        and data.password == "admin123"
    ):
        return {
            "success": True,
            "message": "Admin Login Successful"
        }

    return {
        "success": False,
        "message": "Invalid Admin Credentials"
    }


# ==========================
# Get Users API
# ==========================

@app.get("/users")
def get_users():

    db = SessionLocal()

    users = db.query(User).all()

    return users


# ==========================
# AI Chat API
# ==========================

@app.post("/chat")
def chat(request: ChatRequest):

    prompt = f"""
    You are RailGPT,
    an AI Smart Railway Assistant.

    Answer railway and travel related questions.

    User Question:
    {request.message}
    """

    try:

        response = model.generate_content(prompt)

        return {
            "reply": response.text
        }

    except Exception:

        return {
            "reply": f"""
🚆 RailGPT Travel Assistant

Query:
{request.message}

Suggested Guidance:

• Check train availability between your source and destination.
• Compare travel time and train categories.
• Verify seat availability before booking.
• Check fare details before travel.
• Use IRCTC for real-time schedules and reservations.

Note:
Live AI recommendations are temporarily unavailable due to Gemini API quota limitations.

Thank you for using RailGPT.
"""
        }