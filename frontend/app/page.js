"use client";
import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  // --- CHAT VARIABLES ---
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  // --- DIET VARIABLES (NEW) ---
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('loss'); // Default to weight loss
  const [dietPlan, setDietPlan] = useState(null);

  // --- FUNCTION 1: CHAT ---
  const sendMessage = async () => {
    if (!chatInput) return;
    try {
      const res = await axios.post('http://127.0.0.1:8000/chat', { text: chatInput });
      setChatResponse(res.data.ai_message);
    } catch (error) {
      console.error(error);
      setChatResponse("Error: Backend not reachable.");
    }
  };

  // --- FUNCTION 2: GET DIET PLAN (NEW) ---
  const getDietPlan = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/generate-diet', {
        weight: parseFloat(weight),
        height: parseFloat(height),
        goal: goal
      });
      setDietPlan(res.data);
    } catch (error) {
      alert("Error fetching diet plan. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-500">AI Gym & Fitness Assistant</h1>
        <p className="text-gray-400 mt-2">Your Unified AI Ecosystem for Health</p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => setActiveTab('home')} className={`p-3 rounded ${activeTab === 'home' ? 'bg-blue-600' : 'bg-gray-700'}`}>🏠 Dashboard</button>
        <button onClick={() => setActiveTab('chat')} className={`p-3 rounded ${activeTab === 'chat' ? 'bg-blue-600' : 'bg-gray-700'}`}>💬 AI Buddy</button>
        <button onClick={() => setActiveTab('diet')} className={`p-3 rounded ${activeTab === 'diet' ? 'bg-blue-600' : 'bg-gray-700'}`}>🍎 Diet Coach</button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        
        {/* VIEW 1: DASHBOARD */}
        {activeTab === 'home' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-6 rounded hover:bg-gray-600 cursor-pointer transition">
                <h3 className="text-xl">🏋️ AI Trainer</h3>
                <p className="text-sm text-gray-400">Launch Computer Vision</p>
              </div>
              <div className="bg-gray-700 p-6 rounded hover:bg-gray-600 cursor-pointer transition">
                <h3 className="text-xl">📊 Habit Tracker</h3>
                <p className="text-sm text-gray-400">View Prediction</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CHAT BUDDY */}
        {activeTab === 'chat' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Chat with Gym Buddy</h2>
            <div className="mb-4 bg-gray-700 p-4 rounded h-40 overflow-auto">
              {chatResponse ? (
                <p className="text-green-400">🤖 AI: {chatResponse}</p>
              ) : (
                <p className="text-gray-500">Say something like "I am tired"...</p>
              )}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 p-2 rounded text-black" 
                style={{color: 'black', backgroundColor: 'white'}}
                placeholder="Type here..."
              />
              <button onClick={sendMessage} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Send</button>
            </div>
          </div>
        )}

        {/* VIEW 3: DIET PLANNER (UPDATED) */}
        {activeTab === 'diet' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">🍎 AI Dietician</h2>
            
            {/* Input Form */}
            <div className="grid gap-4 mb-6">
              <input 
                type="number" placeholder="Weight (kg)" 
                value={weight} onChange={(e) => setWeight(e.target.value)}
                className="p-2 rounded text-black" style={{color: 'white'}}
              />
              <input 
                type="number" placeholder="Height (cm)" 
                value={height} onChange={(e) => setHeight(e.target.value)}
                className="p-2 rounded text-black" style={{color: 'white'}}
              />
              <select 
                value={goal} onChange={(e) => setGoal(e.target.value)}
                className="p-2 rounded text-black" style={{color: 'white'}}
              >
                <option value="loss">Weight Loss</option>
                <option value="gain">Muscle Gain</option>
              </select>
              <button onClick={getDietPlan} className="bg-green-600 p-2 rounded font-bold hover:bg-green-500">Generate Plan</button>
            </div>

            {/* Results Display */}
            {dietPlan && (
              <div className="bg-gray-700 p-4 rounded animation-fade-in">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Your Plan</h3>
                <p><strong>BMI:</strong> {dietPlan.user_stats.bmi} ({dietPlan.user_stats.category})</p>
                <p className="italic text-gray-300 mb-2">"{dietPlan.advice}"</p>
                <ul className="list-disc pl-5">
                  {dietPlan.diet.map((item, index) => (
                    <li key={index} className="mb-1">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}