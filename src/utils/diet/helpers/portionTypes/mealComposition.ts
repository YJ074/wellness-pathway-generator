
/**
 * Helper functions for meal composition and portion sizing,
 * including regional-specific recommendations.
 */

// Re-export from basic meal composition helpers
export { 
  getPortionSize, 
  composeDinnerMeal, 
  createMealItem 
} from './mealCompositionHelpers';

// Re-export from regional portion helpers
export { 
  getMadhyaPradeshDishPortion,
  getMaharashtraDishPortion,
  getKeralaDishPortion,
  getTamilNaduDishPortion,
  getNorthEastDishPortion,
  getRajasthanDishPortion,
  getPunjabDishPortion,
  composeRegionalMeal
} from './regionalPortions';
