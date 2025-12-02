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