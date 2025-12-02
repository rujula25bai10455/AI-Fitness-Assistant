import numpy as np
from sklearn.tree import DecisionTreeClassifier

# --- STEP 1: CREATE TRAINING DATA (The "Experience") ---
# Features: [Days_Since_Last_Workout, Is_Weekend (1=Yes, 0=No), Feeling_Tired (1=Yes, 0=No)]
X_train = [
    [1, 0, 0], # Worked out yesterday, Weekday, Not tired -> 
    [5, 1, 1], # 5 days gap, Weekend, Tired -> 
    [2, 0, 1], # 2 days gap, Weekday, Tired -> 
    [0, 0, 0], # Worked out today, Weekday, Not tired -> 
    [7, 1, 0], # 7 days gap, Weekend, Not tired -> 
    [10, 0, 1] # 10 days gap, Weekday, Tired -> 
]

# Labels: [Will_Skip_Gym? (0 = No, 1 = Yes)]
y_train = [0, 1, 1, 0, 1, 1]

# --- STEP 2: TRAIN THE MODEL ---
print("Training the Habit AI...")
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)
print("AI Training Complete!")

# --- STEP 3: PREDICTION FUNCTION ---
def predict_skip(days_since, is_weekend, is_tired):
    """
    Predicts if the user will skip the gym based on current status.
    """
    prediction = clf.predict([[days_since, is_weekend, is_tired]])
    
    if prediction[0] == 1:
        return "⚠️ HIGH RISK: User is likely to skip! Send a motivation notification."
    else:
        return "✅ LOW RISK: User is on track."

# --- STEP 4: TEST IT ---
if __name__ == "__main__":
    # Test Case 1: 3 days gap, Weekday (0), Not Tired (0)
    print("\n--- Test Case 1 ---")
    print("User hasn't gone in 3 days, it's Monday, feeling fresh.")
    print(predict_skip(3, 0, 0))

    # Test Case 2: 8 days gap, Weekend (1), Tired (1)
    print("\n--- Test Case 2 ---")
    print("User hasn't gone in 8 days, it's Saturday, feeling tired.")
    print(predict_skip(8, 1, 1))