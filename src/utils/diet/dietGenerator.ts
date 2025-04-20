
import { DietaryPreference, DietPlan } from './types';
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
  generateSnacks
} from './mealGenerators';

export const generateDietPlan = (
  dietaryPreference: DietaryPreference,
  fitnessGoal: string,
  age: number,
  weight: number
): DietPlan => {
  const days = [];
  const proteinFocus = fitnessGoal === 'muscle-gain';
  const calorieReduction = fitnessGoal === 'weight-loss';
  
  const proteins = getProteinSources(dietaryPreference);
  const grains = getGrainSources();
  const vegetables = getVegetableSources();
  const fruits = getFruitSources();
  const snacks = getSnackSources(dietaryPreference, calorieReduction);
  
  for (let i = 1; i <= 75; i++) {
    const dayIndex = (i - 1) % 15;
    
    const breakfast = generateBreakfast(dayIndex, dietaryPreference, calorieReduction);
    const lunch = generateLunch(dayIndex, proteins, grains, vegetables, calorieReduction, proteinFocus);
    const dinner = generateDinner(dayIndex, proteins, vegetables, calorieReduction, proteinFocus);
    const daySnacks = generateSnacks(dayIndex, snacks, fruits, calorieReduction);
    
    days.push({
      day: i,
      breakfast,
      lunch,
      dinner,
      snacks: daySnacks
    });
  }
  
  return { days };
};
