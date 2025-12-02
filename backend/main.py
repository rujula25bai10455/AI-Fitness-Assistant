from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess

# Import your custom AI modules
from diet_engine import generate_diet_plan
from habit_tracker import predict_skip
from chatbot import get_ai_response

app = FastAPI()

# --- SECURITY CONFIGURATION (CORS) ---
# This allows your Frontend (localhost:3000) to talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATA MODELS ---
# These define what data the API expects to receive
class UserData(BaseModel):
    weight: float
    height: float
    goal: str

class HabitData(BaseModel):
    days_since_workout: int
    is_weekend: int
    is_tired: int

class ChatData(BaseModel):
    text: str

# --- API ENDPOINTS ---

@app.get("/")
def home():
    return {"message": "AI Gym Assistant Backend is FULLY OPERATIONAL!"}

# 1. AI Dietician Endpoint
@app.post("/generate-diet")
def get_diet(data: UserData):
    plan = generate_diet_plan(data.weight, data.height, data.goal)
    return plan

# 2. Habit Tracker Endpoint
@app.post("/predict-habit")
def check_habit(data: HabitData):
    result = predict_skip(data.days_since_workout, data.is_weekend, data.is_tired)
    return {"prediction": result}

# 3. AI Chatbot Endpoint
@app.post("/chat")
def chat_with_ai(data: ChatData):
    response = get_ai_response(data.text)
    return {"ai_message": response}

# 4. AI Trainer Launcher (Opens the Camera)
@app.post("/start-trainer")
def start_trainer():
    try:
        # This runs the separate python script for the camera
        subprocess.Popen(["python", "ai_trainer.py"], shell=True)
        return {"message": "AI Trainer Launched Successfully!"}
    except Exception as e:
        return {"message": f"Error launching trainer: {str(e)}"}