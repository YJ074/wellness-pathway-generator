
import { DietaryPreference } from '../../types';
import { getRegionalFoods } from '../../data/regionalFoods';
import { getMorningBreakfastOptions } from './breakfastOptions';
import { generateBreakfastWithGrains, generateHealthyBreakfast } from './breakfastHelpers';
import { enrichWithPrebiotics } from '../../helpers/prebioticProbioticHelper';
import { filterAllergies } from '../../helpers/allergyHelpers';

export const generateBreakfast = (
  dayIndex: number, 
  dietaryPreference: string, 
  isWeightLoss: boolean, 
  allergies?: string, 
  region?: string,
  gender?: string
) => {
  // Check for regional specialties
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional breakfast options every 3rd day if available
  if (region && regionalFoods.breakfasts.length > 0 && dayIndex % 3 === 0) {
    const regionalIndex = (dayIndex * 3 + 2) % regionalFoods.breakfasts.length;
    let regionalBreakfast = regionalFoods.breakfasts[regionalIndex];
    
    // Gender-specific portion adjustments for regional breakfasts
    if (gender === 'male') {
      // Add larger portions for men if not already specified
      if (!regionalBreakfast.includes('large') && !regionalBreakfast.includes('extra')) {
        // Check if the breakfast has portions mentioned
        if (regionalBreakfast.includes('bowl') || regionalBreakfast.includes('cup') || 
            regionalBreakfast.includes('plate') || regionalBreakfast.includes('serving')) {
          regionalBreakfast = regionalBreakfast.replace(/(bowl|cup|plate|serving)/, 'large $1');
        } else {
          regionalBreakfast += ' (larger serving)';
        }
      }
    }
    
    // Apply allergies filtering
    if (allergies) {
      const options = [regionalBreakfast];
      const filtered = filterAllergies(options, allergies);
      if (filtered.length > 0) {
        regionalBreakfast = filtered[0];
      }
    }
    
    // For regional specialties, gently introduce prebiotics without forcing them
    regionalBreakfast = enrichWithPrebiotics(regionalBreakfast, dayIndex);
    
    return regionalBreakfast;
  }
  
  // Use a prime number-based offset to ensure variety (not repeating pattern)
  const typeVariant = dayIndex % 6; // 0-5 types of breakfasts
  
  // Get breakfast options based on dietary preference, filtered by allergies
  const breakfastOptions = getMorningBreakfastOptions(
    dietaryPreference as DietaryPreference, 
    allergies
  );
  
  // Generate breakfast based on variant - alternating between different styles
  let breakfast = "";
  if (typeVariant <= 2) {
    // Grain-based breakfasts (like paratha, poha, upma)
    breakfast = generateBreakfastWithGrains(
      dayIndex, 
      breakfastOptions, 
      isWeightLoss,
      gender === 'male' // Pass gender info for portion sizing
    );
  } else {
    // Protein-focused breakfasts (like egg dishes, paneer, etc.)
    breakfast = generateHealthyBreakfast(
      dayIndex,
      breakfastOptions, 
      isWeightLoss,
      gender === 'male' // Pass gender info for portion sizing
    );
  }
  
  // Occasionally add prebiotic foods to breakfast
  if (dayIndex % 5 === 0) {
    breakfast = enrichWithPrebiotics(breakfast, dayIndex);
  }
  
  return breakfast;
};
