
/**
 * Get region-specific non-vegetarian dishes
 * 
 * @param region - Region code
 * @returns Array of region-specific non-vegetarian dish names
 */
export const getRegionalNonVegDishes = (region: string): string[] => {
  // Default empty array if region is not specified or not recognized
  if (!region) {
    return [];
  }
  
  // Region-specific non-veg dishes
  const regionalNonVegMap: Record<string, string[]> = {
    'north': [
      'Butter Chicken',
      'Rogan Josh',
      'Chicken Tikka',
      'Seekh Kebab',
      'Kadhai Chicken',
      'Dhaba Style Mutton Curry',
      'Amritsari Fish',
      'Chicken Korma',
      'Keema Matar with Bajra Roti',
      'Chicken Curry with Pearl Millet'
    ],
    'south': [
      'Chettinad Chicken',
      'Kerala Fish Curry',
      'Andhra Chicken',
      'Malabar Fish Curry',
      'Chicken 65',
      'Kori Rotti with Millet Rice',
      'Hyderabadi Dum Biryani with Foxtail Millet',
      'Nellore Fish Curry with Quinoa',
      'Mangalorean Chicken Ghee Roast with Ragi Roti',
      'Prawn Curry with Millet Rice'
    ],
    'east': [
      'Fish Machha Jhola',
      'Bengali Fish Curry',
      'Chicken Kosha',
      'Mutton Rezala',
      'Prawn Malai Curry',
      'Posto Chicken with Pearl Millet',
      'Dhakai Morog Pulao with Mixed Millets',
      'Maacher Jhol with Amaranth',
      'Assamese Duck Curry with Kodo Millet',
      'Fish Kalia with Barnyard Millet'
    ],
    'west': [
      'Goan Fish Curry',
      'Chicken Xacuti',
      'Kolhapuri Chicken',
      'Bombay Duck Fry',
      'Malvani Chicken',
      'Parsi Dhansak with Mixed Millets',
      'Sukka Chicken with Jowar Bhakri',
      'Maharashtrian Kombdi Vade with Ragi',
      'Bohri Style Raan with Pearl Millet Pulao',
      'Kheema Pav with Multigrain Bread'
    ],
    'punjab': [
      'Amritsari Fish',
      'Butter Chicken',
      'Tandoori Chicken',
      'Chicken Tikka',
      'Tawa Chicken',
      'Sarson Fish with Bajra Roti',
      'Dhaba Curry with Millet Paratha',
      'Bhatti Chicken with Mixed Grains',
      'Amritsari Macchi with Pearl Millet',
      'Mutton Chaap with Ragi Roti'
    ],
    'bengal': [
      'Kosha Mangsho',
      'Macher Jhol',
      'Shorshe Ilish',
      'Chingri Malai Curry',
      'Chicken Chaap',
      'Ilish with Barnyard Millet Rice',
      'Doi Maach with Mixed Millets',
      'Machher Kalia with Foxtail Millet',
      'Kosha Murgi with Ragi Flatbread',
      'Posto Murgi with Pearl Millet'
    ],
    'gujarat': [
      'Chicken Undhiyu',
      'Chicken Dhansak',
      'Tava Fish',
      'Parsi Salli Chicken',
      'Chicken Farcha',
      'Surti Fish with Pearl Millet Khichdi',
      'Kathiawadi Chicken with Ragi Rotla',
      'Mutton Seekh with Bajra Rotla',
      'Chicken Gujarat with Mixed Millets',
      'Fish Kolhapuri with Jowar Bhakri'
    ],
    'kerala': [
      'Kerala Fish Curry',
      'Chicken Stew',
      'Meen Molee',
      'Nadan Kozhi Curry',
      'Fish Mappas',
      'Kuttanadan Fish with Ragi Puttu',
      'Malabar Chicken with Millet Rice',
      'Duck Roast with Barnyard Millet',
      'Thalassery Fish Biryani with Mixed Millets',
      'Kozhi Varattiyathu with Pearl Millet Porridge'
    ],
    'tamil': [
      'Chettinad Chicken',
      'Tamil Fish Curry',
      'Kozhi Varutha Curry',
      'Meen Kuzhambu',
      'Nattu Kozhi Curry',
      'Kongu Chicken with Ragi Roti',
      'Meen Varuval with Foxtail Millet',
      'Kozhi Milagu Masala with Little Millet',
      'Vanjaram Fish with Kodo Millet',
      'Nalli Kari with Pearl Millet Dosai'
    ],
    'andhra': [
      'Andhra Chilli Chicken',
      'Gongura Mamsam',
      'Nellore Chepala Pulusu',
      'Kodi Vepudu',
      'Royyala Iguru',
      'Rayalaseema Chicken with Jowar Roti',
      'Chepa Vepudu with Foxtail Millet',
      'Guntur Kodi Pulao with Mixed Millets',
      'Telangana Mutton with Ragi Sangati',
      'Kodi Koora with Pearl Millet Roti'
    ],
    'rajasthan': [
      'Laal Maas',
      'Safed Maas',
      'Rajasthani Chicken Curry',
      'Jungli Maas',
      'Khad Khargosh',
      'Marwari Chicken with Bajra Roti',
      'Jodhpuri Mutton with Millet Mix',
      'Junglee Maas with Pearl Millet Khichdi',
      'Chicken Banjara with Ragi Roti',
      'Shekhawati Murgh with Barnyard Millet'
    ]
  };
  
  // Normalize the region key to lowercase
  const normalizedRegion = region.toLowerCase();
  
  // Return region-specific dishes if available, otherwise empty array
  return regionalNonVegMap[normalizedRegion] || [];
};
