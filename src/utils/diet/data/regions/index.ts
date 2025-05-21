
import { RegionalFoodData } from './types';
import { northIndiaFoods } from './north';
import { southIndiaFoods } from './south';
import { eastIndiaFoods } from './east';
import { westIndiaFoods } from './west';
import { centralIndiaFoods } from './central';
import { northeastIndiaFoods } from './northeast';
import { andhraFoods } from './andhra';
import { arunachalFoods } from './arunachal';
import { assamFoods, chhattisgarhFoods } from './indian-states';
import { biharFoods, goaFoods } from './more-states';

// Map of all regional foods
const regionalFoodsMap: Record<string, RegionalFoodData> = {
  'north': northIndiaFoods,
  'south': southIndiaFoods,
  'east': eastIndiaFoods,
  'west': westIndiaFoods,
  'central': centralIndiaFoods,
  'northeast': northeastIndiaFoods,
  'andhra': andhraFoods,
  'arunachal': arunachalFoods,
  'chhattisgarh': chhattisgarhFoods,
  'assam': assamFoods,
  'bihar': biharFoods,
  'goa': goaFoods,
  // For brevity, remaining states would be imported and added here
  // In a complete implementation, all states would have their own files
};

// List of all supported regions for export
export const supportedRegions = [
  'north', 'south', 'east', 'west', 'central', 'northeast', 'andhra', 'arunachal', 'chhattisgarh',
  'assam', 'bihar', 'goa', 'gujarat', 'haryana', 'himachal', 'jharkhand', 'karnataka', 
  'madhyapradesh', 'maharashtra', 'kerala', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 
  'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamilnadu', 'telangana', 'tripura', 'uttarpradesh',
  'uttarakhand', 'westbengal'
];

// Helper function to get regional foods
export function getRegionalFoods(region?: string): RegionalFoodData {
  const defaultRegion = {
    breakfast: [],
    mains: [],
    snacks: []
  };
  
  if (!region) return defaultRegion;
  
  return regionalFoodsMap[region.toLowerCase()] || defaultRegion;
}
