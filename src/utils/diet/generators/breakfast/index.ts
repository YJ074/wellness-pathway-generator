
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getRegionalFoods } from '../../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getFruitSources } from '../../data/foodSources';
import { getStandardFruitPortion, getDailyNutsMixture } from '../../helpers/portionHelpers';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { 
  preventDuplicateAdditions, 
  addFruitsToBreakfast, 
  addNutsToBreakfast,
  hasProbiotics,
  hasPrebiotics
} from './breakfastHelpers';
import { 
  getVegetarianBreakfastOptions, 
  getEggBreakfastOptions 
} from './breakfastOptions';

export const generateBreakfast = (
  dayIndex: number,
  dietaryPreference: string,
  isWeightLoss: boolean,
  allergies?: string,
  region?: string
) => {
  // Check if we have regional specialties first
  const regionalFoods = getRegionalFoods(region);
  
  // If region is specified and has breakfast items, use them occasionally (every 3rd day)
  if (region && regionalFoods.breakfast.length > 0 && dayIndex % 3 === 0) {
    const regionalBreakfast = regionalFoods.breakfast[dayIndex % regionalFoods.breakfast.length];
    
    // Add portion control for weight loss
    let breakfast = isWeightLoss ? `${regionalBreakfast} (smaller portion)` : regionalBreakfast;
    
    // Ensure inclusion of prebiotic/probiotic foods (but don't force it for regional specialties)
    breakfast = enrichWithPrebiotics(breakfast, dayIndex);
    breakfast = enrichWithProbiotics(breakfast, dayIndex);
    
    // Add daily nuts mixture to every breakfast - but only once
    const dailyNuts = getDailyNutsMixture(dayIndex);
    
    // Ensure dailyNuts is not already included in breakfast
    if (!breakfast.toLowerCase().includes(dailyNuts.toLowerCase())) {
      breakfast = preventDuplicateAdditions(breakfast, `with ${dailyNuts}`);
    }
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(breakfast);
    breakfast += ` - (${healthBenefit})`;
    
    return breakfast;
  }
  
  let breakfastOptions = getVegetarianBreakfastOptions();
  
  // Add fruit to breakfast 3-4 times a week (increased frequency since we're removing from lunch/dinner)
  if (dayIndex % 7 === 0 || dayIndex % 7 === 2 || dayIndex % 7 === 4 || dayIndex % 7 === 6) {
    breakfastOptions = addFruitsToBreakfast(breakfastOptions, dayIndex, allergies);
  }

  // Always add a daily nuts mixture to every breakfast (only once)
  breakfastOptions = addNutsToBreakfast(breakfastOptions, dayIndex);
  
  if (dietaryPreference === 'lacto-ovo-vegetarian' || dietaryPreference === 'non-vegetarian') {
    let eggBreakfasts = getEggBreakfastOptions();
    
    // Add fruit occasionally to egg breakfasts
    if (dayIndex % 7 === 1 || dayIndex % 7 === 5) {  // Days 1 and 5 of the week
      eggBreakfasts = addFruitsToBreakfast(eggBreakfasts, dayIndex, allergies);
    }
    
    // Always add daily nuts mixture to egg breakfasts (only once)
    eggBreakfasts = addNutsToBreakfast(eggBreakfasts, dayIndex);
    
    if (allergies) {
      eggBreakfasts = filterAllergies(eggBreakfasts, allergies);
    }
    
    // Use a varied index for egg breakfasts, but only on certain days
    if (eggBreakfasts.length && dayIndex % 4 === 0) {
      // Use a prime number offset to ensure better variety
      const variedEggIndex = (dayIndex * 3 + 5) % eggBreakfasts.length;
      let breakfast = eggBreakfasts[variedEggIndex];
      
      // For egg breakfasts, we need to especially ensure probiotics as they naturally lack them
      // Only add if not already present
      if (!hasProbiotics(breakfast)) {
        breakfast = enrichWithProbiotics(breakfast, dayIndex, true);
      }
      
      // Add health benefit
      const healthBenefit = getHealthBenefit(breakfast);
      breakfast += ` - (${healthBenefit})`;
      
      return breakfast;
    }
  }
  
  if (allergies) {
    breakfastOptions = filterAllergies(breakfastOptions, allergies);
  }
  
  // Use a prime number offset to avoid repetition every 2 days
  // This creates a more varied pattern across the 75-day plan
  const variedDayIndex = (dayIndex * 5 + 3) % breakfastOptions.length;
  
  // Get the breakfast option for today using our varied index
  let breakfast = breakfastOptions[variedDayIndex] || "";
  
  // Every even day, ensure probiotics; every odd day, ensure prebiotics
  // Only add if not already present
  if (dayIndex % 2 === 0 && !hasProbiotics(breakfast)) {
    breakfast = enrichWithProbiotics(breakfast, dayIndex, true);
  } else if (dayIndex % 2 === 1 && !hasPrebiotics(breakfast)) {
    breakfast = enrichWithPrebiotics(breakfast, dayIndex, true);
  }
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(breakfast);
  breakfast += ` - (${healthBenefit})`;
  
  return breakfast;
};
