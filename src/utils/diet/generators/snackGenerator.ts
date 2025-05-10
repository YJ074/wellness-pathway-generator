
import { filterAllergies } from '../helpers/allergyHelpers';
import { getDryFruits } from '../data/dryFruits';
import { getRegionalFoods } from '../data/regionalFoods';
import { getFruitSources } from '../data/foodSources';

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
  
  // Get a list of all available fruits
  const availableFruits = getFruitSources(undefined, allergies);
  
  // Create fruit-based snack options for variety
  const fruitSnacks = availableFruits.map(fruit => `${fruit} (1 small/medium piece)`);
  
  // Add more fruit options to mid-morning snacks
  midMorningOptions = [...midMorningOptions, ...fruitSnacks.slice(0, 8)];
  
  // Add dry fruits to mid-morning snack on even-numbered days
  if (dayIndex % 2 === 1) {
    const dryFruits = getDryFruits(isWeightLoss, false, dayIndex);
    midMorningOptions = midMorningOptions.map(snack => `${snack}, with ${dryFruits}`);
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
  
  // Get all available fruits
  const availableFruits = getFruitSources(undefined, allergies);
  
  // Create fruit-based evening snacks
  const fruitSnacks = availableFruits.map(fruit => 
    `${fruit} (1 small piece)${dayIndex % 3 === 0 ? ' with a sprinkle of rock salt and black pepper' : ''}`
  );
  
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
  
  // Add fresh fruit options to evening snacks (emphasizing seasonal fruits)
  // Only use some of the fruit options to maintain variety
  const selectedFruitSnacks = fruitSnacks.slice(0, 10);
  
  // Combine all options, with fruit-based options appearing frequently in the rotation
  eveningSnackOptions = [...eveningSnackOptions, ...additionalSnacks, ...selectedFruitSnacks];
  
  if (allergies) {
    eveningSnackOptions = filterAllergies(eveningSnackOptions, allergies);
  }
  
  // Ensure fruit appears very frequently (5-6 times a week)
  // If today is not a fruit day (1 day out of 7), select from non-fruit options
  if (dayIndex % 7 === 6) {
    // This is the one day per week without fruit as snack
    // Filter out fruit-based options for this day
    const nonFruitOptions = eveningSnackOptions.filter(option => 
      !selectedFruitSnacks.includes(option)
    );
    return nonFruitOptions[(dayIndex + 3) % nonFruitOptions.length] || "";
  } else {
    // For the other 6 days of the week, prioritize fruit options
    // On even days, always pick from fruit options
    if (dayIndex % 2 === 0) {
      return selectedFruitSnacks[(dayIndex + 3) % selectedFruitSnacks.length] || "";
    }
    // On remaining odd days, use the full rotation (which includes fruits)
    return eveningSnackOptions[(dayIndex + 3) % eveningSnackOptions.length] || "";
  }
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
