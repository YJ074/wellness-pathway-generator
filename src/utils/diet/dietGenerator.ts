
import { DietaryPreference, DietPlan, FormData } from '@/components/wellness/types';
import { 
  getProteinSources, 
  getGrainSources, 
  getVegetableSources, 
  getFruitSources, 
  getSnackSources 
} from './foodSources';
import {
  generateBreakfast,
  generateLunch,
  generateDinner,
  generateSnacks,
  generateMidMorningSnack,
  generateEveningSnack
} from './mealGenerators';

// Calculate BMI
export const calculateBMI = (weight: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
};

// Get BMI category
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

// Calculate BMR using Mifflin-St Jeor equation
export const calculateBMR = (weight: number, heightCm: number, age: number, gender: string): number => {
  // For males: BMR = 10 × weight (kg) + 6.25 × height (cm) – 5 × age + 5
  // For females: BMR = 10 × weight (kg) + 6.25 × height (cm) – 5 × age – 161
  const baseBMR = 10 * weight + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
};

// Adjust calories based on fitness goal
export const calculateDailyCalories = (bmr: number, fitnessGoal: string): number => {
  switch (fitnessGoal) {
    case 'weight-loss':
      return Math.max(bmr - 500, 1200); // Don't go below 1200 calories
    case 'muscle-gain':
      return bmr + 400; // Average of 300-500 calorie surplus
    case 'endurance':
      return bmr + 150; // Average of 100-200 calorie surplus
    case 'maintenance':
    default:
      return bmr;
  }
};

export const generateDietPlan = (
  formData: FormData
): DietPlan => {
  const days = [];
  
  // Convert string values to numbers
  const age = parseInt(formData.age);
  const weight = parseInt(formData.weight);
  
  // Calculate height in cm (from feet/inches if provided, or use cm value)
  let heightCm = parseInt(formData.height);
  if (formData.heightFeet && formData.heightInches) {
    const feet = parseInt(formData.heightFeet);
    const inches = parseInt(formData.heightInches);
    heightCm = Math.round((feet * 30.48) + (inches * 2.54));
  }
  
  // Calculate BMI
  const bmi = calculateBMI(weight, heightCm);
  const bmiCategory = getBMICategory(bmi);
  
  // Calculate BMR
  const bmr = calculateBMR(weight, heightCm, age, formData.gender);
  
  // Adjust calories based on fitness goal
  const dailyCalories = calculateDailyCalories(bmr, formData.fitnessGoal);
  
  const dietaryPreference = formData.dietaryPreference;
  const proteinFocus = formData.fitnessGoal === 'muscle-gain';
  const calorieReduction = formData.fitnessGoal === 'weight-loss';
  
  const proteins = getProteinSources(dietaryPreference);
  const grains = getGrainSources();
  const vegetables = getVegetableSources();
  const fruits = getFruitSources();
  const snacks = getSnackSources(dietaryPreference, calorieReduction);
  
  for (let i = 1; i <= 75; i++) {
    const dayIndex = (i - 1) % 15;
    
    const breakfast = generateBreakfast(dayIndex, dietaryPreference, calorieReduction);
    const midMorningSnack = generateMidMorningSnack(dayIndex, snacks, fruits, calorieReduction);
    const lunch = generateLunch(dayIndex, proteins, grains, vegetables, calorieReduction, proteinFocus);
    const eveningSnack = generateEveningSnack(dayIndex, snacks, fruits, calorieReduction);
    const dinner = generateDinner(dayIndex, proteins, vegetables, calorieReduction, proteinFocus);
    
    // Calculate approximate calories for the day
    const totalCalories = Math.round(dailyCalories / 10) * 10; // Round to nearest 10
    
    // Recommended water intake (in liters)
    const waterIntake = formData.gender === 'male' ? 3.0 : 2.7;
    
    days.push({
      day: i,
      breakfast,
      midMorningSnack,
      lunch,
      eveningSnack,
      dinner,
      calories: totalCalories,
      water: waterIntake,
      bmi,
      bmiCategory
    });
  }
  
  return { 
    days,
    bmi,
    bmiCategory,
    bmr: Math.round(bmr),
    dailyCalories: Math.round(dailyCalories)
  };
};
