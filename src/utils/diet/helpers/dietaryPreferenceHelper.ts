
/**
 * Helper functions for determining dietary preferences and restrictions
 */

// Check if a diet preference allows non-vegetarian food
export const allowsNonVegetarian = (dietaryPreference: string): boolean => {
  // Non-vegetarian diets that allow animal products
  const nonVegDiets = ['non-vegetarian'];
  
  return nonVegDiets.includes(dietaryPreference.toLowerCase());
};

// Check if a diet preference allows eggs
export const allowsEggs = (dietaryPreference: string): boolean => {
  // Vegetarian diets that allow eggs
  const eggDiets = ['non-vegetarian', 'lacto-ovo-vegetarian'];
  
  return eggDiets.includes(dietaryPreference.toLowerCase());
};

// Check if a diet preference allows fish
export const allowsFish = (dietaryPreference: string): boolean => {
  // Diets that allow fish
  const fishDiets = ['non-vegetarian', 'pescatarian'];
  
  return fishDiets.includes(dietaryPreference.toLowerCase());
};

// Check if a diet preference allows dairy
export const allowsDairy = (dietaryPreference: string): boolean => {
  // Diets that allow dairy
  const dairyDiets = [
    'non-vegetarian', 
    'lacto-vegetarian', 
    'lacto-ovo-vegetarian', 
    'pure-vegetarian',
    'sattvic'
  ];
  
  return dairyDiets.includes(dietaryPreference.toLowerCase());
};

// Get allowed non-vegetarian food types based on dietary preference
export const getAllowedNonVegTypes = (dietaryPreference: string): string[] => {
  const allowedTypes = [];
  
  if (allowsNonVegetarian(dietaryPreference)) {
    allowedTypes.push('chicken', 'mutton', 'prawn');
  }
  
  if (allowsFish(dietaryPreference)) {
    allowedTypes.push('fish');
  }
  
  if (allowsEggs(dietaryPreference)) {
    allowedTypes.push('egg');
  }
  
  return allowedTypes;
};
