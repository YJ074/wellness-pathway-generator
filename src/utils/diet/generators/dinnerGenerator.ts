
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';

// Helper function to determine if a fruit is a "big fruit" that should be measured in bowls
const isBigFruit = (fruitName: string): boolean => {
  const bigFruits = [
    'watermelon', 'muskmelon', 'pineapple', 'papaya', 'jackfruit',
    'cantaloupe', 'honeydew', 'tarbuja', 'kharbooja', 'papita', 'kathal'
  ];
  
  return bigFruits.some(fruit => 
    fruitName.toLowerCase().includes(fruit.toLowerCase())
  );
};

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
    const regionalDinner = regionalFoods.mains[(dayIndex + 2) % regionalFoods.mains.length];
    let dinner = "";
    if (isWeightLoss) {
      dinner = `${regionalDinner} (lighter portion for evening)`;
    } else if (isProteinFocus) {
      dinner = `${regionalDinner} with extra protein`;
    } else {
      dinner = regionalDinner;
    }
    
    // Gently introduce pre/probiotics to regional specialties
    dinner = enrichWithPrebiotics(dinner, dayIndex);
    dinner = enrichWithProbiotics(dinner, dayIndex);
    
    return dinner;
  }
  
  const protein = proteins[(dayIndex + 3) % proteins.length];
  const veggie1 = vegetables[(dayIndex + 2) % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 8) % vegetables.length];
  
  // Add local names to protein if it doesn't already have them
  let proteinWithLocalName = protein;
  if (protein === 'Paneer' && !protein.includes('(')) {
    proteinWithLocalName = 'Paneer (Indian Cottage Cheese)';
  } else if (protein === 'Tofu' && !protein.includes('(')) {
    proteinWithLocalName = 'Tofu (Soya Paneer)';
  } else if (protein === 'Chana' && !protein.includes('(')) {
    proteinWithLocalName = 'Chana (Chickpeas)';
  } else if (protein === 'Rajma' && !protein.includes('(')) {
    proteinWithLocalName = 'Rajma (Kidney Beans)';
  }
  
  // Include explicit carb portion in every dinner (rotis or rice)
  let main = "";
  if (isWeightLoss) {
    main = `${proteinWithLocalName} curry (¾ katori), ${veggie1} and ${veggie2} sabzi (1 katori), Roti (1 roti) or Bhura Chaval (¼ katori Brown Rice)`;
  } else if (isProteinFocus) {
    main = `${proteinWithLocalName} curry (1 katori), ${veggie1} and ${veggie2} sabzi (1 katori), Roti (2 rotis) or Bhura Chaval (½ katori Brown Rice)`;
  } else {
    main = `${proteinWithLocalName} curry (¾ katori), ${veggie1} and ${veggie2} sabzi (1 katori), Roti (2 rotis) or Bhura Chaval (½ katori Brown Rice)`;
  }
  
  // Always include buttermilk (probiotic) with dinner
  main += `, chaas (1 glass)`;
  
  // For days that need additional prebiotics, add them to dinner
  if (dayIndex % 3 === 0) {
    main = enrichWithPrebiotics(main, dayIndex, true);
  }
  
  if (allergies) {
    main = filterAllergies([main], allergies)[0] || "";
  }
  return main;
};
