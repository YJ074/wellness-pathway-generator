
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';

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
    if (isWeightLoss) {
      return `${regionalLunch} (reduced portion for weight management)`;
    } else if (isProteinFocus) {
      return `${regionalLunch} with extra protein portion`;
    }
    return regionalLunch;
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
    grainWithLocalName = 'Rice Flakes (Poha)';
  } else if (grain.includes('Broken Wheat') && !grain.includes('(')) {
    grainWithLocalName = 'Broken Wheat Porridge (Daliya)';
  } else if (grain.includes('Millet') && !grain.includes('(')) {
    if (grain.includes('Foxtail')) {
      grainWithLocalName = 'Foxtail Millet Roti (Kangni Roti)';
    } else if (grain.includes('Pearl')) {
      grainWithLocalName = 'Pearl Millet Roti (Bajra Roti)';
    } else if (grain.includes('Finger')) {
      grainWithLocalName = 'Finger Millet Roti (Ragi Roti)';
    } else if (grain.includes('Little')) {
      grainWithLocalName = 'Little Millet Roti (Kutki Roti)';
    } else if (grain.includes('Barnyard')) {
      grainWithLocalName = 'Barnyard Millet Khichdi (Samvat Khichdi)';
    } else if (grain.includes('Kodo')) {
      grainWithLocalName = 'Kodo Millet Roti (Kodra Roti)';
    } else if (grain.includes('Proso')) {
      grainWithLocalName = 'Proso Millet Upma (Barri Upma)';
    }
  }

  // Explicitly include carbs in the form of roti/rice/bread in each meal description
  let main = "";
  if (isWeightLoss) {
    main = `${grainWithLocalName} (1/2 cup or 1 roti), ${proteinWithLocalName} curry (3/4 cup), ${veggie1} and ${veggie2} sabzi (1 cup), small bowl of curd (Dahi - 1/2 cup)`;
  } else if (isProteinFocus) {
    main = `${grainWithLocalName} (3/4 cup or 2 rotis), double portion of ${proteinWithLocalName} curry (1 cup), ${veggie1} and ${veggie2} sabzi (1 cup), bowl of curd (Dahi - 1 cup)`;
  } else {
    main = `${grainWithLocalName} (3/4 cup or 2 rotis), ${proteinWithLocalName} curry (3/4 cup), ${veggie1} and ${veggie2} sabzi (1 cup), bowl of curd (Dahi - 1 cup)`;
  }
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
