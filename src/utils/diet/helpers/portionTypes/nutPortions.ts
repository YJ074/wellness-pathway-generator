
/**
 * Helper functions for nuts and dry fruits portions
 */

// Get daily nuts mixture - ensure nuts are included every day
export const getDailyNutsMixture = (dayIndex: number): string => {
  const nutOptions = [
    'almonds (1 handful) and walnuts (2 nos)',
    'peanuts (1 handful) and flax seeds (1 tsp)',
    'mixed nuts (1 handful) and pumpkin seeds (1 tsp)',
    'almonds (1 handful) and sunflower seeds (1 tsp)',
    'cashews (1 handful) and chia seeds (1 tsp)',
    'peanuts (1 handful) and sesame seeds (1 tsp)',
    'almonds (1 handful) and pistachios (1 handful)'
  ];
  
  return nutOptions[dayIndex % nutOptions.length];
};
