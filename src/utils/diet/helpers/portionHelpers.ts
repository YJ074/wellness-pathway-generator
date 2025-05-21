
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
  getKeralaDishPortion,
  getTamilNaduDishPortion,
  getNorthEastDishPortion,
  getRajasthanDishPortion,
  getPunjabDishPortion
} from './portionTypes/mealComposition';

export {
  getNonVegDishPortion,
  balanceNonVegMeal,
  getHealthyNonVegCookingMethod
} from './portionTypes/nonVegPortions';

// Export Indian measurement helpers
export {
  getIndianMeasure,
  getIndianSizeDescription,
  addIndianMeasureDescriptions
} from './portionTypes/indianMeasures';
