from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # <--- NEW IMPORT
from pydantic import BaseModel
from diet_engine import generate_diet_plan
from habit_tracker import predict_skip
from chatbot import get_ai_response

app = FastAPI()

# --- NEW: SECURITY PASS (CORS) ---
# This tells the browser: "It's okay for the website to talk to me!"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all connections
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATA MODELS ---
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

@app.get("/")
def home():
    return {"message": "AI Gym Assistant Backend is FULLY OPERATIONAL!"}

# --- ENDPOINTS ---

@app.post("/generate-diet")
def get_diet(data: UserData):
    plan = generate_diet_plan(data.weight, data.height, data.goal)
    return plan

@app.post("/predict-habit")
def check_habit(data: HabitData):
    result = predict_skip(data.days_since_workout, data.is_weekend, data.is_tired)
    return {"prediction": result}

@app.post("/chat")
def chat_with_ai(data: ChatData):
    response = get_ai_response(data.text)
    return {"ai_message": response}