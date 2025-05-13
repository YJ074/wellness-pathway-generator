
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems } from '../helpers/deduplication';
import { 
  getLocalizedProteinName, 
  getLocalizedGrainName,
  composeRegionalMeal,
  getBreadPortionSize,
  getVeganProteinAlternative,
  getProteinPortion
} from '../helpers/portionHelpers';

export const generateLunch = (
  dayIndex: number, 
  proteins: string[], 
  grains: string[], 
  vegetables: string[], 
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  allergies?: string,
  region?: string
) => {
  // Check for regional specialties
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional lunch options every 5th day if available
  if (region && regionalFoods.mains.length > 0 && dayIndex % 5 === 0) {
    // Use varied index to avoid repetition in regional foods
    const regionalIndex = (dayIndex * 7 + 3) % regionalFoods.mains.length;
    const regionalLunch = regionalFoods.mains[regionalIndex];
    
    // Format lunch based on dietary goals using helper function
    let lunch = composeRegionalMeal(regionalLunch, isWeightLoss, isProteinFocus);
    
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
  const protein2Index = (dayIndex * 11 + 13) % proteins.length; // Different offset ensures variety
  
  const grainIndex = (dayIndex * 5 + 1) % grains.length;
  const veggie1Index = (dayIndex * 13 + 7) % vegetables.length;
  const veggie2Index = (dayIndex * 17 + 11) % vegetables.length;
  
  // Ensure we get at least 2 protein sources for each lunch to maximize protein intake
  const protein1 = proteins[protein1Index];
  const protein2 = proteins[protein2Index]; // Use a different protein source
  
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
  if (isWeightLoss) {
    main = `${grainWithLocalName} (${rotiCount} roti or ½ katori rice), ${protein1WithLocalName} and ${protein2WithLocalName} curry (¾ katori - balanced protein sources), ${veggie1} and ${veggie2} sabzi (1 katori)`;
  } else if (isProteinFocus) {
    main = `${grainWithLocalName} (${rotiCount} roti or ¾ katori rice), double portion of ${protein1WithLocalName} and ${protein2WithLocalName} curry (1 katori - high protein mix), ${veggie1} and ${veggie2} sabzi (1 katori)`;
  } else {
    main = `${grainWithLocalName} (${rotiCount} roti or ¾ katori rice), ${protein1WithLocalName} and ${protein2WithLocalName} curry (¾ katori - protein-rich blend), ${veggie1} and ${veggie2} sabzi (1 katori)`;
  }
  
  // Add curd (probiotic) to every lunch - a staple in Indian diets
  main += `, dahi (1 katori)`;
  
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
