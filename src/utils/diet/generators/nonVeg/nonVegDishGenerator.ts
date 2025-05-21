
import { getNonVegDishPortion, balanceNonVegMeal } from '../../helpers/portionHelpers';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { filterAllergies } from '../../helpers/allergyHelpers';
import { generateNonVegByRegion } from './regional/nonVegRegionalGenerator';
import { removeDuplicateFoodItems } from '../../helpers/deduplication';

export const generateNonVegDish = (
  dayIndex: number, 
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  nonVegType: string,
  allergies?: string,
  region?: string
) => {
  // Try to use regional non-veg dishes if a region is specified
  if (region) {
    const regionalDish = generateNonVegByRegion(
      nonVegType,  // Pass nonVegType as first parameter (string)
      dayIndex,    // Pass dayIndex as second parameter (number)
      isWeightLoss, 
      isProteinFocus,
      region
    );
    
    if (regionalDish) {
      return regionalDish;
    }
  }
  
  // Default non-veg options - protein sources
  const nonVegProteins = {
    'chicken': [
      'grilled chicken',
      'tandoori chicken',
      'chicken tikka',
      'chicken curry',
      'chicken 65'
    ],
    'mutton': [
      'mutton curry',
      'mutton do pyaza',
      'mutton rogan josh',
      'keema matar',
      'mutton korma'
    ],
    'fish': [
      'fish curry',
      'grilled fish',
      'fish tikka',
      'fish fry',
      'fish moilee'
    ],
    'egg': [
      'egg curry',
      'egg bhurji',
      'egg masala',
      'egg roast',
      'egg fried rice'
    ]
  };
  
  // Accompanying sides - 75% of non-veg meals should have plenty of vegetables
  const sides = {
    vegetables: [
      'mixed vegetable curry',
      'palak paneer',
      'bhindi masala',
      'matar paneer',
      'aloo gobhi'
    ],
    grains: [
      'brown rice',
      'jeera rice',
      'steamed rice',
      'roti',
      'paratha'
    ]
  };
  
  // Select non-veg protein
  const nonVegOptions = nonVegProteins[nonVegType as keyof typeof nonVegProteins] || nonVegProteins.chicken;
  const proteinIndex = (dayIndex * 13 + 5) % nonVegOptions.length;
  let mainProteinDish = nonVegOptions[proteinIndex];
  
  // Select vegetable side
  const vegIndex = (dayIndex * 7 + 11) % sides.vegetables.length;
  const vegetableSide = sides.vegetables[vegIndex];
  
  // Select grain
  const grainIndex = (dayIndex * 11 + 3) % sides.grains.length;
  const grain = sides.grains[grainIndex];
  
  // Get appropriate portion based on diet goal and non-veg type
  const portion = getNonVegDishPortion(nonVegType, isWeightLoss, isProteinFocus);
  
  // Balance the meal - add components based on nutritional needs
  let meal = balanceNonVegMeal(
    mainProteinDish,
    isWeightLoss,  // Pass only the required 3 arguments here
    isProteinFocus
  );
  
  // Add pre/probiotics occasionally to support gut health
  if (dayIndex % 3 === 0) {
    meal = enrichWithPrebiotics(meal, dayIndex);
  }
  if (dayIndex % 4 === 0) {
    meal = enrichWithProbiotics(meal, dayIndex);
  }
  
  // Filter out allergens if specified
  if (allergies) {
    // Simple approach - just check if meal contains allergen terms
    const allergyTerms = allergies.split(',').map(a => a.trim().toLowerCase());
    for (const term of allergyTerms) {
      if (meal.toLowerCase().includes(term)) {
        // Replace with default safe option
        meal = `Grilled chicken breast (100g), mixed vegetable curry (1 katori), 2 rotis`;
        break;
      }
    }
  }
  
  // Remove any duplicate food items
  meal = removeDuplicateFoodItems(meal);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(meal);
  meal += ` - (${healthBenefit})`;
  
  return meal;
};
