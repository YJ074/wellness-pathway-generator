
import { DietPlan, FormData } from '@/components/wellness/types';
import { DietaryPreference, WellnessGoal } from './types';
import { 
  getProteinSources, 
  getGrainSources, 
  getVegetableSources, 
  getFruitSources, 
  getSnackSources,
  limitSoyaInDietDays,
} from './foodSources';
import {
  generateBreakfast as origGenerateBreakfast,
  generateLunch as origGenerateLunch,
  generateDinner as origGenerateDinner,
  generateSnacks,
  generateMidMorningSnack as origGenerateMidMorningSnack,
  generateEveningSnack as origGenerateEveningSnack
} from './mealGenerators';
import { 
  calculateBMI, 
  getBMICategory, 
  calculateBMR, 
  calculateDailyCalories 
} from './metrics/bmiCalculator';
import {
  generateHairNutrients,
  generateSkinNutrients,
  generateFatLossNotes,
  generateHerbalRecommendations
} from './wellness/wellnessRecommendations';
import { generateRegionalNote } from './regional/regionalRecommendations';

// Re-export for backward compatibility
export { calculateBMI, getBMICategory, calculateBMR, calculateDailyCalories };

// Re-export new allergy-aware wrappers:
export function generateBreakfast(dayIndex: number, dietaryPreference: string, isWeightLoss: boolean, allergies?: string, region?: string) {
  return origGenerateBreakfast(dayIndex, dietaryPreference, isWeightLoss, allergies, region);
}

export function generateMidMorningSnack(dayIndex: number, snacks: string[], fruits: string[], isWeightLoss: boolean, allergies?: string) {
  return origGenerateMidMorningSnack(dayIndex, snacks, fruits, isWeightLoss, allergies);
}

export function generateLunch(dayIndex: number, proteins: string[], grains: string[], vegetables: string[], isWeightLoss: boolean, isProteinFocus: boolean, allergies?: string, region?: string) {
  return origGenerateLunch(dayIndex, proteins, grains, vegetables, isWeightLoss, isProteinFocus, allergies, region);
}

export function generateEveningSnack(dayIndex: number, snacks: string[], fruits: string[], isWeightLoss: boolean, allergies?: string, region?: string) {
  return origGenerateEveningSnack(dayIndex, snacks, fruits, isWeightLoss, allergies, region);
}

export function generateDinner(dayIndex: number, proteins: string[], vegetables: string[], isWeightLoss: boolean, isProteinFocus: boolean, allergies?: string, region?: string) {
  return origGenerateDinner(dayIndex, proteins, vegetables, isWeightLoss, isProteinFocus, allergies, region);
}

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
  
  // Get wellness goals (default to general wellness if none selected)
  const wellnessGoals = formData.wellnessGoals || ['general-wellness'];
  
  // Adjust calories based on fitness goal and wellness goals
  const dailyCalories = calculateDailyCalories(bmr, formData.fitnessGoal, wellnessGoals, formData.has_muscular_build);
  
  const dietaryPreference = formData.dietaryPreference;
  const proteinFocus = formData.fitnessGoal === 'muscle-gain';
  const calorieReduction = (formData.fitnessGoal === 'weight-loss' || 
                           wellnessGoals.includes('fat-loss') || 
                           wellnessGoals.includes('inch-loss')) && 
                           !formData.has_muscular_build;
  const { allergies, region } = formData;

  // Use new allergy-aware accessors
  const rawProteins = getProteinSources(dietaryPreference, allergies);
  const proteinsByDay = limitSoyaInDietDays(rawProteins, 75, 30);

  const grains = getGrainSources(dietaryPreference, allergies);
  const vegetables = getVegetableSources(dietaryPreference, allergies);
  const fruits = getFruitSources(dietaryPreference, allergies);
  const snacks = getSnackSources(dietaryPreference, calorieReduction, allergies);
  
  for (let i = 1; i <= 75; i++) {
    const dayIndex = (i - 1) % 15;
    
    const breakfast = generateBreakfast(dayIndex, dietaryPreference, calorieReduction, allergies, region);
    const midMorningSnack = generateMidMorningSnack(dayIndex, snacks, fruits, calorieReduction, allergies);

    // Use protein for this day, limited for soya according to our rule
    const proteinForDay = proteinsByDay[i - 1];
    // Lunch and dinner use proteins; pass a single-item protein array so they use correct protein for the day
    const lunch = generateLunch(dayIndex, [proteinForDay], grains, vegetables, calorieReduction, proteinFocus, allergies, region);
    const eveningSnack = generateEveningSnack(dayIndex, snacks, fruits, calorieReduction, allergies, region);
    const dinner = generateDinner(dayIndex, [proteinForDay], vegetables, calorieReduction, proteinFocus, allergies, region);
    
    // Calculate approximate calories for the day
    const totalCalories = Math.round(dailyCalories / 10) * 10;
    
    // Recommended water intake (in liters)
    const waterIntake = formData.gender === 'male' ? 3.0 : 2.7;
    
    // Generate wellness goal specific information
    const hairNutrients = wellnessGoals.includes('hair-fall-control') ? 
      generateHairNutrients(`${breakfast} ${lunch} ${dinner}`) : undefined;
      
    const skinNutrients = wellnessGoals.includes('glowing-skin') ? 
      generateSkinNutrients(`${breakfast} ${lunch} ${dinner}`) : undefined;
      
    const fatLossNotes = (wellnessGoals.includes('fat-loss') || wellnessGoals.includes('inch-loss')) ? 
      generateFatLossNotes(`${breakfast} ${lunch} ${dinner}`, totalCalories) : undefined;
      
    const herbalRecommendations = generateHerbalRecommendations(dayIndex, wellnessGoals);
    
    // Generate regional note if applicable
    const regionalNote = region ? generateRegionalNote(region) : undefined;
    
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
      bmiCategory,
      wellnessGoals,
      hairNutrients,
      skinNutrients,
      fatLossNotes,
      herbalRecommendations,
      regionalNote
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
