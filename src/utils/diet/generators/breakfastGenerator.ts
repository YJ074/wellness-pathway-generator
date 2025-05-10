
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { getDryFruits } from '../data/dryFruits';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';
import { getFruitSources } from '../data/foodSources';

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
    let breakfast = isWeightLoss ? `${regionalBreakfast} (smaller portion)` : regionalBreakfast;
    
    // Ensure inclusion of prebiotic/probiotic foods (but don't force it for regional specialties)
    breakfast = enrichWithPrebiotics(breakfast, dayIndex);
    breakfast = enrichWithProbiotics(breakfast, dayIndex);
    
    return breakfast;
  }
  
  let breakfastOptions = [
    'Vegetable Poha (1 katori) with dahi (1 small katori)',
    'Oats Idli (3 idlis) with sambhar (1 katori)',
    'Vegetable Upma (1 katori) with a side of sprouts (1 small katori)',
    'Besan Chilla (2 chillas) with pudina chutney (2 chamach)',
    'Multigrain Dosa (2 dosas) with nariyal chutney (2 chamach)',
    'Masala Daliya (1 katori) with seasonal sabzi',
    'Ragi Dosa (2 dosas) with tamatar chutney (2 chamach)',
    'Vegetable Uttapam (2 uttapams) with sambar (1 katori)',
    'Moong Dal Cheela (2 cheelas) with dahi (1 katori)',
    'Steamed Sprouts Dhokla (4 pieces)',
    'Vegetable Daliya Khichdi (1 katori)',
    'Jowar Upma (1 katori) with seasonal sabzi',
    'Quinoa Poha (1 katori) with sabzi',
    'Brown Rice Idli (3 idlis) with tamatar chutney (2 chamach)',
    'Bajra Roti (2 rotis) with sabzi (1 katori)',
    'Kodo Millet Upma (Kodra Upma - 1 katori) with nariyal chutney (2 chamach)',
    'Sattu Paratha (2 parathas) with dahi (1 katori)',
    'Sprouted Moong Chilla (2 chillas) with pudina chutney (2 chamach)',
    'Vegetable Dalia (Daliya - 1 katori) with badam milk (1 glass)',
    'Ragi Idli (3 idlis) with tamatar sambar (1 katori)',
    'Bajra Khichdi (1 katori) with chaas (1 glass)',
    'Jowar Roti (2 rotis) with sabzi (1 katori)',
    'Rajgira Porridge (1 katori) with seasonal fruits',
    'Kuttu Pancakes (2 pancakes) with shahad (1 chamach)',
    'Proso Millet Upma (Barri Upma - 1 katori) with nariyal chutney (2 chamach)',
    'Foxtail Millet Upma (Kangni Upma - 1 katori) with sabzi (1 katori)',
    'Little Millet Dosa (Kutki Dosa - 2 dosas) with sambar (1 katori)',
    'Barnyard Millet Porridge (Samvat Porridge - 1 katori) with mixed fruits'
  ];
  
  // Add fruit to breakfast 3-4 times a week (increased frequency since we're removing from lunch/dinner)
  if (dayIndex % 7 === 0 || dayIndex % 7 === 2 || dayIndex % 7 === 4 || dayIndex % 7 === 6) {
    // Include fruit with breakfast on days 0, 2, 4, and 6 of each week (4 days)
    const availableFruits = getFruitSources(undefined, allergies);
    const seasonalFruit = availableFruits[dayIndex % availableFruits.length];
    const dryFruits = getDryFruits(isWeightLoss, false, dayIndex);
    breakfastOptions = breakfastOptions.map(breakfast => 
      `${breakfast}, with ${seasonalFruit} (1 medium size) and ${dryFruits}`
    );
  } else if (dayIndex % 2 === 0) {
    // On other even days, just add dry fruits without fresh fruit
    const dryFruits = getDryFruits(isWeightLoss, false, dayIndex);
    breakfastOptions = breakfastOptions.map(breakfast => `${breakfast}, with ${dryFruits}`);
  }
  
  if (dietaryPreference === 'lacto-ovo-vegetarian' || dietaryPreference === 'non-vegetarian') {
    let eggBreakfasts = [
      'Anda Bhurji (2 ande) with multigrain roti (1 roti)',
      'Masala Omelette (2 ande) with sabzi stuffing',
      'Ubla Anda (2 ande) with sabzi sandwich (1)',
      'Anda aur Sabzi Wrap (1 whole wheat wrap)',
      'Anda Akuri (Parsi Style - 2 ande) with multigrain toast (1 slice)',
      'Anda Poha (1 katori) with sabzi',
      'Safed Anda Omelette (3 egg whites) with palak and herbs',
      'Anda Muffins (2 pieces) with sabzi',
      'Anda Upma (1 katori) with mixed sabzi'
    ];
    
    // Add fruit to egg breakfasts occasionally 
    if (dayIndex % 7 === 1 || dayIndex % 7 === 5) {  // Days 1 and 5 of the week
      const availableFruits = getFruitSources(undefined, allergies);
      const seasonalFruit = availableFruits[(dayIndex + 3) % availableFruits.length];
      eggBreakfasts = eggBreakfasts.map(breakfast => `${breakfast}, with ${seasonalFruit} (1 medium size)`);
    } else if (dayIndex % 2 === 0) {
      // On other even days, add dry fruits
      const dryFruits = getDryFruits(isWeightLoss, true, dayIndex);
      eggBreakfasts = eggBreakfasts.map(breakfast => `${breakfast}, with ${dryFruits}`);
    }
    
    if (allergies) {
      eggBreakfasts = filterAllergies(eggBreakfasts, allergies);
    }
    if (eggBreakfasts.length && dayIndex % 4 === 0) {
      let breakfast = eggBreakfasts[dayIndex % eggBreakfasts.length];
      
      // For egg breakfasts, we need to especially ensure probiotics as they naturally lack them
      breakfast = enrichWithProbiotics(breakfast, dayIndex, true);
      
      return breakfast;
    }
  }
  
  if (allergies) {
    breakfastOptions = filterAllergies(breakfastOptions, allergies);
  }
  
  // Get the breakfast option for today and ensure prebiotic/probiotic inclusion
  let breakfast = breakfastOptions[dayIndex % breakfastOptions.length] || "";
  
  // Every even day, ensure probiotics; every odd day, ensure prebiotics
  if (dayIndex % 2 === 0) {
    breakfast = enrichWithProbiotics(breakfast, dayIndex, true);
  } else {
    breakfast = enrichWithPrebiotics(breakfast, dayIndex, true);
  }
  
  return breakfast;
};
