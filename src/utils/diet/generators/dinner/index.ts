
/**
 * Main export file for dinner generation functionality
 */

// Re-export the main generator function
export { generateDinner } from './dinnerGenerator';

// Export specialized generators
export { generateRegionalDinner } from './regionalDinner';
export { generateNonVegDinner } from './nonVegDinner';

