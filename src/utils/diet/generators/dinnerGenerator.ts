
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../helpers/healthBenefitsHelper';
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
    
    // Gently introduce pre/probiotics to regional specialties
    dinner = enrichWithPrebiotics(dinner, dayIndex);
    dinner = enrichWithProbiotics(dinner, dayIndex);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(dinner);
    dinner += ` - (${healthBenefit})`;
    
    return dinner;
  }
  
  // Use prime number-based offsets to ensure variety across days
  // These create non-repeating patterns over 75 days
  const protein1Index = (dayIndex * 19 + 5) % proteins.length;
  const protein2Index = (dayIndex * 23 + 9) % proteins.length; // Different offset ensures variety
  
  const veggie1Index = (dayIndex * 11 + 7) % vegetables.length;
  const veggie2Index = (dayIndex * 13 + 11) % vegetables.length;
  
  // Select ingredients for today's dinner - use 2 protein sources for better protein diversity
  const protein1 = proteins[protein1Index];
  const protein2 = proteins[protein2Index]; // Different protein than lunch
  
  const veggie1 = vegetables[veggie1Index];
  const veggie2 = vegetables[veggie2Index];
  
  // Add local names to proteins if they don't already have them
  const protein1WithLocalName = getLocalizedProteinName(protein1);
  const protein2WithLocalName = getLocalizedProteinName(protein2);
  
  // Define portion sizes based on dietary goals
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
  
  const veggiePortion = '1 katori'; // Same across all plans
  
  // Get roti count (as a number, not a portion size)
  const rotiCount = getBreadPortionSize(isWeightLoss, isProteinFocus);
  
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
  
  // Build a protein-optimized dinner with both protein sources
  let main = `${protein1WithLocalName} and ${protein2WithLocalName} combined curry (${curryPortion} - protein-optimized), ${veggie1} and ${veggie2} sabzi (${veggiePortion}), Roti (${rotiCount}), or Brown Rice (${ricePortion})`;
  
  // Always include buttermilk (probiotic) with dinner
  main += `, chaas (1 glass)`;
  
  // For days that need additional prebiotics, add them to dinner
  if (dayIndex % 3 === 0) {
    main = enrichWithPrebiotics(main, dayIndex, true);
  }
  
  // Filter for allergies if specified
  if (allergies) {
    main = filterAllergies([main], allergies)[0] || "";
  }
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(main);
  main += ` - (${healthBenefit})`;
  
  return main;
};
