"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  // --- CHAT VARIABLES ---
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  // --- DIET VARIABLES ---
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('loss');
  const [dietPlan, setDietPlan] = useState(null);

  // --- ADMIN DATA ---
  const gymData = [
    { name: 'Mon', workouts: 12 },
    { name: 'Tue', workouts: 19 },
    { name: 'Wed', workouts: 3 },
    { name: 'Thu', workouts: 5 },
    { name: 'Fri', workouts: 2 },
    { name: 'Sat', workouts: 20 },
    { name: 'Sun', workouts: 15 },
  ];

  // --- FUNCTION 1: CHAT ---
  const sendMessage = async () => {
    if (!chatInput) return;
    try {
      const res = await axios.post('http://127.0.0.1:8000/chat', { text: chatInput });
      setChatResponse(res.data.ai_message);
    } catch (error) {
      console.error(error);
      setChatResponse("Error: Is the Backend running?");
    }
  };

  // --- FUNCTION 2: DIET PLAN ---
  const getDietPlan = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/generate-diet', {
        weight: parseFloat(weight),
        height: parseFloat(height),
        goal: goal
      });
      setDietPlan(res.data);
    } catch (error) {
      alert("Error fetching diet plan.");
    }
  };

  // --- FUNCTION 3: START CAMERA ---
  const startTrainer = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/start-trainer');
      alert("Starting AI Trainer... Check your taskbar!");
    } catch (error) {
      alert("Error: Is the backend running?");
    }
  };

  // --- FUNCTION 4: HABIT TRACKER (NEW) ---
  const checkHabit = async () => {
    try {
      // simulating a user who hasn't worked out in 8 days
      const res = await axios.post('http://127.0.0.1:8000/predict-habit', {
        days_since_workout: 8,
        is_weekend: 1,
        is_tired: 1
      });
      alert("🧠 AI PREDICTION:\n" + res.data.prediction);
    } catch (error) {
      alert("Error: Is the backend running?");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-500">AI Gym & Fitness Assistant</h1>
        <p className="text-gray-400 mt-2">Your Unified AI Ecosystem for Health</p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => setActiveTab('home')} className={`p-3 rounded ${activeTab === 'home' ? 'bg-blue-600' : 'bg-gray-700'}`}>🏠 Dashboard</button>
        <button onClick={() => setActiveTab('chat')} className={`p-3 rounded ${activeTab === 'chat' ? 'bg-blue-600' : 'bg-gray-700'}`}>💬 AI Buddy</button>
        <button onClick={() => setActiveTab('diet')} className={`p-3 rounded ${activeTab === 'diet' ? 'bg-blue-600' : 'bg-gray-700'}`}>🍎 Diet Coach</button>
        <button onClick={() => setActiveTab('admin')} className={`p-3 rounded ${activeTab === 'admin' ? 'bg-red-600' : 'bg-gray-700'}`}>📈 Admin</button>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        
        {/* VIEW 1: DASHBOARD */}
        {activeTab === 'home' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* AI Trainer Card */}
              <div 
                onClick={startTrainer}
                className="bg-gray-700 p-6 rounded hover:bg-gray-600 cursor-pointer transition border-2 border-transparent hover:border-blue-400"
              >
                <h3 className="text-xl">🏋️ AI Trainer</h3>
                <p className="text-sm text-gray-400">Launch Computer Vision</p>
              </div>

              {/* Habit Tracker Card - NOW CLICKABLE */}
              <div 
                onClick={checkHabit}
                className="bg-gray-700 p-6 rounded hover:bg-gray-600 cursor-pointer transition border-2 border-transparent hover:border-blue-400"
              >
                <h3 className="text-xl">📊 Habit Tracker</h3>
                <p className="text-sm text-gray-400">Test AI Prediction</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CHAT */}
        {activeTab === 'chat' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Chat with Gym Buddy</h2>
            <div className="mb-4 bg-gray-700 p-4 rounded h-40 overflow-auto">
              {chatResponse ? <p className="text-green-400">🤖 AI: {chatResponse}</p> : <p className="text-gray-500">Say something...</p>}
            </div>
            <div className="flex gap-2">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 p-2 rounded text-black" style={{color: 'black', backgroundColor: 'white'}} placeholder="Type here..." />
              <button onClick={sendMessage} className="bg-blue-500 px-4 py-2 rounded">Send</button>
            </div>
          </div>
        )}

        {/* VIEW 3: DIET */}
        {activeTab === 'diet' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">🍎 AI Dietician</h2>
            <div className="grid gap-4 mb-6">
              <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="p-2 rounded text-black" style={{color: 'black'}} />
              <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="p-2 rounded text-black" style={{color: 'black'}} />
              <select value={goal} onChange={(e) => setGoal(e.target.value)} className="p-2 rounded text-black" style={{color: 'black'}}>
                <option value="loss">Weight Loss</option>
                <option value="gain">Muscle Gain</option>
              </select>
              <button onClick={getDietPlan} className="bg-green-600 p-2 rounded font-bold">Generate Plan</button>
            </div>
            {dietPlan && (
              <div className="bg-gray-700 p-4 rounded">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Your Plan</h3>
                <p><strong>BMI:</strong> {dietPlan.user_stats.bmi} ({dietPlan.user_stats.category})</p>
                <p className="italic text-gray-300 mb-2">"{dietPlan.advice}"</p>
                <ul className="list-disc pl-5">{dietPlan.diet.map((item, index) => <li key={index}>{item}</li>)}</ul>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: ADMIN */}
        {activeTab === 'admin' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-red-400">📈 Admin Dashboard</h2>
            <div className="mb-6 grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-700 p-3 rounded"><h3 className="text-xl font-bold">1,240</h3><p className="text-sm text-gray-400">Workouts</p></div>
              <div className="bg-gray-700 p-3 rounded"><h3 className="text-xl font-bold">85%</h3><p className="text-sm text-gray-400">Retention</p></div>
              <div className="bg-gray-700 p-3 rounded"><h3 className="text-xl font-bold">42</h3><p className="text-sm text-gray-400">Users</p></div>
            </div>
            <div className="h-64 bg-gray-700 p-4 rounded text-black">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gymData}>
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Bar dataKey="workouts" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}