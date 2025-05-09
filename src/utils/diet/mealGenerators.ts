import { DietaryPreference } from './types';
import { 
  getProteinSources, 
  getGrainSources, 
  getVegetableSources, 
  getFruitSources, 
  getSnackSources,
  getDryFruits,
  getRegionalFoods,
  filterAllergies
} from './foodSources';

// Add allergies arg to all functions. If allergies provided, filter options accordingly.

export const generateBreakfast = (
  dayIndex: number,
  dietaryPreference: string,
  isWeightLoss: boolean,
  allergies?: string,
  region?: string
) => {
  // Check if we have regional specialties first
  const regionalFoods = getRegionalFoods(region);
  
  // If region is specified and has breakfast items, use them occasionally (every 3rd day)
  if (region && regionalFoods.breakfast.length > 0 && dayIndex % 3 === 0) {
    const regionalBreakfast = regionalFoods.breakfast[dayIndex % regionalFoods.breakfast.length];
    
    // Add portion control for weight loss
    if (isWeightLoss) {
      return `${regionalBreakfast} (reduced portion)`;
    }
    return regionalBreakfast;
  }
  
  let breakfastOptions = [
    'Vegetable Poha (1 cup) with curd (1/2 cup)',
    'Oats Idli (3 pieces) with sambhar (1/2 cup)',
    'Vegetable Upma (1 cup) with a side of sprouts (1/2 cup)',
    'Besan Chilla (2 pieces) with mint chutney (2 tbsp)',
    'Multigrain Dosa (2 pieces) with coconut chutney (2 tbsp)',
    'Masala Daliya (1 cup, Broken Wheat) with vegetables',
    'Ragi Dosa (2 pieces) with tomato chutney (2 tbsp)',
    'Vegetable Uttapam (2 pieces) with sambar (1/2 cup)',
    'Moong Dal Cheela (2 pieces) with curd (1/2 cup)',
    'Steamed Sprouts Dhokla (4 pieces)',
    'Vegetable Daliya Khichdi (1 cup)',
    'Jowar Upma (1 cup) with seasonal vegetables',
    'Quinoa Poha (3/4 cup) with vegetables',
    'Brown Rice Idli (3 pieces) with tomato chutney (2 tbsp)',
    'Bajra Roti (2 pieces) with vegetable curry (1/2 cup)',
    'Millet Upma (1 cup) with coconut chutney (2 tbsp)',
    'Sattu Paratha (2 pieces) with curd (1/2 cup)',
    'Sprouted Moong Chilla (2 pieces) with pudina chutney (2 tbsp)',
    'Vegetable Dalia (1 cup) with almond milk (1/2 cup)',
    'Ragi Idli (3 pieces) with tomato sambar (1/2 cup)',
    'Bajra Khichdi (1 cup) with buttermilk (1 glass)',
    'Jowar Dosa (2 pieces) with vegetable kurma (1/2 cup)',
    'Amaranth Porridge (1 cup) with seasonal fruits',
    'Buckwheat Pancakes (2) with honey (1 tsp)',
    'Quinoa Upma (1 cup) with coconut chutney (2 tbsp)'
  ];
  
  // Add dry fruits to breakfast occasionally (every 4th day)
  if (dayIndex % 4 === 0) {
    const dryFruits = getDryFruits(isWeightLoss, false, dayIndex);
    breakfastOptions = breakfastOptions.map(breakfast => `${breakfast}, with ${dryFruits}`);
  }
  
  if (dietaryPreference === 'lacto-ovo-vegetarian' || dietaryPreference === 'non-vegetarian') {
    let eggBreakfasts = [
      'Egg Bhurji (2 eggs) with multigrain roti (1 piece)',
      'Masala Omelette (2 eggs) with vegetable stuffing',
      'Boiled Eggs (2) with vegetable sandwich (1)',
      'Egg and Vegetable Wrap (1 whole wheat wrap)',
      'Egg Akuri (2 eggs) with multigrain toast (1 slice)',
      'Egg Poha (1 cup) with vegetables',
      'Egg White Omelette (3 egg whites) with spinach and herbs',
      'Egg Muffins (2) with vegetables',
      'Egg Upma (1 cup) with mixed vegetables'
    ];
    
    // Add dry fruits to egg breakfasts occasionally
    if (dayIndex % 4 === 0) {
      const dryFruits = getDryFruits(isWeightLoss, true, dayIndex);
      eggBreakfasts = eggBreakfasts.map(breakfast => `${breakfast}, with ${dryFruits}`);
    }
    
    if (allergies) {
      eggBreakfasts = filterAllergies(eggBreakfasts, allergies);
    }
    if (eggBreakfasts.length && dayIndex % 4 === 0) {
      return eggBreakfasts[dayIndex % eggBreakfasts.length];
    }
  }
  if (allergies) {
    breakfastOptions = filterAllergies(breakfastOptions, allergies);
  }
  return breakfastOptions[dayIndex % breakfastOptions.length] || "";
};

export const generateMidMorningSnack = (
  dayIndex: number, 
  snacks: string[], 
  fruits: string[], 
  isWeightLoss: boolean,
  allergies?: string
) => {
  let midMorningOptions = [
    'Seasonal fruit (1 medium)',
    'Buttermilk (1 glass)',
    'Roasted chana (1/4 cup)',
    'Apple slices (1 small apple) with a thin spread of peanut butter (1 tsp)',
    'Sprouts salad (1/2 cup)',
    'Plain yogurt (1/2 cup) with berries',
    'Handful of mixed nuts (10-12 pieces)',
    'Cucumber and carrot sticks (1 cup)',
    'Fresh coconut pieces (1/4 cup)',
    'Small bowl of makhana (fox nuts, 1/4 cup)'
  ];
  
  // Add dry fruits option
  const dryFruits = getDryFruits(isWeightLoss, false, dayIndex);
  
  // Every 3rd day offer dry fruits as a snack option
  if (dayIndex % 3 === 0) {
    midMorningOptions.push(dryFruits);
  }
  
  // Add more variety
  const additionalOptions = [
    'Handful of roasted pumpkin seeds (2 tbsp)',
    'Homemade lassi (1 small glass)',
    'Coconut water (1 glass)',
    'Ragi malt (1 glass)',
    'Beetroot juice (1 small glass)',
    'Homemade vegetable soup (1 small cup)',
    'Steamed sweet corn kernels (1/2 cup)',
    'Multigrain khakhra (2 pieces)',
    'Vegetable cutlet (1 small piece, baked)'
  ];
  
  // Integrate additional options
  midMorningOptions = [...midMorningOptions, ...additionalOptions];
  
  if (allergies) {
    midMorningOptions = filterAllergies(midMorningOptions, allergies);
  }
  return midMorningOptions[dayIndex % midMorningOptions.length] || "";
};

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
  const grain = grains[dayIndex % grains.length];
  const veggie1 = vegetables[dayIndex % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 5) % vegetables.length];
  
  // Occasionally add dry fruits (every 7th day)
  const dryFruitAddition = dayIndex % 7 === 0 ? `, with ${getDryFruits(isWeightLoss, isProteinFocus, dayIndex)}` : '';
  
  let main = "";
  if (isWeightLoss) {
    main = `${grain} (small portion, 1/2 cup), ${protein} curry (3/4 cup), ${veggie1} and ${veggie2} stir-fry (1 cup), small bowl of curd (1/2 cup)${dryFruitAddition}`;
  } else if (isProteinFocus) {
    main = `${grain} (3/4 cup), double portion of ${protein} curry (1 cup), ${veggie1} and ${veggie2} stir-fry (1 cup), bowl of curd (1 cup)${dryFruitAddition}`;
  } else {
    main = `${grain} (3/4 cup), ${protein} curry (3/4 cup), ${veggie1} and ${veggie2} stir-fry (1 cup), bowl of curd (1 cup)${dryFruitAddition}`;
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

export const generateEveningSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string,
  region?: string
) => {
  // Check for regional snack options
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional snack options every 4th day if available
  if (region && regionalFoods.snacks.length > 0 && dayIndex % 4 === 0) {
    const regionalSnack = regionalFoods.snacks[dayIndex % regionalFoods.snacks.length];
    if (isWeightLoss) {
      return `${regionalSnack} (smaller portion)`;
    }
    return regionalSnack;
  }
  
  let eveningSnackOptions = [
    'Roasted makhana (1/4 cup)',
    'Vegetable cutlet (2 small pieces, baked)',
    'Multigrain dhokla (2 pieces)',
    'Roasted chana (1/4 cup) with chopped onions and tomatoes',
    'Masala puffed rice (1/2 cup)',
    'Steamed corn kernels (1/2 cup) with lemon and black salt',
    'Paneer tikka (4-5 small pieces, grilled)',
    'Peanut chaat (1/4 cup)',
    'Roasted sweet potato (1 small)',
    'Mixed vegetable soup (1 bowl)'
  ];
  
  // Add more variety with traditional Indian snacks
  const additionalSnacks = [
    'Kala chana chaat (1/2 cup)',
    'Sprouts bhel (3/4 cup)',
    'Mini idlis with sambar (4 pieces)',
    'Moong dal cheela (1 piece)',
    'Baked mathri (2 pieces)',
    'Steamed muthia (2 pieces)',
    'Roasted jowar puffs (1/2 cup)',
    'Cucumber and mint raita (1 small bowl)',
    'Spinach and oats tikki (2 small pieces)'
  ];
  
  // Add dry fruits occasionally (every 5th day)
  if (dayIndex % 5 === 0) {
    const dryFruits = getDryFruits(isWeightLoss, false, dayIndex);
    eveningSnackOptions.push(dryFruits);
  }
  
  // Combine all options
  eveningSnackOptions = [...eveningSnackOptions, ...additionalSnacks];
  
  if (allergies) {
    eveningSnackOptions = filterAllergies(eveningSnackOptions, allergies);
  }
  return eveningSnackOptions[(dayIndex + 3) % eveningSnackOptions.length] || "";
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
    if (isWeightLoss) {
      return `${regionalDinner} (light portion for evening)`;
    } else if (isProteinFocus) {
      return `${regionalDinner} with extra protein`;
    }
    return regionalDinner;
  }
  
  const protein = proteins[(dayIndex + 3) % proteins.length];
  const veggie1 = vegetables[(dayIndex + 2) % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 8) % vegetables.length];
  
  let main = "";
  if (isWeightLoss) {
    main = `${protein} curry (light, 3/4 cup), ${veggie1} and ${veggie2} sabzi (1 cup), roti (1 piece), small bowl of buttermilk (1 cup)`;
  } else if (isProteinFocus) {
    main = `${protein} curry (generous portion, 1 cup), ${veggie1} and ${veggie2} sabzi (1 cup), roti (2 pieces), bowl of buttermilk (1 cup)`;
  } else {
    main = `${protein} curry (3/4 cup), ${veggie1} and ${veggie2} sabzi (1 cup), roti (2 pieces), bowl of buttermilk (1 cup)`;
  }
  if (allergies) {
    const allergiesArr = allergies.split(',').map(x=>x.trim().toLowerCase());
    allergiesArr.forEach(a => {
      if (main.toLowerCase().includes(a)) {
        main = main.replace(new RegExp('\\b' + a + '\\b', 'gi'), '');
      }
    });
  }
  return main;
};

export const generateSnacks = (
  dayIndex: number, 
  snacks: string[], 
  fruits: string[], 
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Not directly used in generation pipeline above, but add allergies param for legacy compat
  let snack = snacks[dayIndex % snacks.length];
  let fruit = fruits[dayIndex % fruits.length];
  if (allergies) {
    snack = filterAllergies([snack], allergies)[0] || "";
    fruit = filterAllergies([fruit], allergies)[0] || "";
  }
  if (isWeightLoss) {
    return `${fruit} OR ${snack} (choose one per day)`;
  }
  return `${fruit} AND ${snack}`;
};
