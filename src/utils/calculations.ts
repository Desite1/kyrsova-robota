import { UserProfileData } from "@/components/UserProfile";

/**
 * Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation
 */
export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female' | 'other'
): number => {
  // For 'other' gender, use the average of male and female calculations
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === 'female') {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    // For 'other', take the average of male and female calculations
    const maleBMR = 10 * weight + 6.25 * height - 5 * age + 5;
    const femaleBMR = 10 * weight + 6.25 * height - 5 * age - 161;
    return (maleBMR + femaleBMR) / 2;
  }
};

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * Activity level multiplier is assumed to be moderate (1.55) for simplicity
 */
export const calculateTDEE = (bmr: number): number => {
  const activityMultiplier = 1.55; // Moderate activity
  return Math.round(bmr * activityMultiplier);
};

/**
 * Calculate daily calorie target based on user goals
 */
export const calculateDailyCalories = (
  tdee: number,
  goal: 'muscle' | 'weight-loss'
): number => {
  if (goal === 'muscle') {
    // Caloric surplus for muscle gain (approximately 15%)
    return Math.round(tdee * 1.15);
  } else {
    // Caloric deficit for weight loss (approximately 20%)
    return Math.round(tdee * 0.8);
  }
};

/**
 * Calculate macronutrient distribution based on user goals
 * Returns an object with protein, carbs, and fat in grams
 */
export const calculateMacros = (
  dailyCalories: number,
  goal: 'muscle' | 'weight-loss',
  weight: number
): { protein: number; carbs: number; fat: number } => {
  let proteinPercentage: number;
  let fatPercentage: number;
  let carbsPercentage: number;

  if (goal === 'muscle') {
    // Higher protein and carbs for muscle gain
    proteinPercentage = 0.3; // 30%
    fatPercentage = 0.25; // 25%
    carbsPercentage = 0.45; // 45%
  } else {
    // Higher protein, moderate fat, lower carbs for weight loss
    proteinPercentage = 0.35; // 35%
    fatPercentage = 0.3; // 30%
    carbsPercentage = 0.35; // 35%
  }

  // Calculate grams of each macronutrient
  // Protein: 4 calories per gram
  // Carbs: 4 calories per gram
  // Fat: 9 calories per gram
  const protein = Math.round((dailyCalories * proteinPercentage) / 4);
  const carbs = Math.round((dailyCalories * carbsPercentage) / 4);
  const fat = Math.round((dailyCalories * fatPercentage) / 9);

  return { protein, carbs, fat };
};

/**
 * Calculate all nutrition targets based on user profile
 */
export const calculateNutritionTargets = (userData: UserProfileData) => {
  const { age, gender, weight, height, goal } = userData;
  
  if (!age || !gender || !weight || !height || !goal) {
    return null;
  }

  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr);
  const dailyCalories = calculateDailyCalories(tdee, goal);
  const macros = calculateMacros(dailyCalories, goal, weight);

  return {
    bmr,
    tdee,
    dailyCalories,
    ...macros
  };
};
