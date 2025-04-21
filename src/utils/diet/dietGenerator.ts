import { DietPlan, FormData } from '@/components/wellness/types';
import { DietaryPreference } from './types';
import { 
  getProteinSources, 
  getGrainSources, 
  getVegetableSources, 
  getFruitSources, 
  getSnackSources,
  limitSoyaInDietDays,
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

// Get BMI category - Updated to consider exercise frequency and fitness goals
export const getBMICategory = (bmi: number, exerciseFrequency: string, fitnessGoal: string): string => {
  // For highly active individuals or those focused on muscle gain, adjust BMI interpretation
  const isHighlyActive = exerciseFrequency === '5+' || exerciseFrequency === '3-4';
  const isFocusedOnMuscle = fitnessGoal === 'muscle-gain';
  
  if (isHighlyActive || isFocusedOnMuscle) {
    // Allow for higher BMI thresholds for athletic individuals
    if (bmi < 18.5) return 'underweight';
    if (bmi < 27) return 'normal'; // Increased upper threshold for "normal" 
    if (bmi < 32) return 'athletic build'; // New category for muscular individuals
    return 'high BMI'; // More neutral term than "obese"
  } else {
    // Standard BMI categories for less active individuals
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal';
    if (bmi < 30) return 'overweight';
    return 'obese';
  }
};

// Calculate BMR using Mifflin-St Jeor equation
export const calculateBMR = (weight: number, heightCm: number, age: number, gender: string): number => {
  // For males: BMR = 10 × weight (kg) + 6.25 × height (cm) – 5 × age + 5
  // For females: BMR = 10 × weight (kg) + 6.25 × height (cm) – 5 × age – 161
  const baseBMR = 10 * weight + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
};

// Adjust calories based on fitness goal, muscular build overrides BMI-based loss logic
export const calculateDailyCalories = (bmr: number, fitnessGoal: string, hasMuscularBuild?: boolean): number => {
  // If muscular build, IGNORE BMI and user is NOT forced into weight loss
  switch (fitnessGoal) {
    case 'weight-loss':
      // If user has muscular build, don't restrict calories by BMI
      return hasMuscularBuild ? bmr : Math.max(bmr - 500, 1200);
    case 'muscle-gain':
      return bmr + 400;
    case 'endurance':
      return bmr + 150;
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
  const bmiCategory = getBMICategory(bmi, formData.exerciseFrequency, formData.fitnessGoal);
  
  // Calculate BMR
  const bmr = calculateBMR(weight, heightCm, age, formData.gender);
  
  // Adjust calories based on fitness goal (muscular build disables BMI-based forced loss)
  const dailyCalories = calculateDailyCalories(bmr, formData.fitnessGoal, formData.has_muscular_build);
  
  const dietaryPreference = formData.dietaryPreference;
  const proteinFocus = formData.fitnessGoal === 'muscle-gain';
  // Only trigger calorie reduction for non-muscular build users (previous code already handled this!)

  // Key change: limit soya appearance to once in any 30 days for protein sources!
  const rawProteins = getProteinSources(dietaryPreference);
  // Precompute 75-day protein rotation with soya limited
  const proteinsByDay = limitSoyaInDietDays(rawProteins, 75, 30);
  
  const grains = getGrainSources();
  const vegetables = getVegetableSources();
  const fruits = getFruitSources();
  // Calorie reduction only if not muscular build
  const calorieReduction = formData.fitnessGoal === 'weight-loss' && !formData.has_muscular_build;
  const snacks = getSnackSources(dietaryPreference, calorieReduction);
  
  for (let i = 1; i <= 75; i++) {
    const dayIndex = (i - 1) % 15;
    
    const breakfast = generateBreakfast(dayIndex, dietaryPreference, calorieReduction);
    const midMorningSnack = generateMidMorningSnack(dayIndex, snacks, fruits, calorieReduction);

    // Use protein for this day, limited for soya according to our rule
    const proteinForDay = proteinsByDay[i - 1];
    // Lunch and dinner use proteins; pass a single-item protein array so they use correct protein for the day
    const lunch = generateLunch(dayIndex, [proteinForDay], grains, vegetables, calorieReduction, proteinFocus);
    const eveningSnack = generateEveningSnack(dayIndex, snacks, fruits, calorieReduction);
    const dinner = generateDinner(dayIndex, [proteinForDay], vegetables, calorieReduction, proteinFocus);
    
    // Calculate approximate calories for the day
    const totalCalories = Math.round(dailyCalories / 10) * 10;
    
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
