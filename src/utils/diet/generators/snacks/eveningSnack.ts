
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getRegionalFoods } from '../../data/regionalFoods';
import { getStandardFruitPortion } from '../../helpers/portionHelpers';
import { enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
// Update to use the new modular deduplication system
import { removeDuplicateFoodItems } from '../../helpers/deduplication';

/**
 * Generates evening snack options for the diet plan
 */
export const generateEveningSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string,
  region?: string,
  gender?: string
) => {
  // Check for regional specialties
  const regionalFoods = getRegionalFoods(region);
  
  // Check if this is a male who is not on weight loss plan
  // If so, provide more substantial snacks
  const needsLargerSnack = gender === 'male' && !isWeightLoss;
  
  // Use regional snack options every 4th day if available
  if (region && regionalFoods.snacks.length > 0 && dayIndex % 4 === 0) {
    const regionalIndex = (dayIndex * 7 + 5) % regionalFoods.snacks.length;
    let regionalSnack = regionalFoods.snacks[regionalIndex];
    
    // Gender-specific portion adjustments for regional snacks
    if (needsLargerSnack) {
      // Add larger portions for men if not already specified
      if (!regionalSnack.includes('large') && !regionalSnack.includes('extra')) {
        regionalSnack += ' (larger portion)';
      }
    } else if (isWeightLoss) {
      // Smaller portion for weight loss
      if (!regionalSnack.includes('small')) {
        regionalSnack += ' (small portion)';
      }
    }
    
    // Apply allergies filtering
    if (allergies) {
      const options = [regionalSnack];
      const filtered = filterAllergies(options, allergies);
      if (filtered.length > 0) {
        regionalSnack = filtered[0];
      }
    }
    
    // For regional specialties, gently introduce probiotics without forcing them
    regionalSnack = enrichWithProbiotics(regionalSnack, dayIndex);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(regionalSnack);
    regionalSnack += ` - (${healthBenefit})`;
    
    return regionalSnack;
  }
  
  // Use prime numbers for varied indices to prevent repetition patterns
  const snackIndex1 = (dayIndex * 11 + 7) % snacks.length;
  let snackIndex2 = (dayIndex * 17 + 11) % snacks.length;
  const fruitIndex = (dayIndex * 13 + 5) % fruits.length;
  
  // Ensure the two snack indices are different
  if (snackIndex1 === snackIndex2) {
    snackIndex2 = (snackIndex2 + 1) % snacks.length;
  }
  
  let snackOptions = snacks.slice(); // Create a copy to avoid mutating the original
  
  if (allergies) {
    snackOptions = filterAllergies(snackOptions, allergies);
  }
  
  // Get the evening snack items - typically lighter than morning snacks
  const snack1 = snackOptions[snackIndex1] || "Roasted makhana";
  let snack2 = snackOptions[snackIndex2] || "Vegetable sandwich";
  
  // Get a fruit option
  const fruit = fruits[fruitIndex] || "Orange";
  const fruitPortion = getStandardFruitPortion(fruit);
  
  // Combine into a cohesive snack recommendation
  let combinedSnack = "";
  
  if (isWeightLoss) {
    // For weight loss, recommend lighter options
    combinedSnack = `Choose one: ${snack1} (small portion) or ${fruit} ${fruitPortion}`;
  } else if (needsLargerSnack) {
    // For males not on weight loss, offer more substantial options
    combinedSnack = `${snack1} AND ${fruit} ${fruitPortion}`;
    
    // Add more substantial descriptions for males
    if (snack1.toLowerCase().includes('protein') || 
        snack1.toLowerCase().includes('nuts') || 
        snack1.toLowerCase().includes('sandwich')) {
      combinedSnack += ` (larger portion)`;
    }
  } else {
    // For maintenance/standard female portion
    combinedSnack = `Choose one: ${snack1}, ${snack2}, or ${fruit} ${fruitPortion}`;
  }
  
  // Add probiotic benefits occasionally
  if (dayIndex % 3 === 0) {
    combinedSnack = enrichWithProbiotics(combinedSnack, dayIndex);
  }
  
  // Apply deduplication to the snack
  combinedSnack = removeDuplicateFoodItems(combinedSnack);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(combinedSnack);
  combinedSnack += ` - (${healthBenefit})`;
  
  return combinedSnack;
};
