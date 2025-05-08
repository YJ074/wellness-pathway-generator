
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

// New helper to map regions to regional foods
export const getRegionalFoods = (region?: string): { breakfast: string[], mains: string[], snacks: string[] } => {
  const defaultRegion = {
    breakfast: [],
    mains: [],
    snacks: []
  };
  
  const regionalFoods: Record<string, { breakfast: string[], mains: string[], snacks: string[] }> = {
    'north': {
      breakfast: [
        'Aloo Paratha with Curd',
        'Chole Bhature (small portion)',
        'Bedmi Puri with Aloo Sabzi',
        'Paneer Paratha with Mint Chutney',
        'Amritsari Kulcha with Chole'
      ],
      mains: [
        'Rajma Chawal',
        'Dal Makhani with Jeera Rice',
        'Kadhi Pakora with Rice',
        'Sarson ka Saag with Makki Roti',
        'Chana Masala with Kulcha'
      ],
      snacks: [
        'Dahi Bhalla',
        'Aloo Tikki Chaat',
        'Samosa with Tamarind Chutney',
        'Paneer Pakora',
        'Mathri with Achaar'
      ]
    },
    'south': {
      breakfast: [
        'Masala Dosa with Sambar and Coconut Chutney',
        'Idli with Podi and Coconut Chutney',
        'Appam with Vegetable Stew',
        'Rava Upma with Coconut Chutney',
        'Puttu with Kadala Curry'
      ],
      mains: [
        'Sambar Rice with Papad',
        'Bisi Bele Bath',
        'Curd Rice with Pickle',
        'Avial with Kerala Rice',
        'Rasam with Rice and Pappu'
      ],
      snacks: [
        'Medu Vada with Sambar',
        'Murukku',
        'Mysore Bonda',
        'Thattai',
        'Banana Chips'
      ]
    },
    'east': {
      breakfast: [
        'Luchi with Aloo Dum',
        'Puri with Cholar Dal',
        'Radhaballabhi with Aloo Tarkari',
        'Kochuri with Aloo Curry',
        'Dhuska with Ghugni'
      ],
      mains: [
        'Fish Curry with Rice',
        'Dalma with Rice',
        'Bengali Style Khichdi',
        'Posto Bora with Rice',
        'Machher Jhol with Rice'
      ],
      snacks: [
        'Singara (Bengali Samosa)',
        'Jhaal Muri',
        'Ghugni Chaat',
        'Nimki',
        'Bengali Mishti (Sandesh)'
      ]
    },
    'west': {
      breakfast: [
        'Thepla with Curd',
        'Poha with Sev and Lemon',
        'Misal Pav',
        'Sabudana Khichdi',
        'Batata Poha with Farsan'
      ],
      mains: [
        'Pav Bhaji',
        'Undhiyu with Puris',
        'Gujarati Kadhi with Rice',
        'Surti Dal with Rice',
        'Vegetable Thalipeeth'
      ],
      snacks: [
        'Khandvi',
        'Dhokla with Chutney',
        'Fafda with Jalebi',
        'Sev Khamani',
        'Khakhra with Chundo'
      ]
    },
    'central': {
      breakfast: [
        'Poha with Jalebi',
        'Indori Namkeen',
        'Khopra Pak with Milk',
        'Dal Bafla',
        'Dahi Vada with Aloo Bhujia'
      ],
      mains: [
        'Bhutte ka Kees',
        'Chakki ki Shaak with Roti',
        'Aaloo Mangodi',
        'Kadaknath Curry with Rice',
        'Bhopali Gosht with Roti'
      ],
      snacks: [
        'Bhutte ka Kees',
        'Malpua',
        'Khasta Kachori',
        'Palak Namkeen',
        'Laapta (Sweet)'
      ]
    },
    'northeast': {
      breakfast: [
        'Pitha with Tea',
        'Chura with Dahi',
        'Paknam (Steamed Herbs)',
        'Singju (Mixed Vegetable Salad)',
        'Aloo Pitika with Rice'
      ],
      mains: [
        'Assamese Fish Curry with Rice',
        'Bamboo Shoot Fry with Rice',
        'Smoked Pork with Axone',
        'Black Rice with Vegetable Stew',
        'Bai (Mizo Dal)'
      ],
      snacks: [
        'Momos with Chutney',
        'Pakora with Bamboo Shoot',
        'Perok (Naga Bread)',
        'Singju (Raw Papaya Salad)',
        'Black Rice Kheer'
      ]
    }
  };
  
  return region && regionalFoods[region.toLowerCase()] ? regionalFoods[region.toLowerCase()] : defaultRegion;
};

// New array of dry fruits
const dryFruitsList = [
  'Almonds (5-6)',
  'Walnuts (2-3 halves)',
  'Cashews (5-6)',
  'Raisins (1 tbsp)',
  'Dried Figs (1-2)',
  'Dried Apricots (2-3)',
  'Mixed Nuts (1 tbsp)',
  'Pistachios (10-12)',
  'Dates (1-2)',
  'Flaxseeds (1 tsp)',
  'Pumpkin Seeds (1 tbsp)',
  'Sunflower Seeds (1 tbsp)',
  'Chia Seeds (1 tsp)',
  'Sesame Seeds (1 tsp)',
  'Melon Seeds (1 tbsp)'
];

// Enhanced function to get dry fruits with portion control
export const getDryFruits = (isWeightLoss: boolean, highProtein: boolean, dayIndex: number): string => {
  // Use modulo to cycle through the list
  const selectedDryFruit = dryFruitsList[dayIndex % dryFruitsList.length];
  
  // If weight loss, include fewer items with precise portion control
  if (isWeightLoss) {
    return `${selectedDryFruit} (limited portion)`;
  }
  
  // For high protein goals, emphasize protein-rich nuts
  if (highProtein) {
    const proteinRichOptions = ['Almonds (8-10)', 'Walnuts (4-5 halves)', 'Pistachios (15-20)', 'Pumpkin Seeds (2 tbsp)'];
    return proteinRichOptions[dayIndex % proteinRichOptions.length];
  }
  
  // For regular plans, include a variety
  return selectedDryFruit;
};

export const getProteinSources = (dietaryPreference: DietaryPreference, allergies?: string) => {
  const proteins: Record<DietaryPreference, string[]> = {
    'lacto-vegetarian': [
      'Paneer', 'Toor Dal', 'Chana Dal', 'Moong Dal', 'Masoor Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)', 'Sattu',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts', 
      'Quinoa', 'Greek Yogurt', 'Cottage Cheese', 
      'Kala Chana', 'White Beans', 'Urad Dal', 'Moth Beans'
    ],
    'lacto-ovo-vegetarian': [
      'Paneer', 'Eggs', 'Toor Dal', 'Chana Dal', 'Moong Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)', 'Egg Whites',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts', 
      'Quinoa', 'Greek Yogurt', 'Boiled Eggs', 'Egg Bhurji',
      'Kala Chana', 'White Beans', 'Urad Dal', 'Moth Beans'
    ],
    'pure-vegetarian': [
      'Paneer', 'Soya Chunks', 'Mixed Sprouts', 'Chana Dal', 'Moong Dal',
      'Rajma', 'Toor Dal', 'Masoor Dal', 'Urad Dal', 'Sattu',
      'Peanuts', 'Besan (Gram Flour)', 'Chana', 'Whole Moong',
      'Quinoa', 'Tofu', 'Tempeh', 'Hemp Seeds', 
      'Kala Chana', 'White Beans', 'Moth Beans'
    ],
    'jain': [
      'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Soya Products', 'Dried Beans', 'Peanuts', 'Mixed Sprouts',
      'Chickpeas', 'Whole Moong', 'Besan (Gram Flour)',
      'Rajma', 'White Beans', 'Quinoa', 'Hemp Seeds',
      'Paneer (without animal rennet)'
    ],
    'pure-jain': [
      // Strict Jain: NO sprouts, NO root vegetables, NO eggs, NO non-veg, NO mushrooms, NO fermented
      'Paneer (without animal rennet)', 'Curd', 'Buttermilk', 'Toor Dal', 
      'Moong Dal', 'Masoor Dal', 'Urad Dal', 'Chana Dal', 
      'Besan (Gram Flour)', 'Chickpeas', 'Rajma',
      'White Beans', 'Quinoa', 'Hemp Seeds', 'Peanuts',
      'Dry Fruits (assorted and soaked)'
    ],
    'sattvic': [
      'Paneer', 'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Mixed Sprouts', 'Buttermilk', 'Peanuts', 'Whole Moong',
      'Dried Fruits (in moderation)', 'Sprouted Grains', 'Cow Milk',
      'Fresh Yogurt', 'Ghee', 'Organic Honey', 'Fresh Cottage Cheese',
      'Kheer', 'White Beans', 'Quinoa', 'Amaranth'
    ],
    'non-vegetarian': [
      'Eggs', 'Chicken (local variety)', 'Sardines', 'Indian Mackerel',
      'Local Fish Varieties', 'Paneer', 'Dal Makhani', 'Rajma',
      'Chana', 'Moong Dal', 'Toor Dal', 'Mixed Sprouts',
      'Lean Mutton', 'Farm-Raised Prawns', 'Rohu Fish',
      'Grilled Chicken Tikka', 'Egg Whites', 'Greek Yogurt',
      'Tandoori Fish', 'Free-Range Eggs'
    ]
  };
  return filterAllergies(proteins[dietaryPreference] || proteins['lacto-vegetarian'], allergies);
};

export const getGrainSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  const allGrains = dietaryPreference === 'pure-jain' ? [
      'Rice (Local Variety)', 'Broken Wheat', 'Jowar',
      'Bajra', 'Whole Wheat Atta', 'Poha',
      'Local Millet Varieties', 'Barley', 'Rice Flakes',
      'White Rice', 'Red Rice', 'Barnyard Millet (Samvat)',
      'Little Millet (Kutki)', 'Amaranth (Rajgira)',
      'Buckwheat (Kuttu)', 'Quinoa'
    ] : [
      'Rice (Local Variety)', 'Broken Wheat', 'Ragi', 'Jowar',
      'Bajra', 'Whole Wheat Atta', 'Poha', 'Local Millet Varieties',
      'Suji (Semolina)', 'Barley', 'Mixed Millet Roti', 'Rice Flakes',
      'Brown Rice', 'Black Rice', 'Red Rice', 'Wild Rice',
      'Foxtail Millet (Kangni)', 'Little Millet (Kutki)',
      'Amaranth (Rajgira)', 'Buckwheat (Kuttu)', 'Quinoa'
    ];
  return filterAllergies(allGrains, allergies);
};

export const getVegetableSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  let base: string[] = [
    'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds', 'Cabbage', 'Cauliflower',
    'Carrots', 'Green Peas', 'Onions', 'Tomatoes', 'Potatoes', 'Local Beans',
    'Cucumber', 'Pumpkin', 'Radish', 'Beetroot', 'Broccoli', 'Capsicum',
    'Bottle Gourd (Lauki)', 'Ridge Gourd (Turai)', 'Snake Gourd', 'Cluster Beans (Gawar)',
    'Ivy Gourd (Tindora)', 'Okra (Bhindi)', 'Drumstick (Moringa)',
    'Turnip', 'Colocasia Leaves', 'Amaranth Leaves', 'Mustard Leaves',
    'Fenugreek Leaves', 'Curry Leaves'
  ];
  if (dietaryPreference === 'pure-jain' || dietaryPreference === 'jain') {
    base = [
      'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds',
      'Cabbage', 'Cauliflower', 'Green Peas', 'Tomatoes',
      'Local Beans', 'Cucumber', 'Pumpkin', 'Capsicum',
      'Bottle Gourd (Lauki)', 'Ridge Gourd (Turai)', 'Snake Gourd',
      'Cluster Beans (Gawar)', 'Ivy Gourd (Tindora)',
      'Okra (Bhindi)', 'Amaranth Leaves', 'Fenugreek Leaves'
    ];
  } else if (dietaryPreference === 'sattvic') {
    base = [
      'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds',
      'Cabbage', 'Cauliflower', 'Carrots', 'Green Peas',
      'Tomatoes', 'Local Beans', 'Cucumber', 'Pumpkin',
      'Bottle Gourd (Lauki)', 'Ash Gourd', 'Ridge Gourd (Turai)',
      'Snake Gourd', 'Cluster Beans (Gawar)', 'Banana Stem',
      'Amaranth Leaves', 'Drumstick (Moringa)', 'Curry Leaves'
    ];
  }
  return filterAllergies(base, allergies);
};

export const getFruitSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  const fruits = dietaryPreference === 'pure-jain'
    ? ['Bananas', 'Raisins', 'Almonds (soaked)', 'Cashews (soaked)', 'Figs (soaked)',
       'Apples (without seeds)', 'Mangoes', 'Papaya (ripened)',
       'Pomegranate', 'Chickoo', 'Guava', 'Pears']
    : [
        'Seasonal Local Fruits', 'Bananas', 'Local Varieties of Apples',
        'Oranges', 'Mosambi', 'Watermelon', 'Papaya',
        'Guava', 'Local Berries', 'Jamun (in season)',
        'Musk Melon', 'Indian Plums', 'Mangoes (seasonal)',
        'Pineapple', 'Pomegranate', 'Chickoo', 'Custard Apple',
        'Wood Apple', 'Jackfruit', 'Star Fruit', 'Lychee (seasonal)',
        'Amla (Indian Gooseberry)', 'Ber (Indian Jujube)',
        'Bael Fruit', 'Karonda', 'Sitaphal (Sugar-apple)'
      ];
  return filterAllergies(fruits, allergies);
};

export const getSnackSources = (dietaryPreference: DietaryPreference, isWeightLoss: boolean, allergies?: string) => {
  let baseSnacks = dietaryPreference === 'pure-jain'
    ? [
        'Roasted Chana', 'Roasted Peanuts', 'Homemade Poha',
        'Dahi (plain curd)', 'Homemade Buttermilk', 'Soaked Dry Fruits',
        'Lemon Water', 'Cucumber Slices', 'Makhana (Fox Nuts)',
        'Dry Fruit Ladoo', 'Fruit Salad', 'Coconut Water'
      ]
    : [
        'Roasted Chana', 'Puffed Rice', 'Roasted Peanuts',
        'Homemade Poha', 'Boiled Sprouts', 'Seasonal Fruit',
        'Buttermilk', 'Lemon Water', 'Homemade Chaas',
        'Makhana (Fox Nuts)', 'Roasted Seeds Mix',
        'Baked Vegetable Chips', 'Cucumber Raita',
        'Multigrain Dhokla', 'Vegetable Cutlets',
        'Ragi Cookies', 'Oats Chilla', 'Palak Patta Chaat',
        'Homemade Trail Mix', 'Steamed Sweet Corn'
      ];
  return filterAllergies(baseSnacks, allergies);
};
