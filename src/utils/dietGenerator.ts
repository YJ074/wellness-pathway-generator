interface DietPlan {
  days: Array<{
    day: number;
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  }>;
}

const getProteinSources = (dietaryPreference: string) => {
  const proteins = {
    'vegetarian': [
      'Paneer', 'Tofu', 'Chana (Chickpeas)', 'Rajma (Kidney Beans)', 
      'Moong Dal', 'Toor Dal', 'Sprouts', 'Greek Yogurt',
      'Cottage Cheese', 'Soy Chunks', 'Masoor Dal', 'Urad Dal'
    ],
    'eggitarian': [
      'Eggs', 'Paneer', 'Tofu', 'Chana (Chickpeas)', 'Rajma (Kidney Beans)', 
      'Moong Dal', 'Toor Dal', 'Sprouts', 'Greek Yogurt',
      'Cottage Cheese', 'Soy Chunks', 'Masoor Dal', 'Urad Dal'
    ],
    'vegan': [
      'Tofu', 'Tempeh', 'Seitan', 'Chana (Chickpeas)', 'Rajma (Kidney Beans)', 
      'Moong Dal', 'Toor Dal', 'Sprouts', 'Soy Yogurt',
      'Soy Chunks', 'Masoor Dal', 'Urad Dal', 'Quinoa', 'Edamame'
    ],
    'pescatarian': [
      'Fish', 'Shrimp', 'Tofu', 'Chana (Chickpeas)', 'Rajma (Kidney Beans)',
      'Greek Yogurt', 'Cottage Cheese', 'Salmon', 'Tuna',
      'Sardines', 'Mackerel', 'Trout'
    ],
    'gluten-free': [
      'Chicken', 'Fish', 'Eggs', 'Tofu', 'Quinoa',
      'Rice Protein', 'Buckwheat', 'Amaranth',
      'Certified GF Oats', 'Legumes'
    ],
    'keto': [
      'Chicken', 'Fish', 'Eggs', 'Beef', 'Pork',
      'Turkey', 'Duck', 'Lamb', 'Cottage Cheese',
      'Greek Yogurt', 'Hard Cheese'
    ]
  };
  
  return proteins[dietaryPreference as keyof typeof proteins] || proteins['vegetarian'];
};

const getGrainSources = () => {
  return [
    'Brown Rice', 'Quinoa', 'Bajra Roti', 'Jowar Roti', 'Ragi Roti',
    'Whole Wheat Roti', 'Oats', 'Millet', 'Brown Rice Poha',
    'Whole Wheat Bread', 'Multigrain Dosa', 'Red Rice'
  ];
};

const getVegetableSources = () => {
  const commonVegetables = [
    'Spinach', 'Methi (Fenugreek Leaves)', 'Palak (Spinach)', 'Broccoli',
    'Lauki (Bottle Gourd)', 'Bhindi (Okra)', 'Baingan (Eggplant)',
    'Capsicum (Bell Pepper)', 'Carrots', 'Tomatoes', 'Cabbage',
    'Cauliflower', 'Green Beans', 'Peas', 'Beetroot', 'Pumpkin',
    'Zucchini', 'Asparagus', 'Brussels Sprouts', 'Kale'
  ];

  return commonVegetables;
};

const getFruitSources = () => {
  return [
    'Apple', 'Banana', 'Papaya', 'Watermelon', 'Muskmelon',
    'Orange', 'Guava', 'Pomegranate', 'Pineapple', 'Strawberry',
    'Kiwi', 'Mango (in moderation)', 'Jamun', 'Chikoo'
  ];
};

const getSnackSources = (dietaryPreference: string, isWeightLoss: boolean) => {
  const baseSnacks = [
    'Roasted Chana', 'Makhana (Fox Nuts)', 'Murmura (Puffed Rice)',
    'Sprouts Chaat', 'Cucumber Slices', 'Carrot Sticks',
    'Homemade Hummus', 'Buttermilk', 'Vegetable Soup'
  ];
  
  if (dietaryPreference === 'eggitarian' && !isWeightLoss) {
    baseSnacks.push('Boiled Egg');
  }
  
  return baseSnacks;
};

const generateBreakfast = (dayIndex: number, dietaryPreference: string, isWeightLoss: boolean) => {
  const breakfastOptions = [
    'Vegetable Poha with curd',
    'Oats Idli with sambhar',
    'Vegetable Upma with a side of sprouts',
    'Besan Chilla with mint chutney',
    'Multigrain Dosa with coconut chutney',
    'Masala Daliya (Broken Wheat) with vegetables',
    'Ragi Dosa with tomato chutney',
    'Vegetable Uttapam with sambar',
    'Moong Dal Cheela with curd',
    'Steamed Sprouts Dhokla',
    'Vegetable Daliya Khichdi',
    'Jowar Upma with vegetables',
    'Quinoa Poha with vegetables',
    'Brown Rice Idli with tomato chutney',
    'Bajra Roti with vegetable curry'
  ];
  
  if (dietaryPreference === 'eggitarian') {
    const eggBreakfasts = [
      'Egg Bhurji with multigrain roti',
      'Masala Omelette with vegetable stuffing',
      'Boiled Eggs with vegetable sandwich',
      'Egg and Vegetable Wrap'
    ];
    
    if (dayIndex % 4 === 0) {
      return eggBreakfasts[dayIndex % eggBreakfasts.length];
    }
  }
  
  return breakfastOptions[dayIndex];
};

const generateLunch = (
  dayIndex: number, 
  proteins: string[], 
  grains: string[], 
  vegetables: string[], 
  isWeightLoss: boolean,
  isProteinFocus: boolean
) => {
  const protein = proteins[dayIndex % proteins.length];
  const grain = grains[dayIndex % grains.length];
  const veggie1 = vegetables[dayIndex % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 5) % vegetables.length];
  
  if (isWeightLoss) {
    return `${grain} (small portion), ${protein} curry, ${veggie1} and ${veggie2} stir-fry, small bowl of curd`;
  } else if (isProteinFocus) {
    return `${grain}, double portion of ${protein} curry, ${veggie1} and ${veggie2} stir-fry, bowl of curd`;
  }
  return `${grain}, ${protein} curry, ${veggie1} and ${veggie2} stir-fry, bowl of curd`;
};

const generateDinner = (
  dayIndex: number, 
  proteins: string[], 
  vegetables: string[], 
  isWeightLoss: boolean,
  isProteinFocus: boolean
) => {
  const protein = proteins[(dayIndex + 3) % proteins.length];
  const veggie1 = vegetables[(dayIndex + 2) % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 8) % vegetables.length];
  
  if (isWeightLoss) {
    return `${protein} curry (light), ${veggie1} and ${veggie2} sabzi, small bowl of buttermilk`;
  } else if (isProteinFocus) {
    return `${protein} curry (generous portion), ${veggie1} and ${veggie2} sabzi, bowl of buttermilk`;
  }
  return `${protein} curry, ${veggie1} and ${veggie2} sabzi, bowl of buttermilk`;
};

const generateSnacks = (
  dayIndex: number, 
  snacks: string[], 
  fruits: string[], 
  isWeightLoss: boolean
) => {
  const snack = snacks[dayIndex % snacks.length];
  const fruit = fruits[dayIndex % fruits.length];
  
  if (isWeightLoss) {
    return `${fruit} OR ${snack} (choose one per day)`;
  }
  return `${fruit} AND ${snack}`;
};

export const generateDietPlan = (
  dietaryPreference: string,
  fitnessGoal: string,
  age: number,
  weight: number
): DietPlan => {
  const days = [];
  const proteinFocus = fitnessGoal === 'muscle-gain';
  const calorieReduction = fitnessGoal === 'weight-loss';
  
  const proteins = getProteinSources(dietaryPreference);
  const grains = getGrainSources();
  const vegetables = getVegetableSources();
  const fruits = getFruitSources();
  const snacks = getSnackSources(dietaryPreference, calorieReduction);
  
  for (let i = 1; i <= 75; i++) {
    const dayIndex = (i - 1) % 15;
    
    const breakfast = generateBreakfast(dayIndex, dietaryPreference, calorieReduction);
    const lunch = generateLunch(dayIndex, proteins, grains, vegetables, calorieReduction, proteinFocus);
    const dinner = generateDinner(dayIndex, proteins, vegetables, calorieReduction, proteinFocus);
    const daySnacks = generateSnacks(dayIndex, snacks, fruits, calorieReduction);
    
    days.push({
      day: i,
      breakfast,
      lunch,
      dinner,
      snacks: daySnacks
    });
  }
  
  return { days };
};
