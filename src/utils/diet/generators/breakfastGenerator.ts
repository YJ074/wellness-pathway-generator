import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { getDryFruits } from '../data/dryFruits';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';
import { getFruitSources } from '../data/foodSources';
import { getStandardFruitPortion, getDailyNutsMixture } from '../helpers/portionHelpers';
import { getHealthBenefit } from '../helpers/healthBenefitsHelper';

// Enhanced helper to prevent duplicate additions to breakfast descriptions
// Now with comprehensive detection of all variations of food items
const preventDuplicateAdditions = (breakfast: string, addition: string): string => {
  // Case insensitive check for the exact addition
  const lowerBreakfast = breakfast.toLowerCase();
  const lowerAddition = addition.toLowerCase();
  
  if (lowerBreakfast.includes(lowerAddition)) {
    return breakfast;
  }
  
  // Extract the food name from the addition for more thorough checking
  const foodMatch = addition.match(/(?:with|and)\s+([A-Za-z\s]+)(?:\s+\(|\b)/i);
  if (foodMatch && foodMatch[1]) {
    const foodName = foodMatch[1].trim().toLowerCase();
    
    // Check for the food name in various formats
    if (lowerBreakfast.includes(`with ${foodName}`) || 
        lowerBreakfast.includes(`and ${foodName}`) || 
        lowerBreakfast.includes(` ${foodName} (`) ||
        lowerBreakfast.includes(`${foodName},`)) {
      return breakfast; // Food is already included in some form
    }
    
    // Check for food variations (e.g., singular/plural forms)
    const pluralFoodName = foodName.endsWith('s') ? foodName : `${foodName}s`;
    const singularFoodName = foodName.endsWith('s') ? foodName.slice(0, -1) : foodName;
    
    if (lowerBreakfast.includes(` ${pluralFoodName} (`) || 
        lowerBreakfast.includes(` ${singularFoodName} (`)) {
      return breakfast; // Food is already included in variant form
    }
  }
  
  // Otherwise add it with proper comma formatting
  return breakfast.endsWith(',') ? `${breakfast} ${addition}` : `${breakfast}, ${addition}`;
};

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
    
    // Add daily nuts mixture to every breakfast - but only once
    const dailyNuts = getDailyNutsMixture(dayIndex);
    
    // Ensure dailyNuts is not already included in breakfast
    if (!breakfast.toLowerCase().includes(dailyNuts.toLowerCase())) {
      breakfast = preventDuplicateAdditions(breakfast, `with ${dailyNuts}`);
    }
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(breakfast);
    breakfast += ` - (${healthBenefit})`;
    
    return breakfast;
  }
  
  let breakfastOptions = [
    'Vegetable Poha (1 katori) with dahi (1 small katori)',
    'Oats Idli (3 idli) with sambhar (1 katori)',
    'Vegetable Upma (1 katori) with a side of sprouts (1 small katori)',
    'Besan Chilla (2 chilla) with pudina chutney (2 chamach)',
    'Multigrain Dosa (2 dosa) with nariyal chutney (2 chamach)',
    'Masala Daliya (1 katori) with seasonal sabzi',
    'Ragi Dosa (2 dosa) with tamatar chutney (2 chamach)',
    'Vegetable Uttapam (2 uttapam) with sambar (1 katori)',
    'Moong Dal Cheela (2 cheela) with dahi (1 katori)',
    'Steamed Sprouts Dhokla (4 dhokla)',
    'Vegetable Daliya Khichdi (1 katori)',
    'Jowar Upma (1 katori) with seasonal sabzi',
    'Vegetable Poha (1 katori) with sabzi',
    'Brown Rice Idli (3 idli) with tamatar chutney (2 chamach)',
    'Bajra Roti (2 roti) with sabzi (1 katori)',
    'Kodo Millet Upma (1 katori) with nariyal chutney (2 chamach)',
    'Sattu Paratha (2 paratha) with dahi (1 katori)',
    'Sprouted Moong Chilla (2 chilla) with pudina chutney (2 chamach)',
    'Vegetable Dalia (1 katori) with badam milk (1 glass)',
    'Ragi Idli (3 idli) with tamatar sambar (1 katori)',
    'Bajra Khichdi (1 katori) with chaas (1 glass)',
    'Jowar Roti (2 roti) with sabzi (1 katori)',
    'Rajgira Porridge (1 katori) with seasonal fruits',
    'Kuttu Pancakes (2 pancakes) with shahad (1 chamach)',
    'Millet Upma (1 katori) with nariyal chutney (2 chamach)',
    'Millet Upma (1 katori) with sabzi (1 katori)',
    'Millet Dosa (2 dosa) with sambar (1 katori)',
    'Millet Porridge (1 katori) with mixed fruits'
  ];
  
  // Use a prime number offset to avoid repetition every 2 days
  // This creates a more varied pattern across the 75-day plan
  const variedDayIndex = (dayIndex * 5 + 3) % breakfastOptions.length;
  
  // Add fruit to breakfast 3-4 times a week (increased frequency since we're removing from lunch/dinner)
  if (dayIndex % 7 === 0 || dayIndex % 7 === 2 || dayIndex % 7 === 4 || dayIndex % 7 === 6) {
    // Include fruit with breakfast on days 0, 2, 4, and 6 of each week (4 days)
    const availableFruits = getFruitSources(undefined, allergies);
    
    // Use a different index calculation for fruits to avoid repetition
    const fruitIndex = (dayIndex * 3 + 7) % availableFruits.length;
    const seasonalFruit = availableFruits[fruitIndex];
    
    // Standardized fruit portion using our helper
    const fruitPortion = getStandardFruitPortion(seasonalFruit);
    
    breakfastOptions = breakfastOptions.map(breakfast => {
      // Use our enhanced duplicate prevention function
      const availableFruits = getFruitSources(undefined, allergies);
      const fruitIndex = (dayIndex * 3 + 7) % availableFruits.length;
      const seasonalFruit = availableFruits[fruitIndex];
      const fruitPortion = getStandardFruitPortion(seasonalFruit);
      
      return preventDuplicateAdditions(breakfast, `with ${seasonalFruit} ${fruitPortion}`);
    });
  }

  // Always add a daily nuts mixture to every breakfast (only once)
  const dailyNuts = getDailyNutsMixture(dayIndex);
  breakfastOptions = breakfastOptions.map(breakfast => {
    // Only add nuts if they're not already included (using our enhanced function)
    return preventDuplicateAdditions(breakfast, `with ${dailyNuts}`);
  });
  
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
    
    // Add fruit occasionally to egg breakfasts
    if (dayIndex % 7 === 1 || dayIndex % 7 === 5) {  // Days 1 and 5 of the week
      const availableFruits = getFruitSources(undefined, allergies);
      
      // Use a different index calculation for fruits to avoid repetition
      const fruitIndex = (dayIndex * 4 + 11) % availableFruits.length;
      const seasonalFruit = availableFruits[fruitIndex];
      
      // Standardized fruit portion
      const fruitPortion = getStandardFruitPortion(seasonalFruit);
      
      eggBreakfasts = eggBreakfasts.map(breakfast => {
        // Check if this fruit is already mentioned in the breakfast
        if (breakfast.includes(seasonalFruit)) {
          return breakfast;
        }
        return preventDuplicateAdditions(breakfast, `with ${seasonalFruit} ${fruitPortion}`);
      });
    }
    
    // Always add daily nuts mixture to egg breakfasts (only once)
    eggBreakfasts = eggBreakfasts.map(breakfast => {
      // Only add nuts if they're not already included
      return eggBreakfasts.includes(dailyNuts) ? breakfast : preventDuplicateAdditions(breakfast, `with ${dailyNuts}`);
    });
    
    if (allergies) {
      eggBreakfasts = filterAllergies(eggBreakfasts, allergies);
    }
    
    // Use a varied index for egg breakfasts, but only on certain days
    if (eggBreakfasts.length && dayIndex % 4 === 0) {
      // Use a prime number offset to ensure better variety
      const variedEggIndex = (dayIndex * 3 + 5) % eggBreakfasts.length;
      let breakfast = eggBreakfasts[variedEggIndex];
      
      // For egg breakfasts, we need to especially ensure probiotics as they naturally lack them
      // Only add if not already present
      const hasProbiotics = breakfast.includes('Curd') || breakfast.includes('dahi') || 
                           breakfast.includes('Yogurt') || breakfast.includes('Kombucha');
      
      if (!hasProbiotics) {
        breakfast = enrichWithProbiotics(breakfast, dayIndex, true);
      }
      
      // Add health benefit
      const healthBenefit = getHealthBenefit(breakfast);
      breakfast += ` - (${healthBenefit})`;
      
      return breakfast;
    }
  }
  
  if (allergies) {
    breakfastOptions = filterAllergies(breakfastOptions, allergies);
  }
  
  // Get the breakfast option for today using our varied index
  let breakfast = breakfastOptions[variedDayIndex] || "";
  
  // Every even day, ensure probiotics; every odd day, ensure prebiotics
  // Only add if not already present
  const hasProbiotics = breakfast.toLowerCase().includes('curd') || 
                        breakfast.toLowerCase().includes('dahi') || 
                        breakfast.toLowerCase().includes('yogurt') || 
                        breakfast.toLowerCase().includes('kombucha');
                        
  const hasPrebiotics = breakfast.toLowerCase().includes('onion') || 
                        breakfast.toLowerCase().includes('garlic') || 
                        breakfast.toLowerCase().includes('banana') || 
                        breakfast.toLowerCase().includes('oats');
                        
  if (dayIndex % 2 === 0 && !hasProbiotics) {
    breakfast = enrichWithProbiotics(breakfast, dayIndex, true);
  } else if (dayIndex % 2 === 1 && !hasPrebiotics) {
    breakfast = enrichWithPrebiotics(breakfast, dayIndex, true);
  }
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(breakfast);
  breakfast += ` - (${healthBenefit})`;
  
  return breakfast;
};
