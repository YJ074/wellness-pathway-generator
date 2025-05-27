import { getRegionalFoods } from '../../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems } from '../../helpers/deduplication';
import { filterAllergies } from '../../helpers/allergyHelpers';

// Define the type for the authentic lunch options
type AuthenticLunchRegions = 'north' | 'south' | 'west' | 'east' | 'central' | 'northeast';

/**
 * Generate authentic Indian lunch options with cultural authenticity
 */
export const generateAuthenticIndianLunch = (
  dayIndex: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean,
  region?: string,
  allergies?: string
): string => {
  // Traditional Indian lunch combinations by region
  const authenticLunchOptions: Record<AuthenticLunchRegions, string[]> = {
    north: [
      'Rajma Chawal with Pickle and Papad',
      'Dal Makhani with Jeera Rice and Raita',
      'Chole Bhature with Onion Salad',
      'Kadhi Pakora with Steamed Rice',
      'Sarson ka Saag with Makki di Roti and White Butter',
      'Aloo Gobhi with Missi Roti and Lassi'
    ],
    south: [
      'Sambar Rice with Rasam and Papad',
      'Curd Rice with Mango Pickle and Appalam',
      'Bisi Bele Bath with Ghee and Pickle',
      'Pulihora with Papad and Raita',
      'Avial with Kerala Red Rice',
      'Vegetable Sambar with Coconut Rice'
    ],
    west: [
      'Gujarati Thali with Dal, Sabzi, and Roti',
      'Pav Bhaji with Chopped Onions and Lemon',
      'Undhiyu with Gujarati Kadhi and Rice',
      'Dal Baati Churma with Ghee',
      'Maharashtrian Amti with Bhakri',
      'Kathiyawadi Thali with Mixed Vegetables'
    ],
    east: [
      'Fish Curry with Steamed Rice and Aloo Bhaja',
      'Shukto with Rice and Dal',
      'Aloo Posto with Luchi and Begun Bhaja',
      'Cholar Dal with Luchi and Aloo Dum',
      'Bengali Khichuri with Labra and Papad',
      'Machher Jhol with Plain Rice and Vegetable Fry'
    ],
    central: [
      'Dal Bafla with Churma and Ghee',
      'Bhutte ka Kees with Poha and Jalebi',
      'Poha with Sev and Jalebi',
      'Indori Poha with Namkeen and Tea',
      'Palak Paneer with Tandoori Roti',
      'Kadaknath Curry with Rice and Raita'
    ],
    northeast: [
      'Assamese Fish Curry with Rice and Khar',
      'Bamboo Shoot Curry with Red Rice',
      'Black Rice with Vegetable Stew',
      'Pork with Axone and Rice',
      'Manipuri Fish Curry with Black Rice',
      'Jadoh (Meghalaya Rice Dish) with Vegetables'
    ]
  };
  
  // Get regional foods first for authenticity
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional main dishes if available
  if (region && regionalFoods.mains.length > 0) {
    const regionalIndex = (dayIndex * 7 + 11) % regionalFoods.mains.length;
    let lunch = regionalFoods.mains[regionalIndex];
    
    // Enhance with traditional accompaniments
    lunch = addTraditionalAccompaniments(lunch, region);
    
    // Apply portion adjustments
    lunch = adjustPortionsForGoals(lunch, isWeightLoss, isProteinFocus, isMale);
    
    // Filter allergies
    if (allergies) {
      const filtered = filterAllergies([lunch], allergies);
      if (filtered.length > 0) {
        lunch = filtered[0];
      }
    }
    
    return finalizeLunch(lunch, dayIndex);
  }
  
  // Fallback to authentic regional options
  const regionKey = getRegionKey(region);
  const lunchOptions = authenticLunchOptions[regionKey] || authenticLunchOptions.north;
  
  const lunchIndex = (dayIndex * 13 + 7) % lunchOptions.length;
  let lunch = lunchOptions[lunchIndex];
  
  // Apply adjustments
  lunch = adjustPortionsForGoals(lunch, isWeightLoss, isProteinFocus, isMale);
  
  // Filter allergies
  if (allergies) {
    const filtered = filterAllergies([lunch], allergies);
    if (filtered.length > 0) {
      lunch = filtered[0];
    }
  }
  
  return finalizeLunch(lunch, dayIndex);
};

/**
 * Add traditional Indian accompaniments based on region
 */
const addTraditionalAccompaniments = (lunch: string, region?: string): string => {
  // Add traditional sides if not already present
  if (!lunch.toLowerCase().includes('rice') && !lunch.toLowerCase().includes('roti')) {
    if (region === 'south' || region === 'east') {
      lunch += ' with Steamed Rice';
    } else {
      lunch += ' with Roti';
    }
  }
  
  if (!lunch.toLowerCase().includes('pickle') && !lunch.toLowerCase().includes('papad')) {
    lunch += ', Pickle, and Papad';
  }
  
  if (region === 'south' && !lunch.toLowerCase().includes('sambar')) {
    lunch += ' with Sambar';
  }
  
  if (region === 'west' && !lunch.toLowerCase().includes('kadhi')) {
    lunch += ' with Gujarati Kadhi';
  }
  
  return lunch;
};

/**
 * Adjust portions based on fitness goals and gender
 */
const adjustPortionsForGoals = (
  lunch: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean
): string => {
  if (isWeightLoss) {
    // Add weight loss modifications
    lunch = lunch.replace(/rice/gi, 'small portion of brown rice');
    lunch += ' (smaller portions with extra vegetables)';
  } else if (isProteinFocus) {
    // Add protein focus modifications
    lunch += ' (extra dal/protein with less rice)';
  } else if (isMale) {
    // Larger portions for males
    lunch += ' (larger portions)';
  }
  
  return lunch;
};

/**
 * Get region key for authentic options
 */
const getRegionKey = (region?: string): AuthenticLunchRegions => {
  if (!region) return 'north';
  
  const regionMap: Record<string, AuthenticLunchRegions> = {
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
 * Finalize lunch with health benefits and deduplication
 */
const finalizeLunch = (lunch: string, dayIndex: number): string => {
  // Add probiotics and prebiotics occasionally
  if (dayIndex % 4 === 0) {
    lunch = enrichWithProbiotics(lunch, dayIndex);
  } else if (dayIndex % 5 === 0) {
    lunch = enrichWithPrebiotics(lunch, dayIndex);
  }
  
  // Apply deduplication
  lunch = removeDuplicateFoodItems(lunch);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(lunch);
  lunch += ` - (${healthBenefit})`;
  
  return lunch;
};
