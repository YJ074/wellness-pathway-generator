
import { AuthenticDinnerRegions } from '../data/authenticDinnerOptions';

/**
 * Get region key for authentic dinner options
 */
export const getRegionKey = (region?: string): AuthenticDinnerRegions => {
  if (!region) return 'north';
  
  const regionMap: Record<string, AuthenticDinnerRegions> = {
    'punjab': 'north',
    'haryana': 'north',
    'uttarpradesh': 'north',
    'delhi': 'north',
    'himachal': 'north',
    'uttarakhand': 'north',
    'kerala': 'south',
    'tamilnadu': 'south',
    'karnataka': 'south',
    'andhra': 'south',
    'telangana': 'south',
    'gujarat': 'west',
    'maharashtra': 'west',
    'rajasthan': 'west',
    'goa': 'west',
    'westbengal': 'east',
    'odisha': 'east',
    'bihar': 'east',
    'jharkhand': 'east',
    'madhyapradesh': 'central',
    'chhattisgarh': 'central',
    'assam': 'northeast',
    'manipur': 'northeast',
    'meghalaya': 'northeast',
    'nagaland': 'northeast'
  };
  
  return regionMap[region.toLowerCase()] || 'north';
};
