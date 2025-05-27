
// Define the type for the authentic lunch options
export type AuthenticLunchRegions = 'north' | 'south' | 'west' | 'east' | 'central' | 'northeast';

/**
 * Traditional Indian lunch combinations by region
 */
export const authenticLunchOptions: Record<AuthenticLunchRegions, string[]> = {
  north: [
    'Rajma Chawal with Pickle and Papad',
    'Dal Makhani with Jeera Rice and Raita',
    'Chole Bhature with Onion Salad',
    'Kadhi Pakora with Steamed Rice',
    'Sarson ka Saag with Makki di Roti and White Butter',
    'Aloo Gobhi with Missi Roti and Lassi'
  ],
  south: [
    'Sambar Rice with Rasam and Papad',
    'Curd Rice with Mango Pickle and Appalam',
    'Bisi Bele Bath with Ghee and Pickle',
    'Pulihora with Papad and Raita',
    'Avial with Kerala Red Rice',
    'Vegetable Sambar with Coconut Rice'
  ],
  west: [
    'Gujarati Thali with Dal, Sabzi, and Roti',
    'Pav Bhaji with Chopped Onions and Lemon',
    'Undhiyu with Gujarati Kadhi and Rice',
    'Dal Baati Churma with Ghee',
    'Maharashtrian Amti with Bhakri',
    'Kathiyawadi Thali with Mixed Vegetables'
  ],
  east: [
    'Fish Curry with Steamed Rice and Aloo Bhaja',
    'Shukto with Rice and Dal',
    'Aloo Posto with Luchi and Begun Bhaja',
    'Cholar Dal with Luchi and Aloo Dum',
    'Bengali Khichuri with Labra and Papad',
    'Machher Jhol with Plain Rice and Vegetable Fry'
  ],
  central: [
    'Dal Bafla with Churma and Ghee',
    'Bhutte ka Kees with Poha and Jalebi',
    'Poha with Sev and Jalebi',
    'Indori Poha with Namkeen and Tea',
    'Palak Paneer with Tandoori Roti',
    'Kadaknath Curry with Rice and Raita'
  ],
  northeast: [
    'Assamese Fish Curry with Rice and Khar',
    'Bamboo Shoot Curry with Red Rice',
    'Black Rice with Vegetable Stew',
    'Pork with Axone and Rice',
    'Manipuri Fish Curry with Black Rice',
    'Jadoh (Meghalaya Rice Dish) with Vegetables'
  ]
};
