
import { getRegionalFoods } from '../data/regionalFoods';
import { filterAllergies } from '../helpers/allergyHelpers';
import { getHealthBenefit } from '../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems, hasFoodBeenUsedToday } from '../helpers/deduplication';
import { getNonVegDishPortion } from '../helpers/portionHelpers';

/**
 * Generate a non-vegetarian dish based on region and diet preferences
 * @param dayIndex - Current day index (0-based)
 * @param isWeightLoss - Whether the diet is for weight loss
 * @param nonVegType - Type of non-vegetarian food ('chicken', 'fish', 'egg', 'mutton', etc.)
 * @param allergies - Comma-separated allergies to avoid
 * @param region - Regional preference
 * @returns Formatted non-vegetarian dish description
 */
export const generateNonVegDish = (
  dayIndex: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  nonVegType?: string,
  allergies?: string,
  region?: string
): string => {
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

  // Check for regional specialties
  if (region) {
    const regionalFoods = getRegionalFoods(region);
    const regionalNonVegDishes = getRegionalNonVegDishes(region);
    
    // Use regional dish every 4th day if available
    if (regionalNonVegDishes.length > 0 && dayIndex % 4 === 0) {
      const regionalIndex = (dayIndex * 7 + 3) % regionalNonVegDishes.length;
      const regionalDish = regionalNonVegDishes[regionalIndex];
      
      // Apply portion control based on diet goals
      let dish = regionalDish;
      
      if (isWeightLoss) {
        dish += ' (smaller portion with extra vegetables)';
      } else if (isProteinFocus) {
        dish += ' (protein-rich portion with minimal carbs)';
      }
      
      // Apply deduplication
      dish = removeDuplicateFoodItems(dish);
      
      // Add health benefit
      const healthBenefit = getHealthBenefit(dish);
      dish += ` - (${healthBenefit})`;
      
      return dish;
    }
  }
  
  // Fallback to generic non-veg dishes if no regional dish is selected
  // If no specific non-veg type is provided, select randomly
  const availableTypes = Object.keys(nonVegDishes);
  const selectedType = nonVegType || availableTypes[(dayIndex + 1) % availableTypes.length];
  
  // Select a dish based on the day index to ensure variety
  const dishOptions = nonVegDishes[selectedType] || nonVegDishes['chicken'];
  const selectedDishIndex = (dayIndex * 13 + 7) % dishOptions.length;
  let dish = dishOptions[selectedDishIndex];
  
  // Get appropriate portion recommendation
  const portionInfo = getNonVegDishPortion(selectedType, isWeightLoss, isProteinFocus);
  
  // Format the dish with portion information
  dish = `${dish} (${portionInfo})`;
  
  // Add appropriate sides based on dietary goals
  if (isWeightLoss) {
    dish += ' with steamed vegetables and minimal rice';
  } else if (isProteinFocus) {
    dish += ' with extra lean protein and moderate carbs';
  } else {
    dish += ' with balanced sides';
  }
  
  // Apply deduplication
  dish = removeDuplicateFoodItems(dish);
  
  // Filter for allergies if specified
  if (allergies) {
    dish = filterAllergies([dish], allergies)[0] || "";
  }
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(dish);
  dish += ` - (${healthBenefit})`;
  
  return dish;
};

/**
 * Get region-specific non-vegetarian dishes
 * @param region - Region code
 * @returns Array of regional non-vegetarian dishes
 */
function getRegionalNonVegDishes(region: string): string[] {
  // Convert region to lowercase for case-insensitive matching
  const regionLower = region.toLowerCase();
  
  // Regional non-vegetarian specialties
  const regionalDishes: Record<string, string[]> = {
    'andhra': [
      'Kodi Kura (Chicken Curry with Minimal Oil)',
      'Fish Pulusu (Tangy Tamarind Fish Stew)',
      'Grilled Prawns with Spices',
      'Boiled Egg Curry',
      'Pan-Seared Fish with Local Spices'
    ],
    'arunachal': [
      'Boiled Chicken with Bamboo Shoot',
      'Fish Stew with Mountain Herbs',
      'Smoked Pork with Greens (Lean Cut)',
      'Boiled Egg Curry',
      'Grilled Chicken with Spices'
    ],
    'assam': [
      'Masor Tenga (Sour Fish Curry)',
      'Duck Curry with Ash Gourd (Low Oil)',
      'Chicken with Khar (Alkaline Banana Ash)',
      'Boiled Egg Curry',
      'Baked Chicken Cutlets'
    ],
    'bihar': [
      'Champaran Chicken (Low Oil)',
      'Fish Curry with Mustard Paste',
      'Boiled Egg Curry with Greens',
      'Lean Mutton Stew',
      'Grilled Chicken with Spices'
    ],
    'chhattisgarh': [
      'Chicken Bharta (Mashed Chicken)',
      'Grilled Fish with Local Herbs',
      'Boiled Egg Tikkis',
      'Lean Mutton Stew',
      'Pan-Seared Fish with Local Spices'
    ],
    'goa': [
      'Goan Fish Curry (Low Coconut Milk)',
      'Prawn Balchao (No Oil)',
      'Grilled Chicken Cafreal',
      'Boiled Egg Curry',
      'Pan-Seared Fish with Local Spices'
    ],
    'gujarat': [
      'Egg Bhurji with Methi',
      'Low-Oil Chicken Curry with Bhakri',
      'Grilled Pomfret with Spices',
      'Fish Curry with Mustard & Herbs',
      'Baked Chicken Cutlets'
    ],
    'haryana': [
      'Low-Oil Chicken Curry',
      'Fish Fry with Bajra Roti (Air-Fried)',
      'Egg Curry with Mustard',
      'Lean Mutton Stew',
      'Coconut Spiced Prawn Masala'
    ],
    'himachal': [
      'Chha Gosht (Lamb in Yogurt Curry - Lean Cut)',
      'Trout Fish Grilled',
      'Chicken Palda (Curd Curry)',
      'Boiled Egg Curry',
      'Baked Chicken Cutlets'
    ],
    'jharkhand': [
      'Chicken Saag',
      'Fish Curry with Mustard Greens',
      'Egg Dishes with Rice Flour Rotis',
      'Lean Mutton Stew',
      'Baked Chicken Cutlets'
    ],
    'karnataka': [
      'Chicken Saaru (Light Broth)',
      'Fish Tawa Fry (Low Oil)',
      'Egg Masala with Ragi Roti',
      'Lean Mutton Stew',
      'Baked Chicken Cutlets'
    ],
    'kerala': [
      'Meen Moilee (Light Coconut Fish Curry)',
      'Pepper Chicken (Minimal Oil)',
      'Egg Roast with Steamed Idiyappam',
      'Lean Mutton Stew',
      'Coconut Spiced Prawn Masala'
    ],
    'madhyapradesh': [
      'Chicken Curry with Bajra Roti',
      'Fish Fry (Air-Fried)',
      'Egg Bhurji with Green Chilli',
      'Lean Mutton Stew',
      'Baked Chicken Cutlets'
    ],
    'maharashtra': [
      'Kombdi Vade (Grilled Chicken Version)',
      'Fish Curry with Kokum',
      'Boiled Egg Masala',
      'Lean Mutton Stew',
      'Coconut Spiced Prawn Masala'
    ],
    'manipur': [
      'Nga Thongba (Fish Curry)',
      'Smoked Chicken with Herbs',
      'Boiled Pork with Veggies',
      'Boiled Egg Curry',
      'Pan-Seared Fish with Local Spices'
    ],
    'meghalaya': [
      'Jadoh with Chicken (Low Oil)',
      'Fish Cooked in Banana Leaf',
      'Eggs with Rice and Veg',
      'Lean Mutton Stew',
      'Coconut Spiced Prawn Masala'
    ],
    'mizoram': [
      'Arsa Buhchiar (Rice with Boiled Chicken)',
      'Steamed Fish with Mustard',
      'Pork with Mustard Greens (Lean)',
      'Boiled Egg Curry',
      'Baked Chicken Cutlets'
    ],
    'nagaland': [
      'Smoked Pork with Bamboo Shoot (Low Fat)',
      'Dry Fish Curry',
      'Boiled Chicken with Herbs',
      'Lean Mutton Stew',
      'Baked Chicken Cutlets'
    ],
    'odisha': [
      'Machha Besara (Fish in Mustard Curry)',
      'Mutton Curry (Lean Cut, Low Oil)',
      'Egg Tadka with Dal',
      'Grilled Chicken with Spices',
      'Pan-Seared Fish with Local Spices'
    ],
    'punjab': [
      'Tandoori Chicken (No Oil)',
      'Fish Amritsari (Baked)',
      'Egg Curry with Whole Wheat Roti',
      'Lean Mutton Stew',
      'Grilled Chicken with Spices'
    ],
    'rajasthan': [
      'Lal Maas (Lean, Low Oil)',
      'Khad Khargosh (Baked Rabbit or Chicken)',
      'Egg Bhurji with Bajra Roti',
      'Lean Mutton Stew',
      'Fish Curry with Mustard & Herbs'
    ],
    'sikkim': [
      'Chicken Momos (Steamed)',
      'Fish Stew with Herbs',
      'Boiled Egg with Red Rice',
      'Lean Mutton Stew',
      'Baked Chicken Cutlets'
    ],
    'tamilnadu': [
      'Chettinad Chicken (Low Oil)',
      'Fish Kuzhambu with Brown Rice',
      'Egg Kurma with Ragi Dosa',
      'Lean Mutton Stew',
      'Coconut Spiced Prawn Masala'
    ],
    'telangana': [
      'Kodi Vepudu (Dry Chicken Fry - Low Oil)',
      'Fish Pulusu',
      'Egg Masala with Jowar Roti',
      'Lean Mutton Stew',
      'Baked Chicken Cutlets'
    ],
    'tripura': [
      'Berma with Vegetables (No Fish Variant)',
      'Chicken Curry with Bamboo Shoot',
      'Steamed Fish Balls',
      'Boiled Egg Curry',
      'Coconut Spiced Prawn Masala'
    ],
    'uttarpradesh': [
      'Tandoori Chicken (Lean Cut)',
      'Egg Curry with Paratha (Low Oil)',
      'Fish Curry with Mustard',
      'Lean Mutton Stew',
      'Baked Chicken Cutlets'
    ],
    'uttarakhand': [
      'Chicken Chainsoo',
      'Fish Stew with Mandua Roti',
      'Egg Curry with Rice',
      'Lean Mutton Stew',
      'Baked Chicken Cutlets'
    ],
    'westbengal': [
      'Shorshe Ilish (Hilsa in Mustard - Low Oil)',
      'Chicken Dak Bungalow',
      'Dim\'er Dalna (Egg Curry)',
      'Lean Mutton Stew',
      'Coconut Spiced Prawn Masala'
    ],
    'north': [
      'Tandoori Chicken (No Oil)',
      'Fish Amritsari (Baked)',
      'Egg Curry with Whole Wheat Roti',
      'Lean Mutton Stew',
      'Grilled Chicken with Spices'
    ],
    'south': [
      'Meen Moilee (Light Coconut Fish Curry)',
      'Chettinad Chicken (Low Oil)',
      'Egg Roast with Steamed Idiyappam',
      'Coconut Spiced Prawn Masala',
      'Fish Curry with Mustard & Herbs'
    ],
    'east': [
      'Shorshe Ilish (Hilsa in Mustard - Low Oil)',
      'Machha Besara (Fish in Mustard Curry)',
      'Chicken Dak Bungalow',
      'Dim\'er Dalna (Egg Curry)',
      'Lean Mutton Stew'
    ],
    'west': [
      'Kombdi Vade (Grilled Chicken Version)',
      'Goan Fish Curry (Low Coconut Milk)',
      'Fish Curry with Kokum',
      'Prawn Balchao (No Oil)',
      'Egg Bhurji with Methi'
    ],
    'central': [
      'Chicken Curry with Bajra Roti',
      'Fish Fry (Air-Fried)',
      'Chicken Bharta (Mashed Chicken)',
      'Egg Bhurji with Green Chilli',
      'Lean Mutton Stew'
    ],
    'northeast': [
      'Masor Tenga (Sour Fish Curry)',
      'Nga Thongba (Fish Curry)',
      'Smoked Chicken with Herbs',
      'Boiled Chicken with Bamboo Shoot',
      'Fish Stew with Mountain Herbs'
    ]
  };

  // Handle specific regions
  if (regionLower === 'tamilnadu') {
    return regionalDishes['tamilnadu'] || [];
  }
  if (regionLower === 'westbengal') {
    return regionalDishes['westbengal'] || [];
  }
  if (regionLower === 'uttarpradesh') {
    return regionalDishes['uttarpradesh'] || [];
  }
  if (regionLower === 'madhyapradesh') {
    return regionalDishes['madhyapradesh'] || [];
  }
  
  // Direct match
  if (regionalDishes[regionLower]) {
    return regionalDishes[regionLower];
  }
  
  // Map broader regions
  const stateToRegionMap: Record<string, string> = {
    // North
    'punjab': 'north',
    'haryana': 'north',
    'himachalpradesh': 'north',
    'himachal': 'north',
    'uttarakhand': 'north',
    'delhi': 'north',
    'jammuandkashmir': 'north',
    
    // South
    'kerala': 'south',
    'tamilnadu': 'south',
    'karnataka': 'south',
    'andhrapradesh': 'south',
    'andhra': 'south',
    'telangana': 'south',
    
    // East
    'westbengal': 'east',
    'odisha': 'east',
    'bihar': 'east',
    'jharkhand': 'east',
    
    // West
    'maharashtra': 'west',
    'gujarat': 'west',
    'goa': 'west',
    'rajasthan': 'west',
    
    // Central
    'madhyapradesh': 'central',
    'chhattisgarh': 'central',
    'uttarpradesh': 'central',
    
    // Northeast
    'arunachal': 'northeast',
    'arunachalpradesh': 'northeast',
    'assam': 'northeast',
    'manipur': 'northeast',
    'meghalaya': 'northeast',
    'mizoram': 'northeast',
    'nagaland': 'northeast',
    'sikkim': 'northeast',
    'tripura': 'northeast'
  };
  
  const mappedRegion = stateToRegionMap[regionLower];
  if (mappedRegion && regionalDishes[mappedRegion]) {
    return regionalDishes[mappedRegion];
  }
  
  // Default to generic non-veg dishes
  return [];
}
