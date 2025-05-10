
/**
 * Helper functions for standardizing food portions in meal planning
 */

// Helper function to determine if a fruit is a "big fruit" that should be measured in bowls
export const isBigFruit = (fruitName: string): boolean => {
  const bigFruits = [
    'watermelon', 'muskmelon', 'pineapple', 'papaya', 'jackfruit',
    'cantaloupe', 'honeydew', 'tarbuja', 'kharbooja', 'papita', 'kathal'
  ];
  
  return bigFruits.some(fruit => 
    fruitName.toLowerCase().includes(fruit.toLowerCase())
  );
};

// Helper to standardize fruit portion display
export const getStandardFruitPortion = (fruitName: string): string => {
  return isBigFruit(fruitName) ? "(1 bowl)" : "(1 nos)";
};

// Helper to format protein names with local equivalents
export const getLocalizedProteinName = (protein: string): string => {
  if (protein === 'Paneer' && !protein.includes('(')) {
    return 'Paneer (Indian Cottage Cheese)';
  } else if (protein === 'Tofu' && !protein.includes('(')) {
    return 'Tofu (Soya Paneer)';
  } else if (protein === 'Chana' && !protein.includes('(')) {
    return 'Chana (Chickpeas)';
  } else if (protein === 'Rajma' && !protein.includes('(')) {
    return 'Rajma (Kidney Beans)';
  }
  return protein;
};

// Helper for portion sizes based on dietary goals
export const getPortionSize = (
  isWeightLoss: boolean,
  isProteinFocus: boolean, 
  item: string,
  options: {
    standard: string,
    weightLoss?: string,
    proteinFocus?: string
  }
): string => {
  if (isWeightLoss && options.weightLoss) {
    return options.weightLoss;
  } else if (isProteinFocus && options.proteinFocus) {
    return options.proteinFocus;
  }
  return options.standard;
};
