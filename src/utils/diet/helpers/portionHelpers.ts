
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

// Helper to get bread portion size (rotis/chapatis/phulkas use numbers, not containers)
export const getBreadPortionSize = (
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  if (isWeightLoss) {
    return "1";  // 1 roti for weight loss
  } else if (isProteinFocus) {
    return "2";  // 2 rotis for protein focus
  }
  return "2";    // 2 rotis standard
};

// Helper for creating standardized meal items with portion sizes
export const createMealItem = (
  itemName: string,
  portionInfo: string
): string => {
  return `${itemName} (${portionInfo})`;
};

// Helper to format grain names with local equivalents
export const getLocalizedGrainName = (grain: string): string => {
  if (grain.includes('Rice Flakes') && !grain.includes('(')) {
    return 'Poha (Rice Flakes)';
  } else if (grain.includes('Broken Wheat') && !grain.includes('(')) {
    return 'Daliya (Broken Wheat Porridge)';
  } else if (grain.includes('Millet') && !grain.includes('(')) {
    if (grain.includes('Foxtail')) {
      return 'Kangni Roti (Foxtail Millet Roti)';
    } else if (grain.includes('Pearl')) {
      return 'Bajra Roti (Pearl Millet Roti)';
    } else if (grain.includes('Finger')) {
      return 'Ragi Roti (Finger Millet Roti)';
    } else if (grain.includes('Little')) {
      return 'Kutki Roti (Little Millet Roti)';
    } else if (grain.includes('Barnyard')) {
      return 'Samvat Khichdi (Barnyard Millet Khichdi)';
    } else if (grain.includes('Kodo')) {
      return 'Kodra Roti (Kodo Millet Roti)';
    } else if (grain.includes('Proso')) {
      return 'Barri Upma (Proso Millet Upma)';
    }
  }
  return grain;
};

// Helper for composing meals based on regional preferences
export const composeRegionalMeal = (
  regionalDish: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  if (isWeightLoss) {
    return `${regionalDish} (lighter portion for evening)`;
  } else if (isProteinFocus) {
    return `${regionalDish} with extra protein`;
  }
  return regionalDish;
};

// Helper to create a standardized dinner meal with curry, vegetables, and carbs
export const composeDinnerMeal = (
  protein: string,
  veggie1: string,
  veggie2: string,
  curryPortion: string,
  veggiePortion: string,
  rotiCount: string,
  ricePortion: string
): string => {
  return `${protein} curry (${curryPortion}), ${veggie1} and ${veggie2} sabzi (${veggiePortion}), Roti (${rotiCount}), or Bhura Chaval (${ricePortion} Brown Rice)`;
};

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
