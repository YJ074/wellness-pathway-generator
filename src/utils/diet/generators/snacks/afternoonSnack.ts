
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getRegionalFoods } from '../../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { getStandardFruitPortion, isBigFruit } from '../../helpers/portionHelpers';
import { removeDuplicateFoodItems } from '../../helpers/deduplication';

/**
 * Generate afternoon snack optimized for:
 * - Blood sugar management (to prevent afternoon energy dips)
 * - Balanced energy for the second half of the day
 * - Nutritional synergy with lunch and dinner
 */
export const generateAfternoonSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string,
  region?: string
): string => {
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional foods for afternoon snack every 7th day if available
  if (region && regionalFoods.snacks && regionalFoods.snacks.length > 0 && dayIndex % 7 === 3) {
    const regionalSnackIndex = (dayIndex * 7 + 3) % regionalFoods.snacks.length;
    let afternoonSnack = regionalFoods.snacks[regionalSnackIndex];
    
    // Add portion size information for regional snack
    if (isWeightLoss) {
      afternoonSnack += " (small portion)";
    }
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(afternoonSnack);
    afternoonSnack += ` - (${healthBenefit})`;
    
    return afternoonSnack;
  }
  
  // Focus on balanced snacks with protein + fiber combination
  // This helps maintain stable blood sugar through afternoon
  
  // Select a protein-rich snack
  const proteinSnacks = [
    "Roasted chana", 
    "Greek yogurt", 
    "Paneer cubes", 
    "Mixed nuts", 
    "Cheese cubes", 
    "Hummus", 
    "Tofu slices", 
    "Boiled egg"
  ];
  
  // Select fiber-rich additions
  const fiberAdditions = [
    "carrot sticks", 
    "cucumber slices", 
    "bell pepper strips", 
    "whole grain crackers", 
    "multigrain toast", 
    "apple slices", 
    "berries", 
    "flaxseeds"
  ];
  
  // Use prime number based indices for variety
  const proteinIndex = (dayIndex * 7 + 3) % proteinSnacks.length;
  const fiberIndex = (dayIndex * 11 + 5) % fiberAdditions.length;
  const fruitIndex = (dayIndex * 13 + 7) % fruits.length;
  
  // Select today's components
  const proteinComponent = proteinSnacks[proteinIndex];
  const fiberComponent = fiberAdditions[fiberIndex];
  const fruit = fruits[fruitIndex];
  
  // Get standardized fruit portion
  const fruitPortion = getStandardFruitPortion(fruit, isWeightLoss);
  
  // Build the afternoon snack with balanced nutrition
  let afternoonSnack = '';
  
  if (dayIndex % 3 === 0) {
    // Protein + fiber combination (no fruit)
    afternoonSnack = `${proteinComponent} with ${fiberComponent}`;
  } else if (dayIndex % 3 === 1) {
    // Protein-focused snack with fruit
    afternoonSnack = `${proteinComponent} and ${fruit} (${fruitPortion})`;
  } else {
    // Fruit + fiber combination
    afternoonSnack = `${fruit} (${fruitPortion}) with ${fiberComponent}`;
  }
  
  // For weight loss, emphasize portion control
  if (isWeightLoss) {
    afternoonSnack += " - keep portions moderate";
  }
  
  // Add probiotics or prebiotics for gut health
  if (dayIndex % 5 === 2) {
    afternoonSnack = enrichWithProbiotics(afternoonSnack, dayIndex);
  } else if (dayIndex % 5 === 4) {
    afternoonSnack = enrichWithPrebiotics(afternoonSnack, dayIndex);
  }
  
  // Apply deduplication to avoid repeat ingredients
  afternoonSnack = removeDuplicateFoodItems(afternoonSnack);
  
  // Filter for allergies
  if (allergies) {
    const allergyOptions = filterAllergies([afternoonSnack], allergies);
    if (allergyOptions.length > 0) {
      afternoonSnack = allergyOptions[0];
    } else {
      // Default safe option if allergies filter everything
      afternoonSnack = "Mixed vegetable sticks with hummus";
    }
  }
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(afternoonSnack);
  afternoonSnack += ` - (${healthBenefit})`;
  
  return afternoonSnack;
};
