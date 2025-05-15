
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../helpers/healthBenefitsHelper';
// Update this import to use the new modular deduplication system
import { removeDuplicateFoodItems, hasFoodBeenUsedToday } from '../helpers/deduplication';
import { 
  getLocalizedProteinName, 
  getBreadPortionSize,
  composeRegionalMeal,
  composeDinnerMeal,
  getPortionSize,
  getVeganProteinAlternative,
  getProteinPortion
} from '../helpers/portionHelpers';

export const generateDinner = (
  dayIndex: number, 
  proteins: string[], 
  vegetables: string[], 
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  allergies?: string,
  region?: string
) => {
  // Check for regional specialties
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional dinner options every 6th day if available
  if (region && regionalFoods.mains.length > 0 && dayIndex % 6 === 0) {
    // Use varied index to avoid repetition in regional foods
    const regionalIndex = (dayIndex * 5 + 11) % regionalFoods.mains.length;
    const regionalDinner = regionalFoods.mains[regionalIndex];
    
    // Format dinner based on dietary goals using the helper function
    let dinner = composeRegionalMeal(regionalDinner, isWeightLoss, isProteinFocus);
    
    // Ensure regional meals always mention rice/roti
    if (!dinner.toLowerCase().includes('roti') && !dinner.toLowerCase().includes('rice')) {
      dinner += ', served with 2 rotis or ½ katori rice';
    }
    
    // Gently introduce pre/probiotics to regional specialties
    dinner = enrichWithPrebiotics(dinner, dayIndex);
    dinner = enrichWithProbiotics(dinner, dayIndex);
    
    // Apply deduplication to regional dinner
    dinner = removeDuplicateFoodItems(dinner);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(dinner);
    dinner += ` - (${healthBenefit})`;
    
    return dinner;
  }
  
  // Use prime number-based offsets to ensure variety across days
  // These create non-repeating patterns over 75 days
  const protein1Index = (dayIndex * 19 + 5) % proteins.length;
  let protein2Index = (dayIndex * 23 + 9) % proteins.length; // Different offset ensures variety
  
  const veggie1Index = (dayIndex * 11 + 7) % vegetables.length;
  const veggie2Index = (dayIndex * 13 + 11) % vegetables.length;
  
  // Select ingredients for today's dinner with protein diversity
  // Using two complementary protein sources increases amino acid profile completeness
  let protein1 = proteins[protein1Index];
  let protein2 = proteins[protein2Index]; // Different protein than lunch
  
  // Ensure we're not repeating dairy products across meals
  if (hasFoodBeenUsedToday(dayIndex, protein1)) {
    // Look for an alternative protein
    for (let i = 1; i < proteins.length; i++) {
      const newIndex = (protein1Index + i) % proteins.length;
      if (!hasFoodBeenUsedToday(dayIndex, proteins[newIndex])) {
        protein1 = proteins[newIndex];
        break;
      }
    }
  }
  
  // Also check second protein for repetition - especially avoid two dairy or two legumes
  if (hasFoodBeenUsedToday(dayIndex, protein2) || protein2.toLowerCase().includes(protein1.toLowerCase())) {
    // Try to find a different protein type
    for (let i = 1; i < proteins.length; i++) {
      const newIndex = (protein2Index + i) % proteins.length;
      const candidate = proteins[newIndex];
      
      // Check if it's different from protein1 and not used yet today
      if (candidate !== protein1 && !hasFoodBeenUsedToday(dayIndex, candidate)) {
        protein2 = candidate;
        break;
      }
    }
  }
  
  const veggie1 = vegetables[veggie1Index];
  const veggie2 = vegetables[veggie2Index];
  
  // Add local names to proteins for better understanding and cultural relevance
  const protein1WithLocalName = getLocalizedProteinName(protein1);
  const protein2WithLocalName = getLocalizedProteinName(protein2);
  
  // Define portion sizes based on dietary goals
  // More scientific approach that considers satiety and macro distribution
  const curryPortion = getPortionSize(
    isWeightLoss,
    isProteinFocus,
    'curry',
    {
      standard: '¾ katori',
      weightLoss: '¾ katori',
      proteinFocus: '1 katori'
    }
  );
  
  // Maintain vegetable portion regardless of goal - vegetables are nutrient-dense and low-calorie
  const veggiePortion = '1 katori'; // Same across all plans
  
  // Get roti count (as a number, not a portion size)
  const rotiCount = getBreadPortionSize(isWeightLoss, isProteinFocus);
  
  // Rice portion varies by goal - higher for muscle gain, lower for weight loss
  const ricePortion = getPortionSize(
    isWeightLoss,
    isProteinFocus,
    'rice',
    {
      standard: '½ katori',
      weightLoss: '¼ katori',
      proteinFocus: '½ katori'
    }
  );
  
  // Always explicitly include both roti and rice options in dinner for Indian diet context
  let main = `${protein1WithLocalName} and ${protein2WithLocalName} curry (${curryPortion}), ${veggie1} and ${veggie2} sabzi (${veggiePortion}), ${rotiCount} rotis OR ${ricePortion} brown rice`;
  
  // Only include buttermilk if we haven't used dairy products in other meals
  // Check for dairy terms in existing meals
  const dairyTerms = ['dahi', 'yogurt', 'curd', 'buttermilk', 'chaas', 'milk', 'paneer'];
  const hasDairyInMeals = dairyTerms.some(term => hasFoodBeenUsedToday(dayIndex, term));
  
  if (!hasDairyInMeals) {
    main += `, chaas (1 glass)`;
  }
  
  // For days that need additional prebiotics, add them to dinner
  // Prebiotics support gut microbiome and enhance probiotic effectiveness
  if (dayIndex % 3 === 0) {
    main = enrichWithPrebiotics(main, dayIndex, true);
  }
  
  // Apply deduplication to dinner
  main = removeDuplicateFoodItems(main);
  
  // Filter for allergies if specified
  if (allergies) {
    main = filterAllergies([main], allergies)[0] || "";
  }
  
  // Add health benefit to help user understand nutritional value
  const healthBenefit = getHealthBenefit(main);
  main += ` - (${healthBenefit})`;
  
  return main;
};
