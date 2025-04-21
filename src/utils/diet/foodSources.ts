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
  const proteins: Record<DietaryPreference, string[]> = {
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
    'pure-jain': [
      // Strict Jain: NO sprouts, NO root vegetables, NO eggs, NO non-veg, NO mushrooms, NO fermented
      // Protein choices: dairy, legumes, pulses (only those allowed), NO soya, NO sprouts, NO beans that are typically sprouted
      'Paneer', 'Curd', 'Buttermilk', 'Toor Dal', 'Moong Dal', 'Masoor Dal', 'Urad Dal',
      'Chana Dal', 'Besan (Gram Flour)', 'Chickpeas' // All allowed pulses, NON-SPROUT only
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

export const getGrainSources = (dietaryPreference?: DietaryPreference) => {
  // For "pure-jain", avoid fermented grains (no idli/dosa batter), keep basic millets/grains
  if (dietaryPreference === 'pure-jain') {
    return [
      'Rice (Local Variety)', 'Broken Wheat', 'Jowar',
      'Bajra', 'Whole Wheat Atta', 'Poha',
      'Local Millet Varieties', 'Barley', 'Rice Flakes'
      // No suji (sometimes made into fermented foods), no mixed millet roti, no ragi (can be challenging if prepared as malt/fermented forms)
    ];
  }
  return [
    'Rice (Local Variety)', 'Broken Wheat', 'Ragi', 'Jowar',
    'Bajra', 'Whole Wheat Atta', 'Poha', 'Local Millet Varieties',
    'Suji (Semolina)', 'Barley', 'Mixed Millet Roti', 'Rice Flakes'
  ];
};

export const getVegetableSources = (dietaryPreference?: DietaryPreference) => {
  // Remove root vegetables and mushrooms for "pure-jain" and "jain"
  const base = [
    'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds', 'Cabbage', 'Cauliflower',
    'Carrots', 'Green Peas', 'Onions', 'Tomatoes', 'Potatoes', 'Local Beans',
    'Cucumber', 'Pumpkin', 'Radish', 'Beetroot'
  ];
  if (dietaryPreference === 'pure-jain' || dietaryPreference === 'jain') {
    // Strict list: No carrots, onions, potatoes, radish, beetroot, garlic, ginger; also no mushrooms, focus on gourds, cabbage, leafy greens, peas, tomatoes, cucumber, pumpkin, beans (no sprouted beans)
    return [
      'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds',
      'Cabbage', 'Cauliflower', 'Green Peas',
      'Tomatoes', 'Local Beans', 'Cucumber', 'Pumpkin'
      // All root vegetables and mushroom are removed!
    ];
  }
  if (dietaryPreference === 'sattvic') {
    // Sattvic: No onion, garlic, mushrooms, radish, beetroot, focus on fresh veggies
    return [
      'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds',
      'Cabbage', 'Cauliflower', 'Carrots', 'Green Peas',
      'Tomatoes', 'Local Beans', 'Cucumber', 'Pumpkin'
    ];
  }
  return base;
};

export const getFruitSources = (dietaryPreference?: DietaryPreference) => {
  // For "pure-jain" remove fruits that are NOT traditionally Jain permitted. For simplicity, restrict to some dried fruits/banana.
  if (dietaryPreference === 'pure-jain') {
    // Jain traditionally avoid certain fruits: restrict to bananas, dry fruit in moderation
    return ['Bananas', 'Raisins', 'Almonds (soaked)', 'Cashews (soaked)', 'Figs (soaked)'];
  }
  return [
    'Seasonal Local Fruits', 'Bananas', 'Local Varieties of Apples',
    'Oranges', 'Mosambi', 'Watermelon', 'Papaya',
    'Guava', 'Local Berries', 'Jamun (in season)',
    'Musk Melon', 'Indian Plums'
  ];
};

export const getSnackSources = (dietaryPreference: DietaryPreference, isWeightLoss: boolean) => {
  // For "pure-jain", restrict to roasted nuts, dairy, and simple non-fermented options
  if (dietaryPreference === 'pure-jain') {
    return [
      'Roasted Chana', 'Roasted Peanuts', 'Homemade Poha',
      'Dahi (plain curd)', 'Homemade Buttermilk', 'Soaked Dry Fruits',
      'Lemon Water', 'Cucumber Slices'
    ];
  }
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
