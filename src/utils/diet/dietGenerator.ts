
// This file serves as the main entry point for diet generation functionality
// It re-exports all diet-related functions from their specialized modules

// Re-export the core diet plan generator
import { generateDietPlan, calculateBMI, getBMICategory, calculateBMR, calculateDailyCalories } from './core/planGenerator';

// Re-export meal generators for backward compatibility
import {
  generateBreakfast,
  generateMidMorningSnack,
  generateLunch,
  generateEveningSnack,
  generateDinner
} from './core/mealGenerators';

// Re-export everything for backward compatibility
export {
  generateDietPlan,
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateDailyCalories,
  generateBreakfast,
  generateMidMorningSnack,
  generateLunch,
  generateEveningSnack,
  generateDinner
};
