
export { generateBreakfast } from './breakfast';
export { 
  generateMidMorningSnack, 
  generateEveningSnack, 
  generateSnacks,
  generateAfternoonSnack
} from './snacks';
export { generateLunch } from './lunchGenerator';
export { generateDinner } from './dinnerGenerator';
export { generateNonVegDish } from './nonVegGenerator';

// Export a helper for regional food integration
export const supportedRegions = [
  'north', 'south', 'east', 'west', 'central', 'northeast', 'andhra', 'arunachal', 'chhattisgarh',
  'assam', 'bihar', 'goa', 'gujarat', 'haryana', 'himachal', 'jharkhand', 'karnataka', 
  'madhyapradesh', 'maharashtra', 'kerala', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 
  'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamilnadu', 'telangana', 'tripura', 'uttarpradesh',
  'uttarakhand', 'westbengal'
];
