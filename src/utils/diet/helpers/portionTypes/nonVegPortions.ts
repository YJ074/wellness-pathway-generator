
/**
 * Helper functions for non-vegetarian portion handling and customization
 */

// Helper to get non-vegetarian dish portion size based on dietary goals
export const getNonVegDishPortion = (
  nonVegType: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Define portion sizes for different types of non-vegetarian foods
  const portionSizes: Record<string, Record<string, string>> = {
    'chicken': {
      standard: '100g (palm-sized piece)',
      weightLoss: '80g with extra vegetables',
      proteinFocus: '120g lean cut'
    },
    'fish': {
      standard: '100g fillet',
      weightLoss: '90g with herbs',
      proteinFocus: '120g protein-rich preparation'
    },
    'egg': {
      standard: '2 whole eggs',
      weightLoss: '1 whole egg + 2 egg whites',
      proteinFocus: '1 whole egg + 3 egg whites'
    },
    'mutton': {
      standard: '80g lean cut',
      weightLoss: '60g with more vegetables',
      proteinFocus: '100g lean portion'
    },
    'prawn': {
      standard: '80-100g',
      weightLoss: '70g with greens',
      proteinFocus: '120g protein-rich preparation'
    }
  };

  // Get the appropriate portion based on dietary goal
  if (isWeightLoss) {
    return portionSizes[nonVegType]?.weightLoss || '80g with extra vegetables';
  } else if (isProteinFocus) {
    return portionSizes[nonVegType]?.proteinFocus || '120g lean cut';
  } else {
    return portionSizes[nonVegType]?.standard || '100g standard portion';
  }
};

// Helper for balancing non-vegetarian meals with plant foods
export const balanceNonVegMeal = (
  nonVegDescription: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  let balancedMeal = nonVegDescription;
  
  // Add appropriate plant-based components based on dietary goals
  if (isWeightLoss) {
    if (!balancedMeal.toLowerCase().includes('vegetable')) {
      balancedMeal += ' with 2 cups of steamed vegetables';
    }
    if (!balancedMeal.toLowerCase().includes('grain')) {
      balancedMeal += ' and ½ serving of whole grains';
    }
  } else if (isProteinFocus) {
    if (!balancedMeal.toLowerCase().includes('vegetable')) {
      balancedMeal += ' with 1.5 cups of fibrous vegetables';
    }
    if (!balancedMeal.toLowerCase().includes('grain')) {
      balancedMeal += ' and moderate whole grains';
    }
  } else {
    if (!balancedMeal.toLowerCase().includes('vegetable')) {
      balancedMeal += ' with mixed vegetables';
    }
    if (!balancedMeal.toLowerCase().includes('grain')) {
      balancedMeal += ' and whole grain side';
    }
  }
  
  return balancedMeal;
};

// Helper for suggesting cooking methods based on health goals
export const getHealthyNonVegCookingMethod = (
  nonVegType: string,
  isWeightLoss: boolean
): string => {
  const cookingMethods: Record<string, Record<string, string[]>> = {
    'chicken': {
      weightLoss: ['grilling', 'steaming', 'boiling', 'baking'],
      standard: ['baking', 'shallow frying', 'grilling', 'stir-frying']
    },
    'fish': {
      weightLoss: ['steaming', 'poaching', 'grilling', 'baking in foil'],
      standard: ['baking', 'grilling', 'steaming', 'light pan-frying']
    },
    'egg': {
      weightLoss: ['boiling', 'poaching', 'scrambling with minimal oil'],
      standard: ['boiling', 'poaching', 'scrambling', 'baking']
    },
    'mutton': {
      weightLoss: ['slow cooking', 'pressure cooking', 'grilling', 'roasting'],
      standard: ['roasting', 'grilling', 'slow cooking', 'broiling']
    },
    'prawn': {
      weightLoss: ['steaming', 'grilling', 'boiling', 'baking'],
      standard: ['stir-frying', 'grilling', 'steaming', 'baking']
    }
  };
  
  const methodList = isWeightLoss 
    ? cookingMethods[nonVegType]?.weightLoss || cookingMethods['chicken'].weightLoss 
    : cookingMethods[nonVegType]?.standard || cookingMethods['chicken'].standard;
  
  // Return random cooking method from appropriate list
  return methodList[Math.floor(Math.random() * methodList.length)];
};
