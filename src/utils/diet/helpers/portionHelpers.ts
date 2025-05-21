

/**
 * Main export file for portion helpers
 * Re-exports all portion helper functions from their specialized modules
 */

// Re-export all portion helper functions
export { 
  isBigFruit,
  isKatoriFruit, 
  getStandardFruitPortion
} from './portionTypes/fruitPortions';

export { 
  getLocalizedProteinName,
  getVeganProteinAlternative,
  getProteinPortion,
  getProteinPerKgRequirement,
  calculateDailyProteinRequirement
} from './portionTypes/proteinPortions';

export {
  getLocalizedGrainName,
  getBreadPortionSize
} from './portionTypes/grainPortions';

export {
  getDailyNutsMixture
} from './portionTypes/nutPortions';

export {
  getPortionSize,
  composeRegionalMeal,
  composeDinnerMeal,
  createMealItem,
  getMadhyaPradeshDishPortion,
  getMaharashtraDishPortion,
  getKeralaDishPortion
} from './portionTypes/mealComposition';

