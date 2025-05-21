// Structure for regional food data
export interface RegionalFoodData {
  breakfast: string[];
  mains: string[];
  snacks: string[];
}

// Map of regions to their foods
export const regionalFoodsData: Record<string, RegionalFoodData> = {
  'north': {
    breakfast: [
      'Aloo Paratha with Curd',
      'Chole Bhature (small portion)',
      'Bedmi Puri with Aloo Sabzi',
      'Paneer Paratha with Mint Chutney',
      'Amritsari Kulcha with Chole',
      'Poori with Aloo Tamatar Sabzi',
      'Methi Thepla with Dahi',
      'Stuffed Cheeni Paratha',
      'Aloo Puri with Kala Chana',
      'Rajma Toast Sandwich',
      'Punjabi Soya Masala with Laccha Paratha',
      'Dahi Kachori with Aloo Sabzi',
      'Palak Puri with Aloo Matar',
      'Sindhi Koki with Yogurt'
    ],
    mains: [
      'Rajma Chawal',
      'Dal Makhani with Jeera Rice',
      'Kadhi Pakora with Rice',
      'Sarson ka Saag with Makki Roti',
      'Chana Masala with Kulcha',
      'Butter Chicken with Naan',
      'Amritsari Paneer with Lachha Paratha',
      'Kashmiri Rajma with Basmati Rice',
      'Punjabi Kadhi with Jeera Rice',
      'Aloo Gobhi with Missi Roti',
      'Paneer Butter Masala with Garlic Naan',
      'Soya Chaap Curry with Rumali Roti',
      'Himachali Madra with Saffron Rice',
      'Dum Aloo Punjabi with Whole Wheat Naan'
    ],
    snacks: [
      'Dahi Bhalla',
      'Aloo Tikki Chaat',
      'Samosa with Tamarind Chutney',
      'Paneer Pakora',
      'Mathri with Achaar',
      'Punjabi Pinni',
      'Gur Para',
      'Besan Sev',
      'Bikaneri Bhujia',
      'Moong Dal Kachori',
      'Kurmura Chaat',
      'Roasted Makhana with Spices',
      'Papdi Chaat with Yogurt Drizzle',
      'Paneer Tikka Bites'
    ]
  },
  'south': {
    breakfast: [
      'Masala Dosa with Sambar and Coconut Chutney',
      'Idli with Podi and Coconut Chutney',
      'Appam with Vegetable Stew',
      'Rava Upma with Coconut Chutney',
      'Puttu with Kadala Curry',
      'Pongal with Coconut Chutney and Sambar',
      'Semiya Upma with Lemon',
      'Pesarattu with Ginger Chutney',
      'Neer Dosa with Coconut Milk Curry',
      'Bisi Bele Bath',
      'Medu Vada with Sambar and Chutney',
      'Uttapam with Tomato Onion Topping',
      'Akki Roti with Coconut Chutney',
      'Godhuma Dosa with Peanut Chutney'
    ],
    mains: [
      'Sambar Rice with Papad',
      'Bisi Bele Bath',
      'Curd Rice with Pickle',
      'Avial with Kerala Rice',
      'Rasam with Rice and Pappu',
      'Hyderabadi Vegetable Biryani',
      'Kerala Fish Curry with Red Rice',
      'Andhra Gongura Pachadi with Rice',
      'Tamil Nadu Poriyal with Rasam and Rice',
      'Malabar Parotta with Vegetable Salna',
      'Kori Gassi with Neer Dosa',
      'Koottu Curry with Red Rice',
      'Karuvattu Kuzhambu with White Rice',
      'Pulihora with Papad and Raita'
    ],
    snacks: [
      'Medu Vada with Sambar',
      'Murukku',
      'Mysore Bonda',
      'Thattai',
      'Banana Chips',
      'Karuveppilai Podi (Curry Leaves Powder)',
      'Mullu Murukku',
      'Rava Kesari',
      'Kai Murukku',
      'Ribbon Pakoda',
      'Kara Boondhi',
      'Sweet Pongal',
      'Vazhaipoo Vadai',
      'Vettu Cake'
    ]
  },
  'east': {
    breakfast: [
      'Luchi with Aloo Dum',
      'Puri with Cholar Dal',
      'Radhaballabhi with Aloo Tarkari',
      'Kochuri with Aloo Curry',
      'Dhuska with Ghugni',
      'Bengali Khejur Gurer Roti',
      'Koraishutir Kachori with Aloo Dam',
      'Posta Dana Paratha with Begun Bhaja',
      'Komolar Chhokka with Luchi',
      'Aloo Paratha with Bengali Tomato Chutney',
      'Matar Kachori with Jaggery Tea',
      'Bhapa Pitha with Nolen Gur',
      'Mughlai Paratha with Aloo Tarkari',
      'Chitoi Pitha with Tomato Chutney'
    ],
    mains: [
      'Fish Curry with Rice',
      'Dalma with Rice',
      'Bengali Style Khichdi',
      'Posto Bora with Rice',
      'Machher Jhol with Rice',
      'Shukto with Steamed Rice',
      'Aloo Posto with Luchi',
      'Dhokar Dalna with Rice',
      'Chingri Malai Curry with Steamed Rice',
      'Kosha Mangsho with Luchi',
      'Lau Ghonto with Rice',
      'Macher Kalia with Plain Rice',
      'Labra with Rice',
      'Jhinge Posto with Roti'
    ],
    snacks: [
      'Singara (Bengali Samosa)',
      'Jhaal Muri',
      'Ghugni Chaat',
      'Nimki',
      'Bengali Mishti (Sandesh)',
      'Puchka (Bengali Panipuri)',
      'Telebhaja (Bengali Fritters)',
      'Aloor Chop',
      'Mochar Chop',
      'Phuluri',
      'Beguni',
      'Pitha with Nolen Gur',
      'Narkel Nadu',
      'Khasta Kachori with Aloo Dum'
    ]
  },
  'west': {
    breakfast: [
      'Thepla with Curd',
      'Poha with Sev and Lemon',
      'Misal Pav',
      'Sabudana Khichdi',
      'Batata Poha with Farsan',
      'Khandvi with Green Chutney',
      'Methi Thepla with Pickles',
      'Fafda Jalebi with Papaya Sabzi',
      'Surti Sev Khamani',
      'Thalipeeth with White Butter',
      'Dhokla with Green Chutney',
      'Kakdi Batata Poha',
      'Vagharela Rotlo with Garlic Chutney',
      'Handvo with Coriander Chutney'
    ],
    mains: [
      'Pav Bhaji',
      'Undhiyu with Puris',
      'Gujarati Kadhi with Rice',
      'Surti Dal with Rice',
      'Vegetable Thalipeeth',
      'Maharashtrian Amti with Rice',
      'Dal Baati Churma',
      'Kathiyawadi Ringana Vatana Nu Shaak with Rotla',
      'Gatta Curry with Steamed Rice',
      'Kolhapuri Vegetables with Bhakri',
      'Bharli Vangi with Jowar Bhakri',
      'Malvani Fish Curry with Rice',
      'Matki Usal with Pav',
      'Gujarati Dal Dhokli'
    ],
    snacks: [
      'Khandvi',
      'Dhokla with Chutney',
      'Fafda with Jalebi',
      'Sev Khamani',
      'Khakhra with Chundo',
      'Methi Muthia',
      'Dahi Vada',
      'Bhakarwadi',
      'Chakli',
      'Masala Chivda',
      'Dabeli',
      'Patra',
      'Lilva Kachori',
      'Ragda Patties'
    ]
  },
  'central': {
    breakfast: [
      'Poha with Jalebi',
      'Indori Namkeen',
      'Khopra Pak with Milk',
      'Dal Bafla',
      'Dahi Vada with Aloo Bhujia',
      'Bedai with Aloo Sabzi',
      'Mawa Kachori with Saffron Milk',
      'Moong Dal Cheela with Tomato Chutney',
      'Seviyan with Milk and Dry Fruits',
      'Sabudana Vada with Coconut Chutney',
      'Aaloo Paratha with Mango Pickle',
      'Chila with Spicy Mint Chutney',
      'Jalebi Fafda with Green Chutney',
      'Paneer Stuffed Paratha with Curd'
    ],
    mains: [
      'Bhutte ka Kees',
      'Chakki ki Shaak with Roti',
      'Aaloo Mangodi',
      'Kadaknath Curry with Rice',
      'Bhopali Gosht with Roti',
      'Daal Bati Churma',
      'Indori Poha with Sev',
      'Palak Paneer with Tandoori Roti',
      'Malwa Kofta Curry with Steamed Rice',
      'Bundelkhandi Kadhi with Rice',
      'Bafla with Lehsun Chutney',
      'Bharwan Bengan with Paratha',
      'Gatte ki Sabzi with Missi Roti',
      'Firozabadi Dal with Jeera Rice'
    ],
    snacks: [
      'Bhutte ka Kees',
      'Malpua',
      'Khasta Kachori',
      'Palak Namkeen',
      'Laapta (Sweet)',
      'Balusahi',
      'Anarse',
      'Mohanthal',
      'Indori Sev',
      'Pheni with Rabri',
      'Chakki ke Patode',
      'Moong Dal Halwa',
      'Jodhpuri Mirchi Vada',
      'Peda'
    ]
  },
  'northeast': {
    breakfast: [
      'Pitha with Tea',
      'Chura with Dahi',
      'Paknam (Steamed Herbs)',
      'Singju (Mixed Vegetable Salad)',
      'Aloo Pitika with Rice',
      'Putharo with Black Tea',
      'Poora with Chicken Curry',
      'Kheer with Black Rice',
      'Luchi with Aloo Bhaja',
      'Til Pitha with Hot Milk',
      'Koat Pitha with Gur',
      'Jolpan with Curd',
      'Assam Tea with Pitha and Gur',
      'Manipuri Tan with Eromba'
    ],
    mains: [
      'Assamese Fish Curry with Rice',
      'Bamboo Shoot Fry with Rice',
      'Smoked Pork with Axone',
      'Black Rice with Vegetable Stew',
      'Bai (Mizo Dal)',
      'Iromba with Manipuri Black Rice',
      'Aloo Pitika with Rice',
      'Nagaland Pork with Bamboo Shoots',
      'Manipuri Fish Curry with Rice',
      'Tripuri Mui Borok with Rice',
      'Jadoh (Meghalaya Rice Dish)',
      'Sikkim Gundruk Soup with Rice',
      'Arunachali Pehak with Rice',
      'Pork with Fermented Soybean and Rice'
    ],
    snacks: [
      'Momos with Chutney',
      'Pakora with Bamboo Shoot',
      'Perok (Naga Bread)',
      'Singju (Raw Papaya Salad)',
      'Black Rice Kheer',
      'Assamese Pithas',
      'Naap (Bamboo Shoot Delicacy)',
      'Gyathuk (Noodle Soup)',
      'Zan (Millet Porridge)',
      'Zutho (Rice Beer Snacks)',
      'Khapse (Arunachal Fritters)',
      'Pukhlein (Meghalaya Rice Fritters)',
      'Mizo Bekang-um',
      'Manipuri Kanghou'
    ]
  },
  'andhra': {
    breakfast: [
      'Pesarattu (Green Moong Dosa)',
      'Idli with Tomato Chutney',
      'Ragi Sangati',
      'Upma with Mixed Vegetables',
      'Godhuma Rava Pongal',
      'Kanda Poha',
      'Vegetable Semiya Upma',
      'Minappa Dosa (Urad Dal Dosa)',
      'Oats Pesarattu',
      'Millet Idli'
    ],
    mains: [
      'Pulusu with Bottle Gourd',
      'Bendakaya Vepudu (Okra Stir Fry)',
      'Tomato Pappu',
      'Gongura Pappu (Sorrel Leaf Dal)',
      'Kakarakaya Fry (Bitter Gourd)',
      'Dondakaya Vepudu (Ivy Gourd Stir Fry)',
      'Vegetable Kurma with Red Rice',
      'Chickpea Sundal Curry',
      'Aloo Methi Curry',
      'Moong Dal Tadka',
      'Ragi Mudde with Sambar',
      'Brown Rice with Avakaya Pachadi',
      'Brinjal Tomato Curry',
      'Sprouted Green Gram Curry',
      'Spinach Dal (Palakura Pappu)',
      'Snake Gourd Curry',
      'Tamarind Millet Upma',
      'Bottle Gourd Kofta Curry (Steamed)',
      'Cabbage Poriyal',
      'Steamed Lauki Curry'
    ],
    snacks: [
      'Boiled Sweet Corn with Lemon',
      'Sundal (Boiled Chickpeas)',
      'Baked Senagalu (Chana Snack)',
      'Air-Fried Banana Chips',
      'Dry Fruit Ladoo (No Sugar)',
      'Ragi Biscuits (Homemade)',
      'Baked Moong Dal Vada',
      'Steamed Corn Chaat',
      'Vegetable Soup with Moringa',
      'Masala Foxnuts (Makhana)',
      'Sprouted Salad with Pomegranate',
      'Cucumber Mint Sticks',
      'Oats & Jaggery Bites',
      'Roasted Almond Mix',
      'Low-Oil Puffed Rice Mix',
      'Carrot Sticks with Yogurt Dip',
      'Oats Vegetable Cutlets',
      'Steamed Millet Balls',
      'Green Gram Sprout Chaat',
      'Grilled Tofu Cubes'
    ]
  }
};

// Helper function to get regional foods
export const getRegionalFoods = (region?: string): RegionalFoodData => {
  const defaultRegion = {
    breakfast: [],
    mains: [],
    snacks: []
  };
  
  if (!region) return defaultRegion;
  
  return regionalFoodsData[region.toLowerCase()] || defaultRegion;
};
