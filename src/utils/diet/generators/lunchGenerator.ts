
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../helpers/healthBenefitsHelper';
// Update this import to use the new modular deduplication system
import { removeDuplicateFoodItems, hasFoodBeenUsedToday } from '../helpers/deduplication';
import { 
  getLocalizedProteinName, 
  getLocalizedGrainName,
  composeRegionalMeal,
  getBreadPortionSize,
  getVeganProteinAlternative,
  getProteinPortion,
  getIndianMeasure
} from '../helpers/portionHelpers';
import { getAllowedNonVegTypes } from '../helpers/dietaryPreferenceHelper';
import { generateNonVegDish } from './nonVeg';

export const generateLunch = (
  dayIndex: number, 
  proteins: string[], 
  grains: string[], 
  vegetables: string[], 
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  allergies?: string,
  region?: string,
  dietaryPreference?: string // Added parameter
) => {
  // Check if non-vegetarian dishes are allowed
  const allowNonVeg = dietaryPreference && getAllowedNonVegTypes(dietaryPreference).length > 0;
  
  // Use non-vegetarian dishes every 3rd day if user allows non-veg food
  if (allowNonVeg && dayIndex % 3 === 0) {
    const allowedTypes = getAllowedNonVegTypes(dietaryPreference || 'non-vegetarian');
    // Use different non-veg types on different days
    const nonVegType = allowedTypes[(dayIndex * 7 + 3) % allowedTypes.length];
    
    return generateNonVegDish(
      dayIndex,
      isWeightLoss,
      isProteinFocus,
      nonVegType,
      allergies,
      region
    );
  }

  // Check for regional specialties
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional lunch options every 5th day if available
  if (region && regionalFoods.mains.length > 0 && dayIndex % 5 === 0) {
    // Use varied index to avoid repetition in regional foods
    const regionalIndex = (dayIndex * 7 + 3) % regionalFoods.mains.length;
    const regionalLunch = regionalFoods.mains[regionalIndex];
    
    // Format lunch based on dietary goals using helper function
    let lunch = composeRegionalMeal(regionalLunch, isWeightLoss, isProteinFocus);
    
    // Ensure regional meals always mention rice/roti
    if (!lunch.toLowerCase().includes('roti') && !lunch.toLowerCase().includes('rice')) {
      lunch += ', served with 2 rotis (palm-sized) or ½ katori rice';
    }
    
    // For regional specialties, gently introduce pre/probiotics without forcing them
    lunch = enrichWithPrebiotics(lunch, dayIndex);
    lunch = enrichWithProbiotics(lunch, dayIndex);
    
    // Apply deduplication to the regional lunch
    lunch = removeDuplicateFoodItems(lunch);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(lunch);
    lunch += ` - (${healthBenefit})`;
    
    return lunch;
  }
  
  // Use prime number-based offsets to ensure variety across days
  // These create non-repeating patterns over 75 days to avoid repetition
  const protein1Index = (dayIndex * 7 + 3) % proteins.length;
  let protein2Index = (dayIndex * 11 + 13) % proteins.length; // Different offset ensures variety
  
  const grainIndex = (dayIndex * 5 + 1) % grains.length;
  const veggie1Index = (dayIndex * 13 + 7) % vegetables.length;
  const veggie2Index = (dayIndex * 17 + 11) % vegetables.length;
  
  // Ensure we get at least 2 protein sources for each lunch to maximize protein intake
  let protein1 = proteins[protein1Index];
  let protein2 = proteins[protein2Index]; // Use a different protein source
  
  // Check if these proteins have been used today already
  if (hasFoodBeenUsedToday(dayIndex, protein1)) {
    // Try to find another protein that hasn't been used
    for (let i = 1; i < proteins.length; i++) {
      const newIndex = (protein1Index + i) % proteins.length;
      if (!hasFoodBeenUsedToday(dayIndex, proteins[newIndex])) {
        protein1 = proteins[newIndex];
        break;
      }
    }
  }
  
  // Also check second protein for repetition or similarity to first
  const legumeType1 = protein1.toLowerCase().includes('dal') || 
                     protein1.toLowerCase().includes('beans') ||
                     protein1.toLowerCase().includes('lentil');
                     
  if (hasFoodBeenUsedToday(dayIndex, protein2) || 
     (legumeType1 && (protein2.toLowerCase().includes('dal') || 
                     protein2.toLowerCase().includes('beans') ||
                     protein2.toLowerCase().includes('lentil')))) {
    // Try to find a non-legume protein if the first one was legume
    for (let i = 1; i < proteins.length; i++) {
      const newIndex = (protein2Index + i) % proteins.length;
      const candidate = proteins[newIndex];
      
      if (!hasFoodBeenUsedToday(dayIndex, candidate) && 
         !(legumeType1 && (candidate.toLowerCase().includes('dal') || 
                          candidate.toLowerCase().includes('beans') ||
                          candidate.toLowerCase().includes('lentil')))) {
        protein2 = candidate;
        break;
      }
    }
  }
  
  // Make sure we use a grain in every meal for consistent carb balance
  const grain = grains[grainIndex];
  const veggie1 = vegetables[veggie1Index];
  const veggie2 = vegetables[veggie2Index];
  
  // Add local names to proteins if they don't already have them
  const protein1WithLocalName = getLocalizedProteinName(protein1);
  const protein2WithLocalName = getLocalizedProteinName(protein2);
  
  // Ensure local names for grains too with specific preparation method
  const grainWithLocalName = getLocalizedGrainName(grain);
  
  // Get roti count (as a number, not as "X rotis")
  const rotiCount = getBreadPortionSize(isWeightLoss, isProteinFocus);
  
  // Explicitly include carbs in the form of roti/rice/bread in each meal description
  let main = "";
  
  // Make sure we always include Indian staples - rotis and rice options with Indian measurements
  if (isWeightLoss) {
    main = `${protein1WithLocalName} and ${protein2WithLocalName} curry (¾ katori - balanced protein sources), ${veggie1} and ${veggie2} sabzi (1 katori), ${rotiCount} rotis (palm-sized) OR ½ katori brown rice`;
  } else if (isProteinFocus) {
    main = `${protein1WithLocalName} and ${protein2WithLocalName} curry (1 katori - high protein mix), ${veggie1} and ${veggie2} sabzi (1 katori), ${rotiCount} rotis (palm-sized) OR ¾ katori rice`;
  } else {
    main = `${protein1WithLocalName} and ${protein2WithLocalName} curry (¾ katori - protein-rich blend), ${veggie1} and ${veggie2} sabzi (1 katori), ${rotiCount} rotis (palm-sized) OR ¾ katori rice`;
  }
  
  // Check if dairy has been used already today before adding curd
  const dairyTerms = ['dahi', 'yogurt', 'curd', 'buttermilk', 'chaas', 'milk', 'paneer'];
  const hasDairyInMeals = dairyTerms.some(term => hasFoodBeenUsedToday(dayIndex, term));
  
  // Add curd (probiotic) to lunch only if we haven't used dairy yet
  if (!hasDairyInMeals) {
    main += `, dahi (1 katori)`;
  }
  
  // For days not already featuring prebiotics, add some to the meal
  main = enrichWithPrebiotics(main, dayIndex);
  
  // Apply deduplication to lunch
  main = removeDuplicateFoodItems(main);
  
  if (allergies) {
    // Remove or swap allergy terms inside lunch text (rough approach)
    const allergiesArr = allergies.split(',').map(x=>x.trim().toLowerCase());
    allergiesArr.forEach(a => {
      if (main.toLowerCase().includes(a)) {
        main = main.replace(new RegExp('\\b' + a + '\\b', 'gi'), '');
      }
    });
  }
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(main);
  main += ` - (${healthBenefit})`;
  
  return main;
};
