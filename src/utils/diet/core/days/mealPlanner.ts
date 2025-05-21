
import {
  generateBreakfast,
  generateLunch,
  generateDinner,
  generateMidMorningSnack,
  generateEveningSnack
} from '../../generators';
import { addFoodToDailyMemory, applyTriplePassDeduplication } from '../../helpers/deduplication';
import { getMealTimings } from '../../helpers/mealTimingsHelper';

interface MealPlannerParams {
  dayNumber: number;
  dayIndex: number;
  proteinsByDay: string[];
  grains: string[];
  vegetables: string[];
  fruits: string[];
  snacks: string[];
  patterns: {
    breakfastPatterns: number[];
    lunchPatterns: number[];
    dinnerPatterns: number[];
    legumePatterns: number[];
  };
  dietaryPreference: string;
  calorieReduction: boolean;
  proteinFocus: boolean;
  allergies?: string;
  region?: string;
  gender?: string;
}

export function generateDayMeals(params: MealPlannerParams) {
  const {
    dayNumber,
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
  } = params;
  
  const i = dayNumber;
  
  // Get meal timings for this day
  const mealTimings = getMealTimings(dayIndex);
  
  // Apply varied patterns to ensure food diversity
  let breakfast = generateBreakfast(
    dayIndex + patterns.breakfastPatterns[i-1], 
    dietaryPreference, 
    calorieReduction, 
    allergies, 
    region, 
    gender
  );
  
  // Process breakfast through normalization to remove any internal duplicates
  breakfast = applyTriplePassDeduplication(breakfast);
  
  // Add breakfast foods to daily memory to prevent repetition in other meals
  addFoodToDailyMemory(dayIndex, breakfast);
  
  // Generate and deduplicate mid-morning snack
  const midMorningSnack = generateMidMorningSnack(
    dayIndex + ((i * 3) % 17), 
    snacks, 
    fruits, 
    calorieReduction, 
    allergies, 
    gender
  );
  const cleanMidMorningSnack = applyTriplePassDeduplication(midMorningSnack);
  addFoodToDailyMemory(dayIndex, cleanMidMorningSnack);

  // Use the entire protein array for lunch/dinner to enable protein pairing for complete amino acids
  // Apply varied patterns to avoid repetition
  let lunch = generateLunch(
    dayIndex + patterns.lunchPatterns[i-1] + patterns.legumePatterns[i-1], 
    proteinsByDay, 
    grains, 
    vegetables, 
    calorieReduction, 
    proteinFocus, 
    allergies, 
    region,
    dietaryPreference,
    gender
  );
  lunch = applyTriplePassDeduplication(lunch);
  addFoodToDailyMemory(dayIndex, lunch);
  
  // Generate and deduplicate evening snack
  const eveningSnack = generateEveningSnack(
    dayIndex + ((i * 5) % 19), 
    snacks, 
    fruits, 
    calorieReduction, 
    allergies, 
    region, 
    gender
  );
  const cleanEveningSnack = applyTriplePassDeduplication(eveningSnack);
  addFoodToDailyMemory(dayIndex, cleanEveningSnack);
  
  // Generate and deduplicate dinner - use a different legume pattern to ensure variety
  // Add extra offset to avoid same-day repetition
  let dinner = generateDinner(
    dayIndex + patterns.dinnerPatterns[i-1] + patterns.legumePatterns[(i+30) % 75], 
    proteinsByDay, 
    vegetables, 
    calorieReduction, 
    proteinFocus, 
    allergies, 
    region,
    dietaryPreference,
    gender
  );
  dinner = applyTriplePassDeduplication(dinner);
  
  return {
    breakfast,
    midMorningSnack: cleanMidMorningSnack,
    lunch,
    eveningSnack: cleanEveningSnack,
    dinner,
    mealTimings
  };
}
