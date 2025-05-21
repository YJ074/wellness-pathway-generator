
/**
 * Helper functions for non-vegetarian portion control based on ICMR/NIN guidelines
 */

// Get appropriate portion size for non-vegetarian dishes using Indian household measures
export const getNonVegDishPortion = (
  nonVegType: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Base portions by non-veg type using Indian household measures
  const basePortions: Record<string, string> = {
    'chicken': '80-100g (palm-sized piece)',
    'fish': '80-100g (medium-sized piece)',
    'egg': '1-2 eggs',
    'mutton': '80-100g (palm-sized portion)',
    'prawn': '80-100g (¾ katori)'
  };
  
  // Adjust portions based on dietary goals
  if (isWeightLoss) {
    return nonVegType === 'egg' ? '1 egg' : '80g (small palm-sized piece)';
  } else if (isProteinFocus) {
    return nonVegType === 'egg' ? '2-3 eggs' : '120g (large palm-sized piece)';
  }
  
  // Return standard portion
  return basePortions[nonVegType] || '90g (palm-sized piece)';
};

// Create a balanced meal with appropriate sides
export const balanceNonVegMeal = (
  mainDish: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Following ICMR/NIN guidelines with proper macro distribution
  // ~50-60% carbs, 15-20% protein, 20-30% healthy fats
  
  let balancedMeal = mainDish;
  
  // Add appropriate carbohydrate portion - emphasizing whole grains (50-60% of total calories)
  if (isWeightLoss) {
    // For weight loss: Smaller portion of complex carbs, more fiber
    balancedMeal += ' with ½ katori brown rice OR 1 multigrain roti (palm-sized)';
  } else if (isProteinFocus) {
    // For protein focus: Moderate complex carbs with extra protein
    balancedMeal += ' with ½ katori brown rice OR 1 multigrain roti (palm-sized)';
  } else {
    // For maintenance: Balanced complex carbs
    balancedMeal += ' with ¾ katori brown rice OR 2 multigrain rotis (palm-sized)';
  }
  
  // Add vegetables (fiber, micronutrients) - essential for all diets
  balancedMeal += ' and 1 katori seasonal vegetable sabzi';
  
  // Add healthy fat component (20-30% of total calories)
  if (!isWeightLoss) {
    balancedMeal += ' with 1 chamach ghee/olive oil';
  }
  
  // Add a note about the macro distribution
  let calorieEstimate = isWeightLoss ? '400-500 kcal' : 
                       isProteinFocus ? '550-650 kcal' : '500-600 kcal';
  
  balancedMeal += ` (~${calorieEstimate}, balanced meal with ~50-60% complex carbs, 20-25% protein, and 20-25% healthy fats)`;
  
  return balancedMeal;
};

// Get healthy Indian cooking methods for non-vegetarian dishes
export const getHealthyNonVegCookingMethod = (
  nonVegType: string,
  isWeightLoss: boolean
): string => {
  // Traditional Indian cooking methods prioritizing health
  const healthyCookingMethods: Record<string, string[]> = {
    'chicken': ['Tandoori', 'Grilled', 'Baked', 'Roasted', 'Steamed'],
    'fish': ['Steamed', 'Pan-seared', 'Baked', 'Grilled', 'Poached'],
    'egg': ['Boiled', 'Poached', 'Steamed', 'Bhurji (low oil)'],
    'mutton': ['Slow-cooked', 'Baked', 'Grilled', 'Roasted'],
    'prawn': ['Steamed', 'Pan-seared', 'Grilled', 'Poached']
  };
  
  // Get available methods for this non-veg type
  const methods = healthyCookingMethods[nonVegType] || ['Steamed', 'Grilled', 'Roasted'];
  
  // For weight loss, prioritize lowest-fat cooking methods
  if (isWeightLoss) {
    const lowFatMethods = ['Steamed', 'Boiled', 'Poached', 'Grilled (no oil)'];
    
    // Find a low-fat method that's available for this non-veg type
    for (const method of lowFatMethods) {
      if (methods.includes(method)) {
        return method;
      }
    }
    
    // Fallback to first method
    return methods[0];
  }
  
  // Use varied cooking methods based on day
  return methods[Math.floor(Math.random() * methods.length)];
};
