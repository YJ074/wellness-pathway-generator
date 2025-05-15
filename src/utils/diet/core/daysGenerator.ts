
import { DietaryPreference, WellnessGoal } from '../types';
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
  generatePCOSFriendlyNotes,
  generateHerbalRecommendations
} from '../wellness/wellnessRecommendations';
import { generateRegionalNote } from '../regional/regionalRecommendations';
import { getMealTimings, getCheatMealGuidance, getMealTimingTips } from '../helpers/mealTimingsHelper';
import { FormData } from '@/components/wellness/types';
import { resetDailyFoodMemory, addFoodToDailyMemory, normalizeMealForPDF } from '../helpers/deduplication';

export function generateDays(
  formData: FormData,
  bmi: number, 
  bmiCategory: string, 
  dailyCalories: number
) {
  const days = [];
  
  const dietaryPreference = formData.dietaryPreference as DietaryPreference;
  const proteinFocus = formData.fitnessGoal === 'muscle-gain';
  const calorieReduction = (formData.fitnessGoal === 'weight-loss' || 
                           (formData.wellnessGoals && formData.wellnessGoals.includes('fat-loss')) || 
                           (formData.wellnessGoals && formData.wellnessGoals.includes('inch-loss'))) && 
                           !formData.has_muscular_build;
  const { allergies, region, exerciseFrequency, gender } = formData;
  const wellnessGoals = formData.wellnessGoals as WellnessGoal[] || [];
  const weight = parseInt(formData.weight) || 70; // Convert string weight to number

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
    
    // Reset food memory for this day to track cross-meal duplicates
    resetDailyFoodMemory(dayIndex);
    
    // Get meal timings for this day
    const mealTimings = getMealTimings(dayIndex);
    
    // Check if this is a cheat meal day
    const cheatMealInfo = getCheatMealGuidance(i, formData.fitnessGoal || 'maintenance');
    
    // Get meal timing tips based on fitness goal
    const timingTips = getMealTimingTips(formData.fitnessGoal || 'maintenance');
    
    // Apply varied patterns to ensure food diversity
    let breakfast = generateBreakfast(dayIndex + breakfastPatterns[i-1], dietaryPreference, calorieReduction, allergies, region);
    
    // Process breakfast through normalization to remove any internal duplicates
    breakfast = normalizeMealForPDF(breakfast);
    
    // Add breakfast foods to daily memory to prevent repetition in other meals
    addFoodToDailyMemory(dayIndex, breakfast);
    
    // Generate and deduplicate mid-morning snack
    const midMorningSnack = generateMidMorningSnack(dayIndex + ((i * 3) % 17), snacks, fruits, calorieReduction, allergies);
    const cleanMidMorningSnack = normalizeMealForPDF(midMorningSnack);
    addFoodToDailyMemory(dayIndex, cleanMidMorningSnack);

    // Use the entire protein array for lunch/dinner to enable protein pairing for complete amino acids
    // Apply varied patterns to avoid repetition
    let lunch = generateLunch(dayIndex + lunchPatterns[i-1], proteinsByDay, grains, vegetables, calorieReduction, proteinFocus, allergies, region);
    lunch = normalizeMealForPDF(lunch);
    addFoodToDailyMemory(dayIndex, lunch);
    
    // Generate and deduplicate evening snack
    const eveningSnack = generateEveningSnack(dayIndex + ((i * 5) % 19), snacks, fruits, calorieReduction, allergies, region);
    const cleanEveningSnack = normalizeMealForPDF(eveningSnack);
    addFoodToDailyMemory(dayIndex, cleanEveningSnack);
    
    // Generate and deduplicate dinner
    let dinner = generateDinner(dayIndex + dinnerPatterns[i-1], proteinsByDay, vegetables, calorieReduction, proteinFocus, allergies, region);
    dinner = normalizeMealForPDF(dinner);
    
    // Calculate approximate calories for the day
    const totalCalories = Math.round(dailyCalories / 10) * 10;
    
    // Recommended water intake (in liters)
    // Adjusted based on gender and weight following scientific guidelines
    const waterIntake = gender === 'male' ? 
      Math.max(2.5, Math.round((weight * 0.033) * 10) / 10) : 
      Math.max(2.0, Math.round((weight * 0.03) * 10) / 10);
    
    // Generate wellness goal specific information
    const hairNutrients = wellnessGoals.includes('hair-fall-control' as WellnessGoal) ? 
      generateHairNutrients(`${breakfast} ${lunch} ${dinner}`) : undefined;
      
    const skinNutrients = wellnessGoals.includes('glowing-skin' as WellnessGoal) ? 
      generateSkinNutrients(`${breakfast} ${lunch} ${dinner}`) : undefined;
      
    const fatLossNotes = (wellnessGoals.includes('fat-loss' as WellnessGoal) || wellnessGoals.includes('inch-loss' as WellnessGoal)) ? 
      generateFatLossNotes(`${breakfast} ${lunch} ${dinner}`, totalCalories) : undefined;
    
    // Generate PCOS/PCOD friendly notes if that goal is selected
    const pcosFriendlyNotes = wellnessGoals.includes('pcos-pcod-friendly' as WellnessGoal) ?
      generatePCOSFriendlyNotes(`${breakfast} ${lunch} ${dinner}`) : undefined;
      
    const herbalRecommendations = generateHerbalRecommendations(dayIndex, wellnessGoals);
    
    // Generate regional note if applicable
    const regionalNote = region ? generateRegionalNote(region) : undefined;
    
    days.push({
      day: i,
      breakfast,
      midMorningSnack: cleanMidMorningSnack,
      lunch,
      eveningSnack: cleanEveningSnack,
      dinner,
      calories: totalCalories,
      water: waterIntake,
      bmi,
      bmiCategory,
      wellnessGoals,
      hairNutrients,
      skinNutrients,
      fatLossNotes,
      pcosFriendlyNotes,
      herbalRecommendations,
      regionalNote,
      mealTimings,
      cheatMealInfo,
      timingTips
    });
  }
  
  return days;
}
