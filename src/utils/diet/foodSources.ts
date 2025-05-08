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

// Helper: remove ingredients based on allergy list (case-insensitive, strippable)
const stripAndLower = (s: string) => s.trim().toLowerCase();
const parseAllergies = (allergies?: string) =>
  allergies?.split(',')
    .map(stripAndLower)
    .filter(Boolean)
    || [];

const isAllergic = (allergiesArr: string[], food: string) =>
  allergiesArr.some(a => food.toLowerCase().includes(a));

// Substitution helpers for common allergy cases
const suggestSubstitutes = (item: string, allergiesArr: string[]): string => {
  // If dairy
  if (["paneer", "curd", "buttermilk", "milk", "yogurt"].some(d => item.toLowerCase().includes(d)) && allergiesArr.includes('dairy')) {
    // Culturally relevant: tofu, coconut milk, cashew yogurt, etc.
    if (item.toLowerCase().includes('paneer')) return "Tofu (dairy-free)";
    if (item.toLowerCase().includes('curd') || item.toLowerCase().includes('yogurt') || item.toLowerCase().includes('buttermilk'))
      return "Coconut Yogurt (dairy-free)";
    return "Plant-based substitute";
  }
  if (item.toLowerCase().includes('egg') && allergiesArr.includes('egg')) return "Scrambled Tofu";
  if (item.toLowerCase().includes('chicken') && allergiesArr.includes('chicken')) return "Grilled Mushrooms";
  if (item.toLowerCase().includes('peanut') && allergiesArr.includes('peanuts')) return "Roasted Chickpeas";
  if ((item.toLowerCase().includes('wheat') || item.toLowerCase().includes('roti')) && allergiesArr.includes('gluten')) {
    // Gluten subs
    if (item.toLowerCase().includes('roti')) return "Jowar/Bajra/Millet Roti";
    return "Rice (gluten-free)";
  }
  return item;
};

export const filterAllergies = (list: string[], allergies?: string): string[] => {
  const allergyArr = parseAllergies(allergies);
  return list
    .map(item => isAllergic(allergyArr, item) ? suggestSubstitutes(item, allergyArr) : item)
    .filter(item => {
      // Only keep if after substitute it's not still an allergen
      return !isAllergic(allergyArr, item);
    });
};

export const getProteinSources = (dietaryPreference: DietaryPreference, allergies?: string) => {
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
    ]
  };
  return filterAllergies(proteins[dietaryPreference] || proteins['lacto-vegetarian'], allergies);
};

export const getGrainSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  const allGrains = dietaryPreference === 'pure-jain' ? [
      'Rice (Local Variety)', 'Broken Wheat', 'Jowar',
      'Bajra', 'Whole Wheat Atta', 'Poha',
      'Local Millet Varieties', 'Barley', 'Rice Flakes'
    ] : [
      'Rice (Local Variety)', 'Broken Wheat', 'Ragi', 'Jowar',
      'Bajra', 'Whole Wheat Atta', 'Poha', 'Local Millet Varieties',
      'Suji (Semolina)', 'Barley', 'Mixed Millet Roti', 'Rice Flakes'
    ];
  return filterAllergies(allGrains, allergies);
};

export const getVegetableSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  let base: string[] = [
    'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds', 'Cabbage', 'Cauliflower',
    'Carrots', 'Green Peas', 'Onions', 'Tomatoes', 'Potatoes', 'Local Beans',
    'Cucumber', 'Pumpkin', 'Radish', 'Beetroot'
  ];
  if (dietaryPreference === 'pure-jain' || dietaryPreference === 'jain') {
    base = [
      'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds',
      'Cabbage', 'Cauliflower', 'Green Peas',
      'Tomatoes', 'Local Beans', 'Cucumber', 'Pumpkin'
    ];
  } else if (dietaryPreference === 'sattvic') {
    base = [
      'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds',
      'Cabbage', 'Cauliflower', 'Carrots', 'Green Peas',
      'Tomatoes', 'Local Beans', 'Cucumber', 'Pumpkin'
    ];
  }
  return filterAllergies(base, allergies);
};

export const getFruitSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  const fruits = dietaryPreference === 'pure-jain'
    ? ['Bananas', 'Raisins', 'Almonds (soaked)', 'Cashews (soaked)', 'Figs (soaked)']
    : [
        'Seasonal Local Fruits', 'Bananas', 'Local Varieties of Apples',
        'Oranges', 'Mosambi', 'Watermelon', 'Papaya',
        'Guava', 'Local Berries', 'Jamun (in season)',
        'Musk Melon', 'Indian Plums'
      ];
  return filterAllergies(fruits, allergies);
};

export const getSnackSources = (dietaryPreference: DietaryPreference, isWeightLoss: boolean, allergies?: string) => {
  let baseSnacks = dietaryPreference === 'pure-jain'
    ? [
        'Roasted Chana', 'Roasted Peanuts', 'Homemade Poha',
        'Dahi (plain curd)', 'Homemade Buttermilk', 'Soaked Dry Fruits',
        'Lemon Water', 'Cucumber Slices'
      ]
    : [
        'Roasted Chana', 'Puffed Rice', 'Roasted Peanuts',
        'Homemade Poha', 'Boiled Sprouts', 'Seasonal Fruit',
        'Buttermilk', 'Lemon Water', 'Homemade Chaas'
      ];
  return filterAllergies(baseSnacks, allergies);
};
