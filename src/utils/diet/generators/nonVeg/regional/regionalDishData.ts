
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
      'Kadhai Chicken'
    ],
    'south': [
      'Chettinad Chicken',
      'Kerala Fish Curry',
      'Andhra Chicken',
      'Malabar Fish Curry',
      'Chicken 65'
    ],
    'east': [
      'Fish Machha Jhola',
      'Bengali Fish Curry',
      'Chicken Kosha',
      'Mutton Rezala',
      'Prawn Malai Curry'
    ],
    'west': [
      'Goan Fish Curry',
      'Chicken Xacuti',
      'Kolhapuri Chicken',
      'Bombay Duck Fry',
      'Malvani Chicken'
    ],
    'punjab': [
      'Amritsari Fish',
      'Butter Chicken',
      'Tandoori Chicken',
      'Chicken Tikka',
      'Tawa Chicken'
    ],
    'bengal': [
      'Kosha Mangsho',
      'Macher Jhol',
      'Shorshe Ilish',
      'Chingri Malai Curry',
      'Chicken Chaap'
    ],
    'gujarat': [
      'Chicken Undhiyu',
      'Chicken Dhansak',
      'Tava Fish',
      'Parsi Salli Chicken',
      'Chicken Farcha'
    ],
    'kerala': [
      'Kerala Fish Curry',
      'Chicken Stew',
      'Meen Molee',
      'Nadan Kozhi Curry',
      'Fish Mappas'
    ],
    'tamil': [
      'Chettinad Chicken',
      'Tamil Fish Curry',
      'Kozhi Varutha Curry',
      'Meen Kuzhambu',
      'Nattu Kozhi Curry'
    ],
    'andhra': [
      'Andhra Chilli Chicken',
      'Gongura Mamsam',
      'Nellore Chepala Pulusu',
      'Kodi Vepudu',
      'Royyala Iguru'
    ],
    'rajasthan': [
      'Laal Maas',
      'Safed Maas',
      'Rajasthani Chicken Curry',
      'Jungli Maas',
      'Khad Khargosh'
    ]
  };
  
  // Normalize the region key to lowercase
  const normalizedRegion = region.toLowerCase();
  
  // Return region-specific dishes if available, otherwise empty array
  return regionalNonVegMap[normalizedRegion] || [];
};
