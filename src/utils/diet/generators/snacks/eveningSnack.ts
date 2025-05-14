
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getRegionalFoods } from '../../data/regionalFoods';
import { getStandardFruitPortion } from '../../helpers/portionHelpers';
import { enrichWithPrebiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
// Update to use the new modular deduplication system
import { removeDuplicateFoodItems } from '../../helpers/deduplication';

export const generateEveningSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string,
  region?: string
) => {
  // Check for regional snacks first
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional evening snacks every 4th day if available
  if (region && regionalFoods.snacks && regionalFoods.snacks.length > 0 && dayIndex % 4 === 0) {
    // Use varied index to prevent repetition
    const regionalIndex = (dayIndex * 7 + 3) % regionalFoods.snacks.length;
    let regionalSnack = regionalFoods.snacks[regionalIndex];
    
    // Adjust portion for weight loss
    if (isWeightLoss) {
      regionalSnack += " (small portion)";
    }
    
    // Apply deduplication to regional snack
    regionalSnack = removeDuplicateFoodItems(regionalSnack);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(regionalSnack);
    regionalSnack += ` - (${healthBenefit})`;
    
    return regionalSnack;
  }
  
  // Use prime numbers for varied indices to prevent repetition patterns
  // Different offsets from mid-morning to ensure variety
  const snackIndex = (dayIndex * 19 + 7) % snacks.length;
  const fruitIndex = (dayIndex * 23 + 11) % fruits.length;
  
  // For evening, prefer snacks on even days and fruits on odd days (opposite of mid-morning)
  const isEvenDay = dayIndex % 2 === 0;
  
  let snack = "";
  
  if (!isEvenDay) { // Opposite of mid-morning pattern
    // Fruit-based snack
    const fruit = fruits[fruitIndex];
    const portion = getStandardFruitPortion(fruit);
    
    snack = isWeightLoss
      ? `${fruit} ${portion}`
      : `${fruit} ${portion} with a small handful of mixed seeds`;
      
    // Apply deduplication
    snack = removeDuplicateFoodItems(snack);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(snack);
    snack += ` - (${healthBenefit})`;
    
    return snack;
  } else {
    // Regular snack from snack options
    let snackOptions = snacks.slice(); // Create a copy to avoid mutating the original
    
    if (allergies) {
      snackOptions = filterAllergies(snackOptions, allergies);
    }
    
    // Get the snack for today
    snack = snackOptions[snackIndex];
    
    // Add prebiotic foods occasionally for gut health
    if (dayIndex % 5 === 2) { // Different pattern from mid-morning
      snack = enrichWithPrebiotics(snack, dayIndex);
    }
    
    // Apply deduplication
    snack = removeDuplicateFoodItems(snack);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(snack);
    snack += ` - (${healthBenefit})`;
    
    return snack;
  }
};
