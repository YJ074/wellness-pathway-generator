
/**
 * Main export file for protein portion helpers
 * Re-exports all protein helper functions from their specialized modules
 */

// Re-export protein name localizer
export { getLocalizedProteinName } from './localizer';

// Re-export vegan alternatives
export { getVeganProteinAlternative } from './veganAlternatives';

// Re-export protein calculation functions
export { 
  getProteinPerKgRequirement,
  calculateDailyProteinRequirement,
  getProteinPortion
} from './calculator';
