
export { generateBreakfast } from './breakfast';
export { 
  generateMidMorningSnack, 
  generateEveningSnack, 
  generateSnacks,
  generateAfternoonSnack
} from './snacks';
export { generateLunch } from './lunchGenerator';
export { generateDinner } from './dinnerGenerator';

// Export a helper for regional food integration
export const supportedRegions = [
  'north', 'south', 'east', 'west', 'central', 'northeast', 'andhra', 'arunachal', 'chhattisgarh',
  'assam', 'bihar', 'goa', 'gujarat', 'haryana', 'himachal', 'jharkhand', 'karnataka', 
  'madhyapradesh', 'maharashtra'
];
