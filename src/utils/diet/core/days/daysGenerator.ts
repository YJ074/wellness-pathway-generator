
import { DietaryPreference, WellnessGoal } from '../../types';
import { 
  getProteinSources, 
  getGrainSources, 
  getVegetableSources, 
  getFruitSources, 
  getSnackSources,
  limitSoyaInDietDays,
} from '../../foodSources';
import { getProteinPortion } from '../../helpers/portionHelpers';
import { FormData } from '@/components/wellness/types';
import { generateDayMeals } from './mealPlanner';
import { generateDayWellnessInfo } from './wellnessInfoGenerator';
import { generatePatterns } from './patternGenerator';
import { resetDailyFoodMemory } from '../../helpers/deduplication';

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

  // Gender-specific adjustments
  const isMale = gender === 'male';
  
  // Optimize protein sources - get double the amount needed for variety
  const rawProteins = getProteinSources(dietaryPreference, allergies);
  
  // Calculate optimal protein intake using our enhanced science-based algorithm
  const proteinRequirement = getProteinPortion(
    dietaryPreference, 
    calorieReduction, 
    proteinFocus, 
    weight, 
    exerciseFrequency,
    gender
  );
  
  // Distribute soya in limited amounts throughout the diet
  const proteinsByDay = limitSoyaInDietDays(rawProteins, 75, 30);

  const grains = getGrainSources(dietaryPreference, allergies);
  const vegetables = getVegetableSources(dietaryPreference, allergies);
  const fruits = getFruitSources(dietaryPreference, allergies);
  const snacks = getSnackSources(dietaryPreference, calorieReduction, allergies);
  
  // Generate varied patterns for meal diversity
  const patterns = generatePatterns();
  
  for (let i = 1; i <= 75; i++) {
    const dayIndex = (i - 1) % 15;
    
    // Reset food memory for this day to track cross-meal duplicates
    resetDailyFoodMemory(dayIndex);
    
    // Generate all meals for this day
    const dayMeals = generateDayMeals({
      dayNumber: i,
      dayIndex,
      proteinsByDay,
      grains,
      vegetables,
      fruits,
      snacks,
      patterns,
      dietaryPreference,
      calorieReduction,
      proteinFocus,
      allergies,
      region,
      gender
    });
    
    // Generate wellness information for this day
    const wellnessInfo = generateDayWellnessInfo({
      dayIndex,
      meals: dayMeals,
      wellnessGoals,
      region,
      fitnessGoal: formData.fitnessGoal || 'maintenance',
      totalCalories: Math.round(dailyCalories / 10) * 10,
      weight,
      gender
    });
    
    days.push({
      day: i,
      ...dayMeals,
      ...wellnessInfo,
      bmi,
      bmiCategory,
      wellnessGoals,
      gender // Add gender to the diet day for PDF generation
    });
  }
  
  return days;
}
