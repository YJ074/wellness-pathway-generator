
import { DietPlan, FormData } from '@/components/wellness/types';
import { calculateBMI, getBMICategory, calculateBMR, calculateDailyCalories } from '../metrics/bmiCalculator';
import { generateDays } from './daysGenerator';
import { calculateDailyProteinRequirement } from '../helpers/portionTypes/proteinPortions';

export { calculateBMI, getBMICategory, calculateBMR, calculateDailyCalories };

export const generateDietPlan = (
  formData: FormData
): DietPlan => {
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
  
  // Get wellness goals (default to general wellness if none selected)
  const wellnessGoals = formData.wellnessGoals || ['general-wellness'];
  
  // Adjust calories based on fitness goal and wellness goals
  const dailyCalories = calculateDailyCalories(bmr, formData.fitnessGoal, wellnessGoals, formData.has_muscular_build);
  
  // Generate the diet days
  const days = generateDays(formData, bmi, bmiCategory, dailyCalories);
  
  // Target protein calculation for logging purposes
  const targetProteinGrams = calculateDailyProteinRequirement(
    weight,
    formData.exerciseFrequency || 'moderate',
    formData.fitnessGoal === 'muscle-gain' ? 'muscle-gain' : 
      (formData.fitnessGoal === 'weight-loss' || 
       wellnessGoals.includes('fat-loss') || 
       wellnessGoals.includes('inch-loss')) && 
      !formData.has_muscular_build ? 'weight-loss' : 'maintenance'
  );
  console.log(`Target protein intake: ${targetProteinGrams}g (${(targetProteinGrams/weight).toFixed(1)}g/kg)`);
  
  return { 
    days,
    bmi,
    bmiCategory,
    bmr: Math.round(bmr),
    dailyCalories: Math.round(dailyCalories)
  };
};
