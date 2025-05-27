
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getRegionalFoods } from '../../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems } from '../../helpers/deduplication';
import { getMorningBreakfastOptions } from './breakfastOptions';
import { DietaryPreference } from '../../types';

/**
 * Generate breakfast with priority on authentic Indian cultural foods
 */
export const generateBreakfast = (
  dayIndex: number,
  dietaryPreference: DietaryPreference,
  isWeightLoss: boolean,
  allergies?: string,
  region?: string,
  gender?: string
) => {
  // Get regional foods to prioritize authentic Indian options
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional breakfast every 3rd day if available for authentic cultural foods
  if (region && regionalFoods.breakfast.length > 0 && dayIndex % 3 === 0) {
    const regionalIndex = (dayIndex * 7 + 3) % regionalFoods.breakfast.length;
    let regionalBreakfast = regionalFoods.breakfast[regionalIndex];
    
    // Apply portion adjustments based on goals and gender
    if (isWeightLoss) {
      regionalBreakfast += ' (smaller portion with extra vegetables)';
    } else if (gender === 'male') {
      regionalBreakfast += ' (larger portion)';
    }
    
    // Filter for allergies
    if (allergies) {
      const filtered = filterAllergies([regionalBreakfast], allergies);
      if (filtered.length === 0) {
        // Fall back to general options if allergic to regional food
        return generateGeneralBreakfast(dayIndex, dietaryPreference, isWeightLoss, allergies, gender);
      }
      regionalBreakfast = filtered[0];
    }
    
    // Add authentic Indian preparation methods
    regionalBreakfast = enhanceWithIndianPreparation(regionalBreakfast, region);
    
    // Apply deduplication
    regionalBreakfast = removeDuplicateFoodItems(regionalBreakfast);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(regionalBreakfast);
    regionalBreakfast += ` - (${healthBenefit})`;
    
    return regionalBreakfast;
  }
  
  // For non-regional days, still prioritize Indian breakfast options
  return generateIndianBreakfast(dayIndex, dietaryPreference, isWeightLoss, allergies, gender);
};

/**
 * Generate authentic Indian breakfast options
 */
const generateIndianBreakfast = (
  dayIndex: number,
  dietaryPreference: DietaryPreference,
  isWeightLoss: boolean,
  allergies?: string,
  gender?: string
) => {
  // Authentic Indian breakfast options organized by type
  const indianBreakfastOptions = {
    southIndian: [
      'Masala Dosa with Sambar and Coconut Chutney',
      'Idli with Podi and Coconut Chutney',
      'Uttapam with Mixed Vegetables',
      'Medu Vada with Sambar',
      'Rava Upma with Coconut',
      'Pesarattu with Ginger Chutney'
    ],
    northIndian: [
      'Aloo Paratha with Curd and Pickle',
      'Methi Thepla with Yogurt',
      'Poha with Sev and Lemon',
      'Bedmi Puri with Aloo Sabzi',
      'Stuffed Paneer Paratha with Mint Chutney',
      'Moong Dal Cheela with Green Chutney'
    ],
    westIndian: [
      'Dhokla with Green Chutney',
      'Khandvi with Coriander Chutney',
      'Thepla with White Butter',
      'Handvo with Coconut Chutney',
      'Batata Poha with Farsan',
      'Sabudana Khichdi'
    ],
    eastIndian: [
      'Luchi with Aloo Dum',
      'Puri with Cholar Dal',
      'Koraishutir Kachori with Aloo Dam',
      'Bengali Khejur Gurer Roti',
      'Radhaballabhi with Aloo Tarkari',
      'Chitoi Pitha with Tomato Chutney'
    ]
  };
  
  // Select category based on day index for variety
  const categories = Object.keys(indianBreakfastOptions);
  const categoryIndex = dayIndex % categories.length;
  const selectedCategory = categories[categoryIndex] as keyof typeof indianBreakfastOptions;
  const breakfastOptions = indianBreakfastOptions[selectedCategory];
  
  // Select specific breakfast
  const breakfastIndex = (dayIndex * 11 + 7) % breakfastOptions.length;
  let breakfast = breakfastOptions[breakfastIndex];
  
  // Apply dietary preference modifications
  breakfast = adaptToPreference(breakfast, dietaryPreference);
  
  // Apply portion adjustments
  if (isWeightLoss) {
    breakfast = breakfast.replace(/with/g, 'with small portion of');
  } else if (gender === 'male') {
    breakfast += ' (larger portion)';
  }
  
  // Filter for allergies
  if (allergies) {
    const filtered = filterAllergies([breakfast], allergies);
    if (filtered.length > 0) {
      breakfast = filtered[0];
    }
  }
  
  // Apply deduplication
  breakfast = removeDuplicateFoodItems(breakfast);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(breakfast);
  breakfast += ` - (${healthBenefit})`;
  
  return breakfast;
};

/**
 * Enhance breakfast with authentic Indian preparation methods
 */
const enhanceWithIndianPreparation = (breakfast: string, region?: string): string => {
  // Add traditional preparation mentions based on region
  if (region === 'south' || region === 'kerala' || region === 'tamilnadu') {
    if (breakfast.toLowerCase().includes('rice') && !breakfast.includes('coconut')) {
      breakfast += ' with fresh coconut';
    }
    if (breakfast.toLowerCase().includes('curry') && !breakfast.includes('leaves')) {
      breakfast += ' with curry leaves tempering';
    }
  } else if (region === 'north' || region === 'punjab') {
    if (breakfast.toLowerCase().includes('paratha') && !breakfast.includes('ghee')) {
      breakfast += ' with a touch of ghee';
    }
  } else if (region === 'west' || region === 'gujarat' || region === 'maharashtra') {
    if (breakfast.toLowerCase().includes('dhokla') && !breakfast.includes('mustard')) {
      breakfast += ' with mustard seed tempering';
    }
  }
  
  return breakfast;
};

/**
 * Adapt breakfast to dietary preferences while maintaining Indian authenticity
 */
const adaptToPreference = (breakfast: string, preference: DietaryPreference): string => {
  switch (preference) {
    case 'vegan':
      breakfast = breakfast.replace(/curd|yogurt|paneer/gi, 'coconut yogurt');
      breakfast = breakfast.replace(/ghee/gi, 'coconut oil');
      break;
    case 'jain':
      breakfast = breakfast.replace(/onion|garlic/gi, 'hing (asafoetida)');
      break;
    case 'sattvic':
      breakfast = breakfast.replace(/spicy|hot/gi, 'mild');
      break;
  }
  return breakfast;
};

/**
 * Fallback to general breakfast options
 */
const generateGeneralBreakfast = (
  dayIndex: number,
  dietaryPreference: DietaryPreference,
  isWeightLoss: boolean,
  allergies?: string,
  gender?: string
) => {
  const options = getMorningBreakfastOptions(dietaryPreference, allergies);
  const allOptions = [...options.grains, ...options.indian, ...options.protein];
  
  const index = (dayIndex * 13 + 5) % allOptions.length;
  let breakfast = allOptions[index] || 'Vegetable Upma with Coconut Chutney';
  
  if (isWeightLoss) {
    breakfast += ' (smaller portion)';
  } else if (gender === 'male') {
    breakfast += ' (larger portion)';
  }
  
  breakfast = removeDuplicateFoodItems(breakfast);
  const healthBenefit = getHealthBenefit(breakfast);
  breakfast += ` - (${healthBenefit})`;
  
  return breakfast;
};
