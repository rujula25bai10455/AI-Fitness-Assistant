# 🏋️ AI Gym & Fitness Assistant

**A Unified AI Ecosystem for Personal Fitness Management**

The **AI Gym & Fitness Assistant** is a full-stack application designed to revolutionize home workouts using Artificial Intelligence. It combines **Computer Vision**, **Natural Language Processing (NLP)**, and **Predictive Analytics** to act as a smart personal trainer, dietician, and motivator.

---

## 🚀 Key Features

### 1. 👁️ AI Gym Trainer (Computer Vision)
- Uses **MediaPipe** and **OpenCV** to track human body landmarks in real-time.
- Automatically counts repetitions for exercises (currently calibrated for Bicep Curls).
- Analyzes posture to detect "Up" and "Down" states of the arm.

### 2. 🍎 AI Dietician & Calorie Coach
- Calculates **BMI** (Body Mass Index) based on user height and weight.
- Generates personalized meal plans for **Weight Loss** or **Muscle Gain**.
- Provides health advice tailored to the user's BMI category.

### 3. 💬 Virtual Gym Buddy (Sentiment Analysis)
- An intelligent chatbot companion powered by **TextBlob**.
- Detects the user's emotional state (e.g., tired, happy, unmotivated).
- Responds with dynamic motivational quotes or celebrations based on the mood.

### 4. 📊 AI Habit Tracker (Behavioral Prediction)
- Uses **Scikit-Learn** (Decision Tree Classifier) to analyze user history.
- Predicts the likelihood of a user **skipping the gym** based on factors like "Days Since Last Workout," "Weekend Status," and "Fatigue Level."
- Helps in preventative intervention for at-risk users.

---

## 🛠️ Technical Architecture

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js (React) | Interactive Web Dashboard & UI |
| **Styling** | Tailwind CSS | Modern, responsive design |
| **Backend API** | Python (FastAPI) | Logic processing, API endpoints |
| **Computer Vision** | MediaPipe, OpenCV | Pose estimation & Rep counting |
| **Machine Learning** | Scikit-Learn | Habit prediction model |
| **NLP** | TextBlob | Sentiment analysis for Chatbot |
| **Communication** | Axios | Connecting Frontend to Backend |

---

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally on your machine.

### Prerequisites
- Python 3.10 or higher
- Node.js & npm (for the frontend)

### Step 1: Clone the Repository
```bash
git clone [https://github.com/rujula25bai10455/AI-Fitness-Assistant.git](https://github.com/rujula25bai10455/AI-Fitness-Assistant.git)
cd AI-Fitness-Assistant
### Step 2: Backend Setup ("The Brain)
1. Navigate to backend folder:
cd backend
2. Create and active a virtual environment:
python -m venv venv
venv\Scripts\activate
3. Install the required Python libraries:
pip install fastapi uvicorn opencv-python mediapipe numpy scikit-learn textblob
### Step 3: Frontend Setup ("The Dashboard")
1. Open a new terminal and navigate to the frontend folder:
cd frontend
2. Install dependancies:
npm install axios


## How to run the project:
you need to run three components simultaneously for the full experience.
1. Start the backend API:
In your backend Terminal (with venv active):
unicorn main:app --reload
2.Start the web dashboard:
In your frontend terminal:
npm run dev
3. Launch the AI vision trainer:
To start the camera and count reps , open a third terminal , navigate to backend , active venv , and run:
python ai_trainer.py


Feature Tested	Input	Expected Output	Status
Rep Counting	Arm curled up < 30°	Counter increments by 1	✅ Pass
Diet Planner	75kg, 175cm, "Gain"	High-protein meal plan generated	✅ Pass
Habit Prediction	8 days gap, Tired	"High Risk" warning returned	✅ Pass
Chatbot	"I feel lazy"	Motivational quote response	✅ Pass


## Future Roadmap:
1. []Iot Integration: Connect with smart bands to track heart rate.
2. []Gym Recommendation: Use Google maps API to find nearby gyms .
3. [] Database: Save user progress using MongoDB.
4. [] User Auth: Add login/signup functionality .


