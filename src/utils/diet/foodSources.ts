import { DietaryPreference } from './types';

// Utility to limit soya source appearances
export const limitSoyaInDietDays = (proteinList: string[], totalDays: number, maxPerDays: number = 30): string[] => {
  // Soya related protein names (case insensitive)
  const soyaKeywords = ["soya", "soya chunks", "soya products"];
  // Find the soya item in the list
  const soyaItem = proteinList.find(p =>
    soyaKeywords.some(keyword => p.toLowerCase().includes(keyword))
  );
  if (!soyaItem) {
    // No soya in protein list, return repeated as is
    return Array(totalDays).fill(null).map((_, idx) => proteinList[idx % proteinList.length]);
  }

  // Build the protein plan for totalDays, placing soya only once in any rolling maxPerDays
  const out: string[] = [];
  let lastSoyaDay = -maxPerDays; // Negative so it can be placed at index 0
  let soyaUsed = 0;
  let proteinIdx = 0;

  for (let day = 0; day < totalDays; day++) {
    // If enough days since last soya, and we haven't used soya too recently, try place soya
    if (day - lastSoyaDay >= maxPerDays && soyaUsed < Math.floor(totalDays / maxPerDays) + 1) {
      out.push(soyaItem);
      lastSoyaDay = day;
      soyaUsed++;
    } else {
      // Pick the next non-soya protein
      let nonSoyaProtein = proteinList[proteinIdx % proteinList.length];
      let cycleProteins = 0;
      // Skip over soya
      while (nonSoyaProtein === soyaItem && cycleProteins < proteinList.length) {
        proteinIdx++;
        nonSoyaProtein = proteinList[proteinIdx % proteinList.length];
        cycleProteins++;
      }
      out.push(nonSoyaProtein);
      proteinIdx++;
    }
  }
  return out;
};

export const getProteinSources = (dietaryPreference: DietaryPreference) => {
  const proteins = {
    'lacto-vegetarian': [
      'Paneer', 'Toor Dal', 'Chana Dal', 'Moong Dal', 'Masoor Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts'
    ],
    'lacto-ovo-vegetarian': [
      'Paneer', 'Eggs', 'Toor Dal', 'Chana Dal', 'Moong Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts'
    ],
    'pure-vegetarian': [
      'Paneer', 'Soya Chunks', 'Mixed Sprouts', 'Chana Dal', 'Moong Dal',
      'Rajma', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Peanuts', 'Besan (Gram Flour)', 'Chana', 'Whole Moong'
    ],
    'jain': [
      'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Soya Products', 'Dried Beans', 'Peanuts', 'Mixed Sprouts',
      'Chickpeas', 'Whole Moong', 'Besan (Gram Flour)'
    ],
    'sattvic': [
      'Paneer', 'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Mixed Sprouts', 'Buttermilk', 'Peanuts', 'Whole Moong',
      'Dried Fruits (in moderation)', 'Sprouted Grains'
    ],
    'non-vegetarian': [
      'Eggs', 'Chicken (local variety)', 'Sardines', 'Indian Mackerel',
      'Local Fish Varieties', 'Paneer', 'Dal Makhani', 'Rajma',
      'Chana', 'Moong Dal', 'Toor Dal', 'Mixed Sprouts'
    ],
    'eggitarian': [
      'Eggs', 'Mixed Sprouts', 'Paneer', 'Moong Dal',
      'Toor Dal', 'Chana Dal', 'Peanuts', 'Besan (Gram Flour)'
    ]
  };
  
  return proteins[dietaryPreference] || proteins['lacto-vegetarian'];
};

export const getGrainSources = () => [
  'Rice (Local Variety)', 'Broken Wheat', 'Ragi', 'Jowar',
  'Bajra', 'Whole Wheat Atta', 'Poha', 'Local Millet Varieties',
  'Suji (Semolina)', 'Barley', 'Mixed Millet Roti', 'Rice Flakes'
];

export const getVegetableSources = () => [
  'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds',
  'Cabbage', 'Cauliflower', 'Carrots', 'Green Peas',
  'Onions', 'Tomatoes', 'Potatoes', 'Local Beans',
  'Cucumber', 'Pumpkin', 'Radish', 'Beetroot'
];

export const getFruitSources = () => [
  'Seasonal Local Fruits', 'Bananas', 'Local Varieties of Apples',
  'Oranges', 'Mosambi', 'Watermelon', 'Papaya',
  'Guava', 'Local Berries', 'Jamun (in season)',
  'Musk Melon', 'Indian Plums'
];

export const getSnackSources = (dietaryPreference: DietaryPreference, isWeightLoss: boolean) => {
  const baseSnacks = [
    'Roasted Chana', 'Puffed Rice', 'Roasted Peanuts',
    'Homemade Poha', 'Boiled Sprouts', 'Seasonal Fruit',
    'Buttermilk', 'Lemon Water', 'Homemade Chaas'
  ];
  
  if (dietaryPreference === 'eggitarian' && !isWeightLoss) {
    baseSnacks.push('Boiled Egg');
  }
  
  return baseSnacks;
};
