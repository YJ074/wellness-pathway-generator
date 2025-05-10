
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';

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
    const regionalLunch = regionalFoods.mains[dayIndex % regionalFoods.mains.length];
    let lunch = "";
    if (isWeightLoss) {
      lunch = `${regionalLunch} (smaller portion)`;
    } else if (isProteinFocus) {
      lunch = `${regionalLunch} with extra protein portion`;
    } else {
      lunch = regionalLunch;
    }
    
    // For regional specialties, gently introduce pre/probiotics without forcing them
    lunch = enrichWithPrebiotics(lunch, dayIndex);
    lunch = enrichWithProbiotics(lunch, dayIndex);
    
    return lunch;
  }
  
  const protein = proteins[dayIndex % proteins.length];
  // Make sure we use a grain in every meal for consistent carb balance
  const grain = grains[dayIndex % grains.length];
  const veggie1 = vegetables[dayIndex % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 5) % vegetables.length];
  
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
  
  // Ensure local names for grains too with specific preparation method
  let grainWithLocalName = grain;
  if (grain.includes('Rice Flakes') && !grain.includes('(')) {
    grainWithLocalName = 'Poha (Rice Flakes)';
  } else if (grain.includes('Broken Wheat') && !grain.includes('(')) {
    grainWithLocalName = 'Daliya (Broken Wheat Porridge)';
  } else if (grain.includes('Millet') && !grain.includes('(')) {
    if (grain.includes('Foxtail')) {
      grainWithLocalName = 'Kangni Roti (Foxtail Millet Roti)';
    } else if (grain.includes('Pearl')) {
      grainWithLocalName = 'Bajra Roti (Pearl Millet Roti)';
    } else if (grain.includes('Finger')) {
      grainWithLocalName = 'Ragi Roti (Finger Millet Roti)';
    } else if (grain.includes('Little')) {
      grainWithLocalName = 'Kutki Roti (Little Millet Roti)';
    } else if (grain.includes('Barnyard')) {
      grainWithLocalName = 'Samvat Khichdi (Barnyard Millet Khichdi)';
    } else if (grain.includes('Kodo')) {
      grainWithLocalName = 'Kodra Roti (Kodo Millet Roti)';
    } else if (grain.includes('Proso')) {
      grainWithLocalName = 'Barri Upma (Proso Millet Upma)';
    }
  }

  // Explicitly include carbs in the form of roti/rice/bread in each meal description
  let main = "";
  if (isWeightLoss) {
    main = `${grainWithLocalName} (1 roti or ½ katori), ${proteinWithLocalName} curry (¾ katori), ${veggie1} and ${veggie2} sabzi (1 katori)`;
  } else if (isProteinFocus) {
    main = `${grainWithLocalName} (2 rotis or ¾ katori), double portion of ${proteinWithLocalName} curry (1 katori), ${veggie1} and ${veggie2} sabzi (1 katori)`;
  } else {
    main = `${grainWithLocalName} (2 rotis or ¾ katori), ${proteinWithLocalName} curry (¾ katori), ${veggie1} and ${veggie2} sabzi (1 katori)`;
  }
  
  // Add curd (probiotic) to every lunch - a staple in Indian diets
  main += `, dahi (1 katori)`;
  
  // For days not already featuring prebiotics, add some to the meal
  main = enrichWithPrebiotics(main, dayIndex);
  
  if (allergies) {
    // Remove or swap allergy terms inside lunch text (rough approach)
    const allergiesArr = allergies.split(',').map(x=>x.trim().toLowerCase());
    allergiesArr.forEach(a => {
      if (main.toLowerCase().includes(a)) {
        main = main.replace(new RegExp('\\b' + a + '\\b', 'gi'), '');
      }
    });
  }
  return main;
};
