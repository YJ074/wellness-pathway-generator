
/**
 * Helper functions for protein portion handling and customization
 */

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
  } else if (protein === 'Soya Chunks' && !protein.includes('(')) {
    return 'Soya Chunks (High-Protein Nuggets)';
  } else if (protein === 'Tempeh' && !protein.includes('(')) {
    return 'Tempeh (Fermented Soybean Cake)';
  } else if (protein === 'Seitan' && !protein.includes('(')) {
    return 'Seitan (Wheat Protein)';
  }
  return protein;
};

// Helper for vegan protein alternatives
export const getVeganProteinAlternative = (nonVeganProtein: string): string => {
  const alternatives: Record<string, string> = {
    'Paneer': 'Tofu',
    'Curd': 'Coconut Yogurt',
    'Greek Yogurt': 'Soy Yogurt',
    'Buttermilk': 'Vegan Buttermilk (coconut milk with lemon)',
    'Milk': 'Soy Milk',
    'Cheese': 'Vegan Cheese',
    'Ghee': 'Olive Oil',
    'Yogurt': 'Almond Yogurt',
    'Egg': 'Tofu Scramble',
    'Chicken': 'Soya Chunks',
    'Meat': 'Seitan',
    'Fish': 'Jackfruit',
    'Mutton': 'Mushroom',
    'Prawns': 'King Oyster Mushrooms',
    'Khoya': 'Cashew Paste'
  };
  
  for (const [nonVegan, vegan] of Object.entries(alternatives)) {
    if (nonVeganProtein.toLowerCase().includes(nonVegan.toLowerCase())) {
      return vegan;
    }
  }
  
  return nonVeganProtein;
};

// Helper to get adequate protein portion for dietary preference
export const getProteinPortion = (
  dietaryPreference: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Base protein requirements in grams
  let baseProteinPortion = isWeightLoss ? '15-20g' : '20-25g';
  
  if (isProteinFocus) {
    baseProteinPortion = '25-30g';
  }
  
  const proteinGuide: Record<string, string> = {
    'vegan': `${baseProteinPortion} (combine legumes with whole grains for complete protein)`,
    'lacto-vegetarian': baseProteinPortion,
    'lacto-ovo-vegetarian': baseProteinPortion,
    'pure-vegetarian': baseProteinPortion,
    'sattvic': baseProteinPortion,
    'pure-jain': `${baseProteinPortion} (focus on allowed lentils and nuts)`,
    'non-vegetarian': baseProteinPortion
  };
  
  return proteinGuide[dietaryPreference] || baseProteinPortion;
};
