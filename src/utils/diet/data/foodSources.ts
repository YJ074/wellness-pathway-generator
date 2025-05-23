
// This is the main export file that combines all food source utilities

// Re-export everything from new files
export { filterAllergies } from '../helpers/allergyHelpers';
export { limitSoyaInDietDays } from '../helpers/soyaLimiter';
export { getDryFruits } from './dryFruits';
export { getRegionalFoods } from './regionalFoods';

// Re-export all food sources from the new modular structure
export {
  getProteinSources,
  getGrainSources,
  getVegetableSources,
  getFruitSources,
  getSnackSources
} from './foodCategories';

// NOTE: This refactoring maintains all the exact same exports as the original file,
// but distributes the code into smaller, focused files for better maintainability.
