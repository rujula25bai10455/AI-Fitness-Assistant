from textblob import TextBlob
import random

def get_ai_response(user_text):
    # 1. Analyze Sentiment
    blob = TextBlob(user_text)
    sentiment = blob.sentiment.polarity # Score from -1 (Negative) to +1 (Positive)
    
    # 2. Define Responses
    motivational_quotes = [
        "Don't stop when you're tired. Stop when you're done!",
        "Your body can stand almost anything. It’s your mind that you have to convince.",
        "The only bad workout is the one that didn't happen."
    ]
    
    celebratory_responses = [
        "That's the spirit! Keep crushing it! 🔥",
        "Awesome energy! Use that power in your next set!",
        "You are unstoppable today!"
    ]
    
    neutral_responses = [
        "I'm listening. Tell me more about your fitness goals.",
        "Consistency is key. How are you feeling about your progress?",
        "Ready to hit the gym?"
    ]

    # 3. Logic to choose response
    if sentiment < -0.3:
        # User sounds negative/tired
        return f"I sense you're feeling down. Remember: {random.choice(motivational_quotes)}"
    elif sentiment > 0.3:
        # User sounds positive
        return random.choice(celebratory_responses)
    else:
        # Neutral
        return random.choice(neutral_responses)

# --- TEST IT LOCALLY ---
if __name__ == "__main__":
    print("AI Buddy: Hello! How are you feeling today?")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "quit":
            break
        response = get_ai_response(user_input)
        print(f"AI Buddy: {response}")