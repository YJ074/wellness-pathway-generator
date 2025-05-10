
/**
 * Helper functions to manage prebiotic and probiotic foods in the diet plan
 */

// List of common prebiotic food ingredients
export const prebioticFoods = [
  'Garlic',
  'Onions',
  'Leeks',
  'Asparagus',
  'Bananas',
  'Barley',
  'Oats',
  'Apples',
  'Flaxseeds',
  'Wheat Bran',
  'Chicory Root',
  'Dandelion Greens',
  'Jicama',
  'Whole Grains',
  'Legumes',
];

// List of common probiotic food ingredients
export const probioticFoods = [
  'Yogurt',
  'Curd (Dahi)',
  'Buttermilk (Chaas)',
  'Kefir',
  'Kombucha',
  'Pickles (naturally fermented)',
  'Kimchi',
  'Sauerkraut',
  'Idli',
  'Dosa',
  'Dhokla',
  'Lassi',
  'Kanji',
  'Paneer (fermented)',
  'Handvo',
];

/**
 * Ensures probiotic foods appear in a meal by enriching the description 
 */
export const enrichWithProbiotics = (
  mealDescription: string, 
  dayIndex: number, 
  ensure: boolean = false
): string => {
  // If the meal already contains probiotic foods, return as is
  if (probioticFoods.some(food => mealDescription.toLowerCase().includes(food.toLowerCase()))) {
    return mealDescription;
  }
  
  // If we don't need to ensure inclusion or it's not a day for adding them, return as is
  if (!ensure && dayIndex % 2 !== 0) {
    return mealDescription;
  }
  
  // Add a probiotic food based on the day
  const probioticToAdd = probioticFoods[dayIndex % probioticFoods.length];
  
  // If this is a breakfast, add it differently than lunch/dinner
  if (mealDescription.toLowerCase().includes('breakfast') || 
      mealDescription.toLowerCase().includes('idli') || 
      mealDescription.toLowerCase().includes('dosa') || 
      mealDescription.toLowerCase().includes('poha')) {
    return `${mealDescription}, with a side of ${probioticToAdd} (1/2 cup)`;
  } else {
    return `${mealDescription}, with a small bowl of ${probioticToAdd} (1/2 cup)`;
  }
};

/**
 * Ensures prebiotic foods appear in a meal by enriching the description
 */
export const enrichWithPrebiotics = (
  mealDescription: string, 
  dayIndex: number, 
  ensure: boolean = false
): string => {
  // If the meal already contains prebiotic foods, return as is
  if (prebioticFoods.some(food => mealDescription.toLowerCase().includes(food.toLowerCase()))) {
    return mealDescription;
  }
  
  // If we don't need to ensure inclusion or it's not a day for adding them, return as is
  if (!ensure && (dayIndex % 2 === 0)) {
    return mealDescription;
  }
  
  // Add a prebiotic food based on the day
  const prebioticToAdd = prebioticFoods[dayIndex % prebioticFoods.length];
  
  // Add in a way that fits with the meal type
  if (mealDescription.toLowerCase().includes('breakfast')) {
    if (prebioticToAdd === 'Bananas' || prebioticToAdd === 'Apples') {
      return `${mealDescription}, with sliced ${prebioticToAdd} (1/2)`;
    } else if (prebioticToAdd === 'Oats' || prebioticToAdd === 'Whole Grains' || prebioticToAdd === 'Barley') {
      return mealDescription.includes(prebioticToAdd) ? mealDescription : `${mealDescription}, sprinkled with ${prebioticToAdd} (1 tbsp)`;
    } else {
      return `${mealDescription} with ${prebioticToAdd} (small portion)`;
    }
  } else {
    // For lunch/dinner, incorporate prebiotics naturally
    if (['Garlic', 'Onions', 'Leeks'].includes(prebioticToAdd)) {
      return `${mealDescription}, prepared with ${prebioticToAdd} for gut health`;
    } else if (['Legumes', 'Whole Grains'].includes(prebioticToAdd)) {
      return `${mealDescription}, served with a side of ${prebioticToAdd} (1/4 cup)`;
    } else {
      return `${mealDescription}, with ${prebioticToAdd} (small portion)`;
    }
  }
};
