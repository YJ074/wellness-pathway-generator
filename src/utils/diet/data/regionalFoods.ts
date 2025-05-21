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
  },
  'arunachal': {
    breakfast: [
      'Khura (Buckwheat Pancakes)',
      'Apong with Boiled Millet',
      'Chura Sabzi with Millet Flatbread',
      'Vegetable Boiled Egg Wrap',
      'Fermented Bamboo Shoot Porridge',
      'Red Rice Idli',
      'Steamed Tapioca with Herbs',
      'Millet Upma',
      'Tofu & Leafy Green Stir-fry',
      'Sweet Corn Millet Soup'
    ],
    mains: [
      'Thukpa with Vegetables',
      'No-oil Boiled Pork with Spinach',
      'Oying Vegetable Stew',
      'Bamboo Shoot and Mushroom Curry',
      'Red Rice with Fermented Soybean (Bekang)',
      'Boiled Fish with Roselle Leaves',
      'Chana Dal with Spinach',
      'Millet and Black Rice Khichdi',
      'Smoked Tofu Curry',
      'Steamed Veggies with Rice Grits',
      'Fermented Radish and Greens Curry',
      'Pumpkin & Mustard Greens Curry',
      'Cabbage Bamboo Stir Fry',
      'Wild Leaves with Lentils',
      'Boiled Chicken with Herbs',
      'Pumpkin Seed Chutney with Rice',
      'Boiled Jackfruit Seeds with Salt & Pepper',
      'Amaranth Leaf Curry',
      'Sweet Potato & Red Rice Stew',
      'Mixed Forest Veg Curry'
    ],
    snacks: [
      'Bamboo Shoot Pickle (Low Salt)',
      'Roasted Pumpkin Seeds',
      'Smoked Soy Nut Chaat',
      'Steamed Momos (Veg)',
      'Fermented Bamboo Stalk Salad',
      'Tofu Lettuce Wraps',
      'Dry Fruit & Seed Ladoo',
      'Steamed Tapioca Slices',
      'Black Rice Porridge Cups',
      'Foxnut Trail Mix',
      'Grilled Yam Cubes',
      'Chickpea Millet Patties',
      'Air-Fried Tofu Cubes',
      'Boiled Corn with Red Chili Flakes',
      'Carrot and Beet Chips (Baked)',
      'Sattu Energy Balls',
      'Cucumber & Radish Salad',
      'Boiled Soybeans with Lemon',
      'Buckwheat Snack Bars',
      'Ragi Banana Slices'
    ]
  },
  'chhattisgarh': {
    breakfast: [
      'Faraa (Steamed Rice Dumplings)',
      'Ragi Porridge',
      'Chana Dal Pancake',
      'Vegetable Cheela',
      'Moong Dal Idli',
      'Red Rice Poha',
      'Saag Bhaji with Bajra Roti',
      'Millet Dosa',
      'Boiled Gram Salad',
      'Cucumber Dal Pancakes'
    ],
    mains: [
      'Kodo Millet Khichdi',
      'Chaulai Saag Curry',
      'Tamarind Lentil Curry',
      'Baasi Bhaat with Curd (Fermented Rice)',
      'Aloo Baingan Curry',
      'Bottle Gourd & Lentil Stew',
      'Pumpkin and Mustard Curry',
      'Lauki Kofta (Steamed)',
      'Amaranth Leaf with Dal'
    ],
    snacks: [
      'Tilgur (Sesame Jaggery Balls)',
      'Rice Flour Chakli (Baked)',
      'Ragi Ladoo',
      'Boiled Peanut Salad',
      'Air-fried Banana Chips',
      'Foxnut Mix with Herbs',
      'Low-oil Dal Vada',
      'Vegetable Millet Puffs',
      'Sweet Potato Sticks',
      'Raw Papaya Chaat'
    ]
  },
  'assam': {
    breakfast: [
      'Bora Saul with Curd',
      'Pitha (Steamed Rice Cakes)',
      'Joha Rice Poha',
      'Black Sticky Rice Porridge',
      'Green Gram Dosa',
      'Red Rice Upma',
      'Bottle Gourd Chilla',
      'Vegetable Sira (Flattened Rice)',
      'Lai Xaak with Rice',
      'Sprouted Moong Rice Balls'
    ],
    mains: [
      'Ou Tenga Dal (Elephant Apple Lentils)',
      'Khar with Raw Papaya',
      'Vegetable Masor Tenga (Tangy Curry)',
      'Steamed Fish in Banana Leaf',
      'Pumpkin with Mustard Seeds',
      'Green Veg Stew with Rice',
      'Banana Flower Curry',
      'Bitter Gourd Tomato Curry',
      'Aloo Bilahi Pitika (Mashed Potato Tomato)',
      'Leafy Saag with Garlic'
    ],
    snacks: [
      'Steamed Pitha',
      'Chira Doi Gur (Poha, Curd & Jaggery)',
      'Roasted Rice Flour Ladoo',
      'Foxnut & Peanut Chaat',
      'Cucumber Chutney Cups',
      'Dry Roasted Black Chana',
      'Lettuce Wraps',
      'Baked Sweet Potato Chips',
      'Red Rice Puffed Snacks',
      'Black Sesame Bars'
    ]
  },
  'bihar': {
    breakfast: [
      'Sattu Paratha (Dry Roasted Gram Flour Filling)',
      'Ragi Daliya (Porridge)',
      'Litti without Ghee',
      'Vegetable Chokha with Millet Roti',
      'Ragi Cheela',
      'Flattened Rice Upma',
      'Besan Toast',
      'Red Rice Idli',
      'Sattu Smoothie',
      'Boiled Chana with Lemon'
    ],
    mains: [
      'Chana Dal with Lauki',
      'Saag with Bajra Roti',
      'Karela Aloo Curry',
      'Low-Oil Kadhi',
      'Baingan Bharta',
      'Pumpkin Curry with Rice',
      'Bhindi Masala (Low Oil)',
      'Moong Dal Tadka',
      'Mushroom Matar Curry',
      'Vegetable Litti Chokha'
    ],
    snacks: [
      'Roasted Makhana with Turmeric',
      'Steamed Samosa (Air-fried)',
      'Sattu Ladoo (No Sugar)',
      'Green Chana Chaat',
      'Masala Corn',
      'Oats Cutlet',
      'Bottle Gourd Tikkis',
      'Beetroot Chips (Baked)',
      'Carrot Raisin Balls',
      'Chana Sundal'
    ]
  },
  'goa': {
    breakfast: [
      'Ragi Bhakri with Coconut Chutney',
      'Vegetable Sanna (Steamed Rice Cakes)',
      'Moong Dal Dosa',
      'Cucumber Pancakes',
      'Red Rice Upma',
      'Vegetable Udid Metha Porridge',
      'Steamed Jackfruit Idli',
      'Tapioca Poha',
      'Ragi Porridge',
      'Sweet Potato Tikki'
    ],
    mains: [
      'Tambdi Bhaji (Amaranth Leaves Curry)',
      'Tisreo Sukhem (Steamed Clams with Veg)',
      'Vegetable Caldeen (Coconut Curry)',
      'Khatkhatem (Mixed Veg Curry)',
      'Chana Ros (Chickpea Curry)',
      'Goan Dal Curry',
      'Bottle Gourd Coconut Curry',
      'Tofu Vindaloo (Low Oil)',
      'Steamed Fish with Spices',
      'Brinjal Curry with Red Rice'
    ],
    snacks: [
      'Air-Fried Patoleo (Stuffed Leaves)',
      'Oats & Coconut Ladoo',
      'Banana Flour Cutlets',
      'Boiled Peanuts with Spices',
      'Dry Fruit & Cashew Bites',
      'Veg Ragi Wraps',
      'Jackfruit Seed Tikkis',
      'Baked Banana Chips',
      'Foxnut & Peanut Trail Mix',
      'Steamed Veg Rolls'
    ]
  },
  'gujarat': {
    breakfast: [
      'Handvo (Lentil Vegetable Cake)',
      'Thepla (Methi Flatbread)',
      'Dhokla (Steamed Chickpea Cake)',
      'Khaman (Low-Oil)',
      'Bajra Khichu',
      'Muthiya (Steamed Veg Dumplings)',
      'Vegetable Sev Khamni',
      'Ragi Upma',
      'Jowar Roti with Chutney',
      'Tofu Bhurji with Thepla'
    ],
    mains: [
      'Bajra Rotla with Garlic Chutney',
      'Lauki Tamatar Sabzi',
      'Karela Bateta Nu Shaak',
      'Toor Dal with Green Garlic',
      'Ringan No Olo (Brinjal Mash)',
      'Mixed Dal Handvo',
      'Vegetable Khichdi',
      'Moong Dal with Turmeric',
      'Stuffed Bhindi with Bajra Roti'
    ],
    snacks: [
      'Roasted Makhana Masala',
      'Khandvi (Rolled Besan Snack)',
      'Baked Patra (Colocasia Rolls)',
      'Chana Chaat',
      'Sprouted Moong Salad',
      'Oats Thepla Chips',
      'Ragi Ladoo with Dates',
      'Besan Tikkis (Air-Fried)',
      'Tomato Cucumber Chaat',
      'Steamed Dal Puffs'
    ]
  },
  'haryana': {
    breakfast: [
      'Missi Roti with Mint Chutney',
      'Bajra Khichdi',
      'Vegetable Daliya',
      'Besan Cheela',
      'Stuffed Bajra Paratha (Oil-Free)',
      'Ragi Roti with Curd',
      'Tofu and Methi Roti',
      'Flattened Rice with Veggies',
      'Low-Oil Aloo Raita with Roti',
      'Lauki Chilla'
    ],
    mains: [
      'Chana Masala (Low Oil)',
      'Baingan Bharta',
      'Bitter Gourd Curry',
      'Ghiya Kadhi (Bottle Gourd Yogurt Curry)',
      'Sookhi Moong Dal',
      'Cabbage Peas Subzi',
      'Kachri Tomato Curry',
      'Palak Paneer (Low Fat)',
      'Tofu Bhurji with Bajra Roti',
      'Pumpkin Curry with Bajra Roti'
    ],
    snacks: [
      'Roasted Chana with Spices',
      'Cucumber Sticks with Jeera Yogurt Dip',
      'Dry Fruit Ladoo (No Sugar)',
      'Boiled Moth Beans Chaat',
      'Foxnut Masala Snack',
      'Low-Oil Moong Dal Pakodi',
      'Oats Tikkis with Green Chutney',
      'Carrot Beet Sticks',
      'Ragi Biscuits',
      'Tofu Veg Rolls'
    ]
  },
  'himachal': {
    breakfast: [
      'Chana Madra with Multigrain Roti',
      'Buckwheat Pancakes',
      'Aloo Palda (Low Oil)',
      'Siddu (Steamed Wheat Dumplings)',
      'Ragi Porridge',
      'Oats and Apple Kheer',
      'Besan Cheela',
      'Vegetable Dalia',
      'Chana Dal Pancake',
      'Red Rice Idli'
    ],
    mains: [
      'Tudkiya Bhath (Spiced Lentil Rice)',
      'Chana Dal Palda',
      'Bhey (Lotus Stem Curry)',
      'Mushroom Siddu Curry',
      'Spinach and Rajma Curry',
      'Lauki Tomato Curry',
      'Chana Madra (Low Oil)',
      'Boiled Veg with Mountain Herbs',
      'Low-Oil Gahat Dal',
      'Pumpkin Chana Subzi'
    ],
    snacks: [
      'Roasted Black Chana',
      'Oats and Makhana Cutlets',
      'Steamed Siddu Slices',
      'Baked Sweet Potato Discs',
      'Foxnut Chaat',
      'Carrot Raita Cups',
      'Sprouted Moong Chaat',
      'Ragi Ladoo',
      'Masala Khichdi Bites',
      'Boiled Peanut Salad'
    ]
  },
  'jharkhand': {
    breakfast: [
      'Dhuskas (Baked)',
      'Ragi and Sattu Porridge',
      'Vegetable Chilka Roti',
      'Flattened Rice Upma',
      'Litti with Chokha (No Ghee)',
      'Besan Cheela with Lauki',
      'Sattu Smoothie',
      'Moong Dal Toast',
      'Ragi Idli',
      'Sprouted Moong Stir-Fry'
    ],
    mains: [
      'Chana Dal with Lauki',
      'Bari Curry (Sun-dried Lentil Dumplings)',
      'Low-Oil Chicken Saag',
      'Jhingni Sabzi (Ridge Gourd)',
      'Saag with Millets',
      'Vegetable Kurthi Dal',
      'Tamarind Pumpkin Curry',
      'Palak Chana Dal',
      'Baingan Bharta',
      'Mixed Veg Koftas (Steamed)'
    ],
    snacks: [
      'Baked Thekua',
      'Sattu Ladoo (No Sugar)',
      'Ragi Tikkis',
      'Foxnut & Peanut Mix',
      'Chana Chaat',
      'Steamed Moong Dal Balls',
      'Dry Fruit Energy Bars',
      'Pumpkin Seed Trail Mix',
      'Baked Plantain Chips',
      'Cucumber Carrot Sticks with Dip'
    ]
  },
  'karnataka': {
    breakfast: [
      'Ragi Mudde with Low-Oil Sambar',
      'Vegetable Upma',
      'Set Dosa with Coconut Chutney',
      'Akki Roti (Rice Roti)',
      'Methi Dosa',
      'Vegetable Rava Idli',
      'Broken Wheat Pongal',
      'Avarekalu Akki Upma',
      'Red Rice Poha',
      'Sprouted Moong Dosa'
    ],
    mains: [
      'Bisi Bele Bath (Low Oil)',
      'Avarekalu Saaru (Field Beans Curry)',
      'Menthya Soppu Saaru (Fenugreek Dal)',
      'Vegetable Kurma with Ragi Roti',
      'Chow Chow Palya (Chayote Curry)',
      'Udupi Sambar',
      'Kosambari with Moong Dal',
      'Cabbage Palya',
      'Southekayi Huli (Cucumber Curry)',
      'Mixed Lentil Stew'
    ],
    snacks: [
      'Ragi Chakli (Baked)',
      'Avarekalu Usli (Field Bean Stir Fry)',
      'Dry Fruit Laddu',
      'Oats Masala Vada (Air-Fried)',
      'Green Gram Sundal',
      'Beetroot Cutlets',
      'Masala Foxnuts',
      'Carrot Kosambari',
      'Sweet Corn Chaat',
      'Vegetable Idli Slices'
    ]
  },
  'madhyapradesh': {
    breakfast: [
      'Vegetable Poha',
      'Moong Dal Cheela',
      'Dalia with Vegetables',
      'Stuffed Multigrain Paratha',
      'Ragi Idli',
      'Vegetable Upma',
      'Sattu Smoothie',
      'Tofu Bhurji with Roti',
      'Oats Dosa',
      'Sweet Potato Hash'
    ],
    mains: [
      'Bhindi Masala (Low Oil)',
      'Baingan Bharta',
      'Mixed Vegetable Curry',
      'Palak Dal',
      'Lauki Tomato Curry',
      'Toor Dal Tadka',
      'Pumpkin Subzi',
      'Low-Oil Aloo Matar',
      'Chana Masala',
      'Ragi Roti with Moong Dal'
    ],
    snacks: [
      'Roasted Chana Trail Mix',
      'Baked Wheat Chakli',
      'Masala Makhana',
      'Carrot Cucumber Sticks',
      'Steamed Moong Vada',
      'Foxnut Energy Balls',
      'Low-Oil Corn Chaat',
      'Beetroot Tikkis',
      'Ragi Cookies',
      'Mixed Sprout Salad'
    ]
  },
  'maharashtra': {
    breakfast: [
      'Kanda Poha',
      'Thalipeeth (Multigrain Flatbread)',
      'Upvas Sabudana Khichdi (Low Oil)',
      'Ragi Dosa',
      'Vegetable Idli',
      'Sprouted Moong Usal',
      'Oats Upma',
      'Jowar Bhakri with Chutney',
      'Sweet Potato Paratha',
      'Besan Toast'
    ],
    mains: [
      'Bharli Vangi (Stuffed Brinjal)',
      'Amti (Spiced Dal)',
      'Zunka Bhakri',
      'Lauki Bhaji',
      'Matki Usal (Sprouted Beans)',
      'Tondli Bhaat (Ivy Gourd Rice)',
      'Pumpkin Rassa',
      'Palak Moong Dal',
      'Tinda Masala',
      'Masoor Dal Curry'
    ],
    snacks: [
      'Kothimbir Vadi (Steamed)',
      'Sprouted Matki Chaat',
      'Baked Sabudana Vada',
      'Ragi Chakli',
      'Masala Corn',
      'Roasted Peanut Mix',
      'Carrot Beet Cutlets',
      'Oats Bhakarwadi',
      'Low-Oil Shengdana Ladoo',
      'Cucumber Chutney Rolls'
    ]
  },
  'kerala': {
    breakfast: [
      'Idiyappam with Vegetable Stew',
      'Puttu with Kadala Curry',
      'Vegetable Upma',
      'Oats Idli',
      'Aval Nanachathu (Soaked Poha with Coconut)',
      'Ragi Dosa',
      'Banana Wheat Pancakes',
      'Sweet Potato Masala Dosa',
      'Broken Wheat Upma',
      'Steamed Tapioca with Chutney'
    ],
    mains: [
      'Olan (Ash Gourd Curry)',
      'Avial (Mixed Vegetable Coconut Curry)',
      'Thoran (Vegetable Stir Fry)',
      'Pachadi (Yogurt Curry)',
      'Erissery (Pumpkin & Lentil Curry)',
      'Vegetable Sambar',
      'Moru Curry (Spiced Buttermilk Curry)',
      'Raw Banana Kofta (Steamed)',
      'Beans & Carrot Mezhukkupuratti',
      'Red Matta Rice with Dal'
    ],
    snacks: [
      'Banana Chips (Baked)',
      'Roasted Jackfruit Seeds',
      'Oats Kozhukattai (Steamed Balls)',
      'Chickpea Sundal',
      'Ragi Banana Balls',
      'Aval Ladoo',
      'Spiced Boiled Peanuts',
      'Vegetable Cutlets (Air-Fried)',
      'Steamed Plantain Slices',
      'Sweet Coconut Balls'
    ]
  },
  'manipur': {
    breakfast: [
      'Chakhao Amubi (Black Rice Porridge)',
      'Nga Ataoba Kanghou (Vegetable Stir Fry)',
      'Kabok with Banana',
      'Rice Pancakes with Honey',
      'Vegetable Upma',
      'Steamed Tapioca with Herbs',
      'Pumpkin Puree with Red Rice',
      'Leafy Vegetable Omelette',
      'Green Gram Stir Fry',
      'Cucumber Poha'
    ],
    mains: [
      'Chamthong (Vegetable Stew)',
      'Eromba (Boiled Veg Mash with Fermented Fish)',
      'Singju (Healthy Veg Salad)',
      'Yongchak Iromba (Tree Bean Mash)',
      'Ooti (Green Peas and Rice)',
      'Laphu Thongba (Banana Stem Curry)',
      'Pumpkin and Bamboo Shoot Curry',
      'Pancha Foron Veg Curry',
      'Saag with Black Rice',
      'Dry Peas Vegetable Curry'
    ],
    snacks: [
      'Black Rice Energy Balls',
      'Fermented Bamboo Shoots with Chilli',
      'Boiled Chickpeas Chaat',
      'Sweet Potato Cutlets',
      'Cucumber and Radish Salad',
      'Foxnut with Herbs',
      'Air-Fried Plantain Chips',
      'Vegetable Momos (Steamed)',
      'Tofu Lettuce Wraps',
      'Ragi Puffed Bars'
    ]
  },
  'meghalaya': {
    breakfast: [
      'Jadoh with Veggies',
      'Pukhlein (Steamed Rice Pancakes)',
      'Sweet Corn Porridge',
      'Vegetable Red Rice Upma',
      'Banana Leaf Steamed Dosa',
      'Millet Idli',
      'Oats with Wild Berries',
      'Tapioca with Jaggery',
      'Spinach and Rice Cakes',
      'Carrot Rice Porridge'
    ],
    mains: [
      'Dohneiiong (Black Sesame Curry with Veg)',
      'Jhur Sideh (Dry Sauteed Veg)',
      'Nakham Bitchi (Spicy Veg Broth)',
      'Bamboo Shoot and Beans Curry',
      'Pumpkin with Mustard Seeds',
      'Green Leafy Vegetable Soup',
      'Rice and Root Veg Mix',
      'Boiled Veg with Local Herbs',
      'Tomato Dal with Red Rice',
      'Boiled Colocasia Root Curry'
    ],
    snacks: [
      'Steamed Rice Balls',
      'Ragi Laddoo',
      'Dry Roasted Soybean',
      'Pumpkin Seed Trail Mix',
      'Air-Fried Tapioca Chips',
      'Sweet Corn Chaat',
      'Carrot Beet Tikkis',
      'Tofu Cubes with Herbs',
      'Sweet Potato Slices',
      'Spiced Black Rice Crackers'
    ]
  },
  'mizoram': {
    breakfast: [
      'Rice Pancakes with Steamed Veg',
      'Bai (Steamed Green Veg Mix)',
      'Sticky Rice with Fruits',
      'Red Rice Porridge',
      'Vegetable Omelette',
      'Tofu Stir Fry with Leafy Greens',
      'Boiled Yam with Honey',
      'Steamed Tapioca with Spinach',
      'Lentil Pancakes',
      'Sweet Corn and Millet Soup'
    ],
    mains: [
      'Bai (Stewed Mixed Veg)',
      'Chhum Han (Steamed Veg)',
      'Vegetable Bamboo Shoot Curry',
      'Koat Pitha (Healthy Baked Version)',
      'Green Beans with Mustard',
      'Pumpkin and Rice Curry',
      'Smoked Tofu and Vegetables',
      'Cucumber and Tomato Sabzi',
      'Colocasia with Red Chili Paste',
      'Spinach and Yam Curry'
    ],
    snacks: [
      'Rice Flour Cutlets',
      'Tofu Veg Rolls',
      'Baked Banana Chips',
      'Soybean Salad with Herbs',
      'Boiled Root Veg Mix',
      'Steamed Rice and Vegetable Balls',
      'Cucumber Peanut Chaat',
      'Low-Oil Tapioca Fritters',
      'Dry Fruit and Seed Mix',
      'Ragi Coconut Laddoos'
    ]
  },
  'nagaland': {
    breakfast: [
      'Boiled Red Rice with Steamed Vegetables',
      'Sticky Rice with Boiled Eggs',
      'Tapioca and Banana Mash',
      'Fermented Bamboo Shoot Porridge',
      'Vegetable Poha with Herbs',
      'Boiled Sweet Potato with Chili Paste',
      'Ragi Upma',
      'Leafy Greens and Rice Pancake',
      'Pumpkin Rice Porridge',
      'Tofu Veg Stir Fry'
    ],
    mains: [
      'Smoked Veg Curry with Bamboo Shoot',
      'Axone (Fermented Soybean) with Steamed Veg',
      'Bitter Gourd Tomato Curry',
      'Banana Flower Curry',
      'Cucumber Stew',
      'Boiled Pumpkin with Mustard',
      'Colocasia Curry with Greens',
      'Steamed Beans and Carrots',
      'Red Rice and Vegetable Curry',
      'Spinach with Boiled Herbs'
    ],
    snacks: [
      'Steamed Momos (Veg)',
      'Black Sesame Seed Ladoo',
      'Roasted Soy Nut Chaat',
      'Dry Roasted Corn',
      'Banana Chips (Air Fried)',
      'Boiled Yam Chunks with Herbs',
      'Sweet Potato Patties',
      'Foxnut and Peanut Mix',
      'Rice Flour Balls',
      'Cucumber Chili Salad'
    ]
  },
  'odisha': {
    breakfast: [
      'Chuda Kadamba (Flattened Rice Balls)',
      'Dahibara (Without Aludam)',
      'Vegetable Pakhala Bhata (Fermented Rice)',
      'Moong Dal Cheela',
      'Suji Upma with Veggies',
      'Vegetable Idli',
      'Ragi Dosa with Chutney',
      'Sweet Corn Poha',
      'Boiled Chana with Lemon',
      'Multigrain Dalia'
    ],
    mains: [
      'Dalma (Lentils with Veggies)',
      'Santula (Boiled Veg Curry)',
      'Besara (Mustard Veg Curry)',
      'Low-Oil Aloo Bharta',
      'Rasabali with Ragi',
      'Matar Ghugni',
      'Pumpkin Curry',
      'Lauki and Moong Dal',
      'Mixed Veg Khichdi',
      'Spinach Tomato Curry'
    ],
    snacks: [
      'Chuda Ghasa (Low Sugar)',
      'Ragi Chakuli (Steamed)',
      'Dry Roasted Peanuts',
      'Coconut Ladoo (No Sugar)',
      'Oats Cutlets',
      'Boiled Sweet Corn with Spices',
      'Foxnut Snack Mix',
      'Steamed Green Gram Balls',
      'Low-Oil Vegetable Pakora',
      'Carrot Cucumber Chaat'
    ]
  },
  'punjab': {
    breakfast: [
      'Stuffed Tofu Paratha (No Oil)',
      'Besan Cheela with Veggies',
      'Vegetable Dalia',
      'Moong Dal Idli',
      'Ragi Roti with Curd',
      'Missi Roti with Mint Chutney',
      'Stuffed Bajra Paratha',
      'Low-Oil Chole with Toast',
      'Sattu Smoothie',
      'Boiled Egg and Spinach Stir Fry'
    ],
    mains: [
      'Chana Masala (Low Oil)',
      'Baingan Bharta',
      'Sarson da Saag (Low Ghee)',
      'Kadhi with Lauki',
      'Palak Paneer (Tofu Variant)',
      'Gobhi Masala',
      'Mixed Vegetable Curry',
      'Dal Makhani (Low Cream)',
      'Lobia Masala',
      'Bottle Gourd Curry'
    ],
    snacks: [
      'Roasted Chana with Masala',
      'Dry Fruit & Makhana Mix',
      'Steamed Tikkis',
      'Cucumber & Carrot Salad',
      'Low-Oil Baked Samosa',
      'Tofu Veg Rolls',
      'Oats Cutlets',
      'Beetroot Hummus with Sticks',
      'Chickpea Chaat',
      'Low-Oil Moong Dal Pakodi'
    ]
  },
  'rajasthan': {
    breakfast: [
      'Bajra Khichdi',
      'Missi Roti with Mint Chutney',
      'Besan Cheela',
      'Moong Dal Dhokla',
      'Ragi Upma',
      'Vegetable Poha',
      'Steamed Bajra Idli',
      'Oats Paratha',
      'Chana Chaat with Lemon',
      'Tofu Bhurji with Jowar Roti'
    ],
    mains: [
      'Ker Sangri (Low Oil)',
      'Gatte ki Sabzi (Steamed Gatta)',
      'Bajra Roti with Lahsun Chutney',
      'Chana Dal with Lauki',
      'Panchmel Dal',
      'Papad ki Sabzi (Low Oil)',
      'Bhindi Masala (Low Oil)',
      'Baingan Bharta',
      'Tinda Curry',
      'Palak Tofu Curry'
    ],
    snacks: [
      'Baked Bikaneri Bhujia',
      'Roasted Moong Dal',
      'Oats Cutlet',
      'Steamed Dhokla',
      'Ragi Chakli',
      'Cucumber Chaat',
      'Beetroot and Carrot Tikkis',
      'Low-Oil Mirchi Pakora',
      'Sprouted Moong Salad',
      'Foxnut Trail Mix'
    ]
  },
  'sikkim': {
    breakfast: [
      'Phagshapa (Veg Low-Fat Version)',
      'Chhurpi with Boiled Millet',
      'Vegetable Thukpa',
      'Buckwheat Pancakes',
      'Millet Porridge',
      'Spinach Rice Pancakes',
      'Steamed Tapioca with Salt',
      'Soybean Sabzi with Rice',
      'Red Rice Idli',
      'Sweet Corn Chilla'
    ],
    mains: [
      'Gundruk Soup (Fermented Veg Broth)',
      'Saag Curry',
      'Mushroom and Bamboo Curry',
      'Tofu and Leafy Stir Fry',
      'Dal with Chhurpi',
      'Rayo Saag Curry',
      'Red Rice with Boiled Veggies',
      'Pumpkin and Beans Curry',
      'Carrot Peas Subzi',
      'Lentil Bamboo Soup'
    ],
    snacks: [
      'Steamed Veg Momos',
      'Tofu Lettuce Wraps',
      'Sweet Potato Cutlets',
      'Boiled Corn Chaat',
      'Buckwheat Bars',
      'Roasted Soy Nuts',
      'Black Rice Balls',
      'Cucumber Radish Salad',
      'Pumpkin Seed Trail Mix',
      'Low-Oil Dal Pakoras'
    ]
  },
  'tamilnadu': {
    breakfast: [
      'Ragi Dosa',
      'Kambu Koozh (Pearl Millet Porridge)',
      'Vegetable Upma',
      'Ragi Idli',
      'Thinai Pongal (Foxtail Millet Pongal)',
      'Adai Dosa (Mixed Lentil)',
      'Kuthiraivali (Barnyard Millet) Upma',
      'Tofu Uthappam',
      'Red Rice Idiyappam',
      'Sweet Corn and Vegetable Chilla'
    ],
    mains: [
      'Keerai Kootu (Spinach Dal)',
      'Vegetable Kurma with Red Rice',
      'Sambhar with Millets',
      'Poriyal (Stir Fry Veg)',
      'Avial (Mixed Veg Coconut Curry)',
      'Vathal Kuzhambu (Low Oil)',
      'Kollu Rasam (Horse Gram)',
      'Karamani Kuzhambu (Cowpeas Curry)',
      'Kootu with Lauki',
      'Cabbage Peas Curry'
    ],
    snacks: [
      'Sundal (Boiled Chickpeas with Coconut)',
      'Murungai Keerai Soup (Drumstick Leaf)',
      'Steamed Millet Balls',
      'Oats Masala Vadai (Air Fried)',
      'Cucumber Kosambari',
      'Dry Fruit and Ragi Ladoo',
      'Sweet Potato Tikkis',
      'Low-Oil Paniyaram',
      'Foxnut & Peanut Chaat',
      'Beetroot Moong Cutlets'
    ]
  },
  'telangana': {
    breakfast: [
      'Jonna Rotte (Sorghum Roti)',
      'Pesarattu (Green Moong Dosa)',
      'Ragi Sangati',
      'Vegetable Upma',
      'Oats Dosa with Chutney',
      'Red Rice Idli',
      'Besan Cheela with Veggies',
      'Foxtail Millet Pongal',
      'Boiled Sprouts Salad',
      'Sajja Upma (Bajra)'
    ],
    mains: [
      'Sambar with Veggies',
      'Kanda Bachali Kura (Yam & Greens)',
      'Dosakaya Pappu (Yellow Cucumber Dal)',
      'Gongura Dal',
      'Beerakaya Curry (Ridge Gourd)',
      'Lauki Kofta (Steamed)',
      'Brinjal Tomato Curry',
      'Spinach Moong Dal',
      'Bendakaya Fry (Low Oil Okra)',
      'Mixed Veg Kurma'
    ],
    snacks: [
      'Boiled Corn with Lemon',
      'Roasted Chana Trail Mix',
      'Oats and Sprouts Tikki',
      'Ragi Laddoo (No Sugar)',
      'Cucumber Peanut Chaat',
      'Baked Moong Dal Vada',
      'Foxnut Mix',
      'Tofu Lettuce Wraps',
      'Low-Oil Murukulu',
      'Beetroot Cutlets'
    ]
  },
  'tripura': {
    breakfast: [
      'Mui Borok Style Veg Upma',
      'Sticky Rice with Banana',
      'Vegetable Rice Pancake',
      'Millet Khichdi',
      'Tofu Stir Fry with Red Rice',
      'Sweet Potato Porridge',
      'Red Rice Idli',
      'Boiled Egg with Herbs',
      'Pumpkin Rice Mash',
      'Leafy Veg Cheela'
    ],
    mains: [
      'Berma Veg Curry (Non-Fish Variant)',
      'Chopped Green Curry',
      'Bamboo Shoot & Jackfruit Curry',
      'Tofu and Beans Stew',
      'Mixed Veg Kharzi (Low Oil)',
      'Red Rice with Moong Dal',
      'Pumpkin and Colocasia Curry',
      'Steamed Cabbage Mix',
      'Sweet Potato and Saag',
      'Lauki Chana Dal Curry'
    ],
    snacks: [
      'Roasted Pumpkin Seeds',
      'Cucumber and Green Chili Salad',
      'Steamed Tapioca Sticks',
      'Tofu Salad with Mustard',
      'Boiled Chickpeas with Lime',
      'Black Rice Balls',
      'Air-Fried Banana Chips',
      'Carrot Beetroot Cutlets',
      'Foxnut and Dry Fruit Mix',
      'Sattu Energy Balls'
    ]
  },
  'uttarpradesh': {
    breakfast: [
      'Sooji Cheela with Vegetables',
      'Moong Dal Idli',
      'Ragi Daliya (Cracked Wheat Porridge)',
      'Oats Upma',
      'Sattu Paratha (Oil-Free)',
      'Vegetable Poha',
      'Besan Toast',
      'Sprouted Moong Stir Fry',
      'Multigrain Paratha',
      'Boiled Chana Chat'
    ],
    mains: [
      'Lauki Tamatar Curry',
      'Baingan Bharta',
      'Low-Oil Aloo Matar',
      'Karela Bhaji',
      'Moong Dal Tadka',
      'Ghiya Kofta (Steamed)',
      'Chana Dal with Saag',
      'Low-Oil Kadhi',
      'Cabbage Peas Subzi',
      'Palak Chole'
    ],
    snacks: [
      'Steamed Dhokla',
      'Boiled Peanut Salad',
      'Foxnut with Turmeric',
      'Beetroot Tikkis',
      'Baked Samosa',
      'Oats Cutlet',
      'Carrot Cucumber Chaat',
      'Dry Fruit Laddoo',
      'Roasted Chana Mix',
      'Low-Oil Pakodi'
    ]
  },
  'uttarakhand': {
    breakfast: [
      'Jhangora Kheer (Millet Porridge)',
      'Mandua Roti (Ragi Flatbread)',
      'Aloo Ke Gutke with Multigrain Roti',
      'Vegetable Cheela',
      'Red Rice Idli',
      'Tofu Bhurji',
      'Flattened Rice Upma',
      'Boiled Kala Chana',
      'Sweet Corn Porridge',
      'Besan Dhokla'
    ],
    mains: [
      'Chainsoo (Roasted Urad Dal Curry)',
      'Gahat Dal (Horse Gram)',
      'Phaanu (Mixed Lentils)',
      'Jhangora Khichdi',
      'Kafuli (Spinach Curry)',
      'Bhangjeera Chutney with Veg',
      'Cabbage Moong Dal',
      'Palak Tofu Curry',
      'Pumpkin Tomato Curry',
      'Ragi Roti with Masoor Dal'
    ],
    snacks: [
      'Roasted Mandua Chakli',
      'Baked Aloo Tikkis',
      'Black Soybean Chaat',
      'Dry Fruit Balls',
      'Foxnut and Peanut Mix',
      'Boiled Veg Chaat',
      'Sweet Potato Sticks',
      'Oats Masala Tikkis',
      'Ragi Ladoo',
      'Steamed Mixed Veg Balls'
    ]
  },
  'westbengal': {
    breakfast: [
      'Chirer Pulao (Poha with Veggies)',
      'Moong Dal Chilla',
      'Radhaballavi (Baked Lentil Puris)',
      'Luchi with Aloor Dom (Low Oil)',
      'Vegetable Dalia',
      'Oats Upma',
      'Ragi Idli',
      'Sweet Potato Pancakes',
      'Tofu Bhurji with Paratha',
      'Cucumber Yogurt Parfait'
    ],
    mains: [
      'Shukto (Mixed Vegetable Stew)',
      'Lau Ghonto (Bottle Gourd Curry)',
      'Moong Dal with Veggies',
      'Begun Bharta',
      'Cholar Dal',
      'Dhokar Dalna (Steamed Lentil Cakes Curry)',
      'Palong Shaak with Chana',
      'Low-Oil Aloo Posto',
      'Rui Curry with Steamed Veg',
      'Spinach and Pumpkin Curry'
    ],
    snacks: [
      'Jhal Muri (Low Oil)',
      'Mocha Chop (Air-Fried)',
      'Chana Chaat',
      'Baked Samosa',
      'Oats Cutlet',
      'Boiled Corn Chaat',
      'Sweet Corn Pattice',
      'Low-Oil Ghugni',
      'Ragi Cookies',
      'Cucumber Beet Salad'
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
