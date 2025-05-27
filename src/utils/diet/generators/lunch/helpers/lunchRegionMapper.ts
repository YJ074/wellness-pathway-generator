
import { AuthenticLunchRegions } from '../data/authenticLunchOptions';

/**
 * Get region key for authentic lunch options
 */
export const getRegionKey = (region?: string): AuthenticLunchRegions => {
  if (!region) return 'north';
  
  const regionMap: Record<string, AuthenticLunchRegions> = {
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
