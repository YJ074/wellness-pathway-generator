
/**
 * Options for non-vegetarian dishes by type
 */

// Define base non-vegetarian dishes by type
const nonVegDishes: Record<string, string[]> = {
  'chicken': [
    'Grilled Chicken with Spices',
    'Tandoori Chicken (No Oil)',
    'Chicken Curry (Low Oil)',
    'Steamed Chicken with Herbs',
    'Baked Chicken Cutlets',
    'Boiled Chicken with Bamboo Shoot',
    'Chicken with Minimal Spices',
    'Chicken Stew with Vegetables'
  ],
  'fish': [
    'Fish Curry with Mustard & Herbs',
    'Grilled Fish with Local Herbs',
    'Steamed Fish with Lemon',
    'Fish Stew with Mountain Herbs',
    'Pan-Seared Fish with Spices',
    'Baked Fish with Minimal Oil',
    'Fish Cooked in Banana Leaf',
    'Poached Fish with Herbs'
  ],
  'egg': [
    'Boiled Egg Curry',
    'Egg Bhurji with Green Chilli',
    'Steamed Eggs with Vegetables',
    'Poached Eggs on Greens',
    'Egg White Scramble',
    'Egg Masala with Whole Wheat Roti',
    'Egg Curry with Mustard',
    'Boiled Egg with Greens'
  ],
  'mutton': [
    'Lean Mutton Stew',
    'Mutton Curry (Lean Cut, Low Oil)',
    'Grilled Lamb Chops',
    'Mutton with Vegetables',
    'Slow-Cooked Mutton with Herbs',
    'Mutton Soup with Carrots',
    'Baked Mutton with Minimal Oil',
    'Mutton with Local Spices'
  ],
  'prawn': [
    'Coconut Spiced Prawn Masala',
    'Grilled Prawns with Spices',
    'Steamed Prawns with Herbs',
    'Prawn Stew with Vegetables',
    'Low-Oil Prawn Curry',
    'Prawn with Lemon and Garlic',
    'Prawn Soup with Greens',
    'Baked Prawns with Minimal Oil'
  ]
};

/**
 * Get non-vegetarian dish options by type
 * @param nonVegType - Type of non-vegetarian food
 * @returns Array of dish options
 */
export const getNonVegDishOptions = (nonVegType: string): string[] => {
  return nonVegDishes[nonVegType] || nonVegDishes['chicken'];
};

/**
 * Get all available non-vegetarian dish types
 * @returns Array of dish types
 */
export const getNonVegTypes = (): string[] => {
  return Object.keys(nonVegDishes);
};
