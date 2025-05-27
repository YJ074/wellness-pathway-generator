
import { getRegionalFoods } from '../../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems } from '../../helpers/deduplication';
import { filterAllergies } from '../../helpers/allergyHelpers';

/**
 * Generate authentic Indian dinner options with cultural authenticity
 */
export const generateAuthenticIndianDinner = (
  dayIndex: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean,
  region?: string,
  allergies?: string
): string => {
  // Traditional Indian dinner combinations by region
  const authenticDinnerOptions = {
    north: [
      'Palak Paneer with Jeera Rice and Raita',
      'Dal Tadka with Roti and Mixed Vegetable Sabzi',
      'Aloo Gobi with Missi Roti and Lassi',
      'Paneer Butter Masala with Naan and Salad',
      'Kadhi Pakora with Rice and Pickle',
      'Chana Masala with Kulcha and Onion Salad'
    ],
    south: [
      'Rasam Rice with Vegetable Poriyal and Papad',
      'Sambar with Rice and Coconut Vegetable Curry',
      'Curd Rice with Pickle and Appalam',
      'Vegetable Kurma with Coconut Rice',
      'Kerala Fish Curry with Red Rice and Thoran',
      'Andhra Dal with Rice and Vegetable Fry'
    ],
    west: [
      'Gujarat Dal with Rice and Vegetable Sabzi',
      'Palak Paneer with Gujarati Kadhi and Roti',
      'Mixed Vegetable Curry with Bhakri and Raita',
      'Bottle Gourd Curry with Rice and Pickle',
      'Maharashtrian Bharli Vangi with Jowar Bhakri',
      'Dal Dhokli with Pickle and Papad'
    ],
    east: [
      'Bengali Dal with Rice and Aloo Bhaja',
      'Aloo Posto with Rice and Fish Curry',
      'Moong Dal with Rice and Vegetable Fry',
      'Shukto with Rice and Papad',
      'Cholar Dal with Rice and Begun Bhaja',
      'Bengali Mixed Vegetable Curry with Rice'
    ],
    central: [
      'Bafla with Dal and Churma',
      'Mixed Dal with Rice and Vegetable Curry',
      'Palak Paneer with Tandoori Roti',
      'Aloo Baingan with Rice and Raita',
      'Dal Fry with Roti and Mixed Vegetables',
      'Bhindi Masala with Rice and Dal'
    ],
    northeast: [
      'Simple Dal with Rice and Steamed Vegetables',
      'Bamboo Shoot Curry with Red Rice',
      'Mixed Vegetable Stew with Rice',
      'Black Rice with Simple Vegetable Curry',
      'Mustard Greens with Rice and Dal',
      'Fermented Fish with Rice and Vegetables'
    ]
  };
  
  // Get regional foods first for authenticity
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional main dishes if available (prioritize dinner authenticity)
  if (region && regionalFoods.mains.length > 0 && dayIndex % 3 === 0) {
    const regionalIndex = (dayIndex * 11 + 13) % regionalFoods.mains.length;
    let dinner = regionalFoods.mains[regionalIndex];
    
    // Enhance with traditional dinner accompaniments
    dinner = addTraditionalDinnerAccompaniments(dinner, region);
    
    // Apply portion adjustments for dinner (typically lighter than lunch)
    dinner = adjustDinnerPortions(dinner, isWeightLoss, isProteinFocus, isMale);
    
    // Filter allergies
    if (allergies) {
      const filtered = filterAllergies([dinner], allergies);
      if (filtered.length > 0) {
        dinner = filtered[0];
      }
    }
    
    return finalizeDinner(dinner, dayIndex);
  }
  
  // Use authentic regional dinner options
  const regionKey = getRegionKey(region);
  const dinnerOptions = authenticDinnerOptions[regionKey] || authenticDinnerOptions.north;
  
  const dinnerIndex = (dayIndex * 17 + 11) % dinnerOptions.length;
  let dinner = dinnerOptions[dinnerIndex];
  
  // Apply dinner-specific adjustments
  dinner = adjustDinnerPortions(dinner, isWeightLoss, isProteinFocus, isMale);
  
  // Filter allergies
  if (allergies) {
    const filtered = filterAllergies([dinner], allergies);
    if (filtered.length > 0) {
      dinner = filtered[0];
    }
  }
  
  return finalizeDinner(dinner, dayIndex);
};

/**
 * Add traditional Indian dinner accompaniments based on region
 */
const addTraditionalDinnerAccompaniments = (dinner: string, region?: string): string => {
  // For dinner, lighter accompaniments are preferred
  if (!dinner.toLowerCase().includes('rice') && !dinner.toLowerCase().includes('roti')) {
    if (region === 'south' || region === 'east') {
      dinner += ' with Small Portion of Rice';
    } else {
      dinner += ' with 1-2 Rotis';
    }
  }
  
  // Add lighter sides for dinner
  if (!dinner.toLowerCase().includes('raita') && !dinner.toLowerCase().includes('salad')) {
    dinner += ' and Cucumber Raita';
  }
  
  return dinner;
};

/**
 * Adjust portions specifically for dinner (lighter than lunch)
 */
const adjustDinnerPortions = (
  dinner: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean
): string => {
  if (isWeightLoss) {
    // Emphasize lighter dinner for weight loss
    dinner = dinner.replace(/rice/gi, 'small bowl of rice');
    dinner = dinner.replace(/roti/gi, '1 roti');
    dinner += ' (light dinner with extra vegetables)';
  } else if (isProteinFocus) {
    // Focus on protein while keeping carbs moderate for dinner
    dinner += ' (protein-rich with moderate carbs)';
  } else if (isMale && !isWeightLoss) {
    // Slightly larger portions for males but still moderate for dinner
    dinner += ' (moderate portions)';
  } else {
    // Standard female portions
    dinner += ' (light and nutritious)';
  }
  
  return dinner;
};

/**
 * Get region key for authentic dinner options
 */
const getRegionKey = (region?: string): keyof typeof authenticDinnerOptions => {
  if (!region) return 'north';
  
  const regionMap: Record<string, 'north' | 'south' | 'west' | 'east' | 'central' | 'northeast'> = {
    'punjab': 'north',
    'haryana': 'north',
    'uttarpradesh': 'north',
    'delhi': 'north',
    'himachal': 'north',
    'uttarakhand': 'north',
    'kerala': 'south',
    'tamilnadu': 'south',
    'karnataka': 'south',
    'andhra': 'south',
    'telangana': 'south',
    'gujarat': 'west',
    'maharashtra': 'west',
    'rajasthan': 'west',
    'goa': 'west',
    'westbengal': 'east',
    'odisha': 'east',
    'bihar': 'east',
    'jharkhand': 'east',
    'madhyapradesh': 'central',
    'chhattisgarh': 'central',
    'assam': 'northeast',
    'manipur': 'northeast',
    'meghalaya': 'northeast',
    'nagaland': 'northeast'
  };
  
  return regionMap[region.toLowerCase()] || 'north';
};

/**
 * Finalize dinner with health benefits and deduplication
 */
const finalizeDinner = (dinner: string, dayIndex: number): string => {
  // Add probiotics and prebiotics occasionally (lighter for dinner)
  if (dayIndex % 6 === 0) {
    dinner = enrichWithProbiotics(dinner, dayIndex);
  } else if (dayIndex % 7 === 0) {
    dinner = enrichWithPrebiotics(dinner, dayIndex);
  }
  
  // Apply deduplication
  dinner = removeDuplicateFoodItems(dinner);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(dinner);
  dinner += ` - (${healthBenefit})`;
  
  return dinner;
};
