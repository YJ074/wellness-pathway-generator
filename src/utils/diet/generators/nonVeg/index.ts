
/**
 * Main export file for non-vegetarian meal generators
 */

// Re-export the main generator function
export { generateNonVegDish } from './nonVegDishGenerator';

// Export specialized generators by type
export { generateNonVegByRegion } from './regional/nonVegRegionalGenerator';

