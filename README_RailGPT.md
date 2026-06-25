# RailGPT - AI Smart Railway Assistant

## Technologies
- React + Vite
- Material UI
- FastAPI
- SQLite
- Gemini AI

## Frontend Setup

```bash
npm install
npm install axios
npm run dev
```

Frontend runs on:
http://localhost:5173

## Backend Setup

Create virtual environment:

```bash
python -m venv venv
venv\Scripts\activate
```

Install packages:

```bash
pip install fastapi uvicorn sqlalchemy python-dotenv google-generativeai
```

Create .env file:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs on:
http://railgpt-backend.onrender.com

## Features
- User Registration
- User Login
- Admin Login
- Admin Dashboard
- Train Search
- AI Planner
- Gemini AI Chatbot
- SQLite Database

## Admin Credentials

Username: admin
Password: admin123
