
/**
 * Generates varied patterns for meal rotation to ensure food diversity
 */
export function generatePatterns() {
  // Using prime numbers to create non-repeating sequences across 75 days
  const breakfastPatterns = Array.from({ length: 75 }, (_, i) => (i * 7 + 3) % 15);
  const lunchPatterns = Array.from({ length: 75 }, (_, i) => (i * 11 + 5) % 15);
  const dinnerPatterns = Array.from({ length: 75 }, (_, i) => (i * 13 + 7) % 15);
  
  // More varied legume patterns to ensure better rotation
  const legumePatterns = Array.from({ length: 75 }, (_, i) => (i * 17 + 13) % 75);
  
  return {
    breakfastPatterns,
    lunchPatterns,
    dinnerPatterns,
    legumePatterns
  };
}
