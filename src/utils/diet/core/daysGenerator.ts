
import { DietaryPreference } from '../types';
import { 
  getProteinSources, 
  getGrainSources, 
  getVegetableSources, 
  getFruitSources, 
  getSnackSources,
  limitSoyaInDietDays,
} from '../foodSources';
import {
  generateBreakfast,
  generateLunch,
  generateDinner,
  generateMidMorningSnack,
  generateEveningSnack
} from '../generators';
import { getProteinPortion } from '../helpers/portionHelpers';
import {
  generateHairNutrients,
  generateSkinNutrients,
  generateFatLossNotes,
  generateHerbalRecommendations
} from '../wellness/wellnessRecommendations';
import { generateRegionalNote } from '../regional/regionalRecommendations';
import { FormData } from '@/components/wellness/types';

export function generateDays(
  formData: FormData,
  bmi: number, 
  bmiCategory: string, 
  dailyCalories: number
) {
  const days = [];
  
  const dietaryPreference = formData.dietaryPreference;
  const proteinFocus = formData.fitnessGoal === 'muscle-gain';
  const calorieReduction = (formData.fitnessGoal === 'weight-loss' || 
                           formData.wellnessGoals.includes('fat-loss') || 
                           formData.wellnessGoals.includes('inch-loss')) && 
                           !formData.has_muscular_build;
  const { allergies, region, exerciseFrequency, gender, wellnessGoals, weight } = formData;

  // Optimize protein sources - get double the amount needed for variety
  const rawProteins = getProteinSources(dietaryPreference, allergies);
  
  // Calculate optimal protein intake using our enhanced science-based algorithm
  // Passing weight and exercise frequency for personalized protein calculations
  const proteinRequirement = getProteinPortion(
    dietaryPreference, 
    calorieReduction, 
    proteinFocus, 
    weight, 
    exerciseFrequency
  );
  
  // Distribute soya in limited amounts throughout the diet
  // This ensures we don't overuse soy products which can be problematic in excess
  const proteinsByDay = limitSoyaInDietDays(rawProteins, 75, 30);

  const grains = getGrainSources(dietaryPreference, allergies);
  const vegetables = getVegetableSources(dietaryPreference, allergies);
  const fruits = getFruitSources(dietaryPreference, allergies);
  const snacks = getSnackSources(dietaryPreference, calorieReduction, allergies);
  
  // Pre-generate patterns to avoid repetition
  // Using prime numbers to create non-repeating sequences across 75 days
  const breakfastPatterns = Array.from({ length: 75 }, (_, i) => (i * 7 + 3) % 15);
  const lunchPatterns = Array.from({ length: 75 }, (_, i) => (i * 11 + 5) % 15);
  const dinnerPatterns = Array.from({ length: 75 }, (_, i) => (i * 13 + 7) % 15);
  
  for (let i = 1; i <= 75; i++) {
    const dayIndex = (i - 1) % 15;
    
    // Apply varied patterns to ensure food diversity
    const breakfast = generateBreakfast(dayIndex + breakfastPatterns[i-1], dietaryPreference, calorieReduction, allergies, region);
    const midMorningSnack = generateMidMorningSnack(dayIndex + (i * 3) % 17, snacks, fruits, calorieReduction, allergies);

    // Use the entire protein array for lunch/dinner to enable protein pairing for complete amino acids
    // Apply varied patterns to avoid repetition
    const lunch = generateLunch(dayIndex + lunchPatterns[i-1], proteinsByDay, grains, vegetables, calorieReduction, proteinFocus, allergies, region);
    const eveningSnack = generateEveningSnack(dayIndex + (i * 5) % 19, snacks, fruits, calorieReduction, allergies, region);
    const dinner = generateDinner(dayIndex + dinnerPatterns[i-1], proteinsByDay, vegetables, calorieReduction, proteinFocus, allergies, region);
    
    // Calculate approximate calories for the day
    const totalCalories = Math.round(dailyCalories / 10) * 10;
    
    // Recommended water intake (in liters)
    // Adjusted based on gender and weight following scientific guidelines
    const waterIntake = gender === 'male' ? 
      Math.max(2.5, Math.round(weight * 0.033 * 10) / 10) : 
      Math.max(2.0, Math.round(weight * 0.03 * 10) / 10);
    
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
  
  return days;
}
