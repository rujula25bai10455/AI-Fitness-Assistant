# diet_engine.py

def calculate_bmi(weight_kg, height_cm):
    """
    Calculates Body Mass Index (BMI).
    Formula: weight (kg) / [height (m)]^2
    """
    height_m = height_cm / 100
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 2)

def generate_diet_plan(weight, height, goal):
    """
    Generates a personalized plan based on BMI and User Goal.
    Goals: 'loss' (Weight Loss) or 'gain' (Muscle Gain)
    """
    bmi = calculate_bmi(weight, height)
    
    # Determine BMI Category
    if bmi < 18.5:
        category = "Underweight"
    elif 18.5 <= bmi < 24.9:
        category = "Healthy Weight"
    elif 25 <= bmi < 29.9:
        category = "Overweight"
    else:
        category = "Obese"

    # AI Recommendation Logic
    plan = {
        "user_stats": {"bmi": bmi, "category": category},
        "advice": "",
        "diet": []
    }

    if goal == "loss":
        plan["advice"] = "Focus on a caloric deficit (eat 500 calories less than maintenance)."
        plan["diet"] = [
            "Breakfast: Oatmeal with berries & almond milk",
            "Lunch: Grilled chicken salad with olive oil dressing",
            "Snack: Apple slices with peanut butter",
            "Dinner: Steamed fish with quinoa and broccoli"
        ]
    elif goal == "gain":
        plan["advice"] = "Focus on a caloric surplus and high protein intake."
        plan["diet"] = [
            "Breakfast: 3 Eggs, whole wheat toast, and avocado",
            "Lunch: Brown rice, turkey breast, and mixed veggies",
            "Snack: Greek yogurt with honey and nuts",
            "Dinner: Lean steak with sweet potato"
        ]
    
    return plan

# --- TEST AREA ---
if __name__ == "__main__":
    # Simulate a user
    print("--- AI Dietician Test ---")
    user_weight = 75  # kg
    user_height = 175 # cm
    user_goal = "gain" 

    result = generate_diet_plan(user_weight, user_height, user_goal)
    
    print(f"User BMI: {result['user_stats']['bmi']} ({result['user_stats']['category']})")
    print(f"Advice: {result['advice']}")
    print("Recommended Meals:")
    for meal in result['diet']:
        print(f" - {meal}")