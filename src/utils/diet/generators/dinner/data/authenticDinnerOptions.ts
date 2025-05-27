
// Define the type for the authentic dinner options
export type AuthenticDinnerRegions = 'north' | 'south' | 'west' | 'east' | 'central' | 'northeast';

/**
 * Traditional Indian dinner combinations by region
 */
export const authenticDinnerOptions: Record<AuthenticDinnerRegions, string[]> = {
  north: [
    'Palak Paneer with Jeera Rice and Raita',
    'Dal Tadka with Roti and Mixed Vegetable Sabzi',
    'Aloo Gobi with Missi Roti and Lassi',
    'Paneer Butter Masala with Naan and Salad',
    'Kadhi Pakora with Rice and Pickle',
    'Chana Masala with Kulcha and Onion Salad'
  ],
  south: [
    'Rasam Rice with Vegetable Poriyal and Papad',
    'Sambar with Rice and Coconut Vegetable Curry',
    'Curd Rice with Pickle and Appalam',
    'Vegetable Kurma with Coconut Rice',
    'Kerala Fish Curry with Red Rice and Thoran',
    'Andhra Dal with Rice and Vegetable Fry'
  ],
  west: [
    'Gujarat Dal with Rice and Vegetable Sabzi',
    'Palak Paneer with Gujarati Kadhi and Roti',
    'Mixed Vegetable Curry with Bhakri and Raita',
    'Bottle Gourd Curry with Rice and Pickle',
    'Maharashtrian Bharli Vangi with Jowar Bhakri',
    'Dal Dhokli with Pickle and Papad'
  ],
  east: [
    'Bengali Dal with Rice and Aloo Bhaja',
    'Aloo Posto with Rice and Fish Curry',
    'Moong Dal with Rice and Vegetable Fry',
    'Shukto with Rice and Papad',
    'Cholar Dal with Rice and Begun Bhaja',
    'Bengali Mixed Vegetable Curry with Rice'
  ],
  central: [
    'Bafla with Dal and Churma',
    'Mixed Dal with Rice and Vegetable Curry',
    'Palak Paneer with Tandoori Roti',
    'Aloo Baingan with Rice and Raita',
    'Dal Fry with Roti and Mixed Vegetables',
    'Bhindi Masala with Rice and Dal'
  ],
  northeast: [
    'Simple Dal with Rice and Steamed Vegetables',
    'Bamboo Shoot Curry with Red Rice',
    'Mixed Vegetable Stew with Rice',
    'Black Rice with Simple Vegetable Curry',
    'Mustard Greens with Rice and Dal',
    'Fermented Fish with Rice and Vegetables'
  ]
};
