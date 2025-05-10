
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
  generateBreakfast as genBreakfast,
  generateLunch as genLunch,
  generateDinner as genDinner,
  generateSnacks as genSnacks,
  generateMidMorningSnack as genMidMorningSnack,
  generateEveningSnack as genEveningSnack
} from './generators';
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
import { getProteinPortion } from './helpers/portionHelpers';

// Re-export for backward compatibility
export { calculateBMI, getBMICategory, calculateBMR, calculateDailyCalories };

// Re-export new allergy-aware wrappers:
export function generateBreakfast(dayIndex: number, dietaryPreference: string, isWeightLoss: boolean, allergies?: string, region?: string) {
  return genBreakfast(dayIndex, dietaryPreference, isWeightLoss, allergies, region);
}

export function generateMidMorningSnack(dayIndex: number, snacks: string[], fruits: string[], isWeightLoss: boolean, allergies?: string) {
  return genMidMorningSnack(dayIndex, snacks, fruits, isWeightLoss, allergies);
}

export function generateLunch(dayIndex: number, proteins: string[], grains: string[], vegetables: string[], isWeightLoss: boolean, isProteinFocus: boolean, allergies?: string, region?: string) {
  return genLunch(dayIndex, proteins, grains, vegetables, isWeightLoss, isProteinFocus, allergies, region);
}

export function generateEveningSnack(dayIndex: number, snacks: string[], fruits: string[], isWeightLoss: boolean, allergies?: string, region?: string) {
  return genEveningSnack(dayIndex, snacks, fruits, isWeightLoss, allergies, region);
}

export function generateDinner(dayIndex: number, proteins: string[], vegetables: string[], isWeightLoss: boolean, isProteinFocus: boolean, allergies?: string, region?: string) {
  return genDinner(dayIndex, proteins, vegetables, isWeightLoss, isProteinFocus, allergies, region);
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

  // Optimize protein sources - get double the amount needed so we can pair different proteins
  const rawProteins = getProteinSources(dietaryPreference, allergies);
  // Enhance with adequate protein portions
  const proteinRequirement = getProteinPortion(dietaryPreference, calorieReduction, proteinFocus);
  
  // Distribute soya in limited amounts throughout the diet
  const proteinsByDay = limitSoyaInDietDays(rawProteins, 75, 30);

  const grains = getGrainSources(dietaryPreference, allergies);
  const vegetables = getVegetableSources(dietaryPreference, allergies);
  const fruits = getFruitSources(dietaryPreference, allergies);
  const snacks = getSnackSources(dietaryPreference, calorieReduction, allergies);
  
  for (let i = 1; i <= 75; i++) {
    const dayIndex = (i - 1) % 15;
    
    const breakfast = generateBreakfast(dayIndex, dietaryPreference, calorieReduction, allergies, region);
    const midMorningSnack = generateMidMorningSnack(dayIndex, snacks, fruits, calorieReduction, allergies);

    // Use proteins for this day, limited for soya according to our rule
    // But use entire protein array to ensure variety and optimal pairing
    const proteinForDay = proteinsByDay[i - 1];
    
    // Use the entire protein array for lunch/dinner to enable protein pairing for complete amino acids
    const lunch = generateLunch(dayIndex, proteinsByDay, grains, vegetables, calorieReduction, proteinFocus, allergies, region);
    const eveningSnack = generateEveningSnack(dayIndex, snacks, fruits, calorieReduction, allergies, region);
    const dinner = generateDinner(dayIndex, proteinsByDay, vegetables, calorieReduction, proteinFocus, allergies, region);
    
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
