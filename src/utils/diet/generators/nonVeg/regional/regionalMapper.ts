
/**
 * Helper to map state names to broader regions for non-vegetarian dishes
 */

// Map of state codes to broader regions
export const stateToRegionMap: Record<string, string> = {
  // North
  'punjab': 'north',
  'haryana': 'north',
  'himachalpradesh': 'north',
  'himachal': 'north',
  'uttarakhand': 'north',
  'delhi': 'north',
  'jammuandkashmir': 'north',
  
  // South
  'kerala': 'south',
  'tamilnadu': 'south',
  'karnataka': 'south',
  'andhrapradesh': 'south',
  'andhra': 'south',
  'telangana': 'south',
  
  // East
  'westbengal': 'east',
  'odisha': 'east',
  'bihar': 'east',
  'jharkhand': 'east',
  
  // West
  'maharashtra': 'west',
  'gujarat': 'west',
  'goa': 'west',
  'rajasthan': 'west',
  
  // Central
  'madhyapradesh': 'central',
  'chhattisgarh': 'central',
  'uttarpradesh': 'central',
  
  // Northeast
  'arunachal': 'northeast',
  'arunachalpradesh': 'northeast',
  'assam': 'northeast',
  'manipur': 'northeast',
  'meghalaya': 'northeast',
  'mizoram': 'northeast',
  'nagaland': 'northeast',
  'sikkim': 'northeast',
  'tripura': 'northeast'
};

/**
 * Map a state code to its broader region
 * @param stateCode - The state code to map
 * @returns The mapped region code or undefined if not found
 */
export const mapStateToRegion = (stateCode: string): string | undefined => {
  // Convert to lowercase for case-insensitive matching
  const lowerCaseCode = stateCode.toLowerCase();
  
  // Check for direct match
  if (stateToRegionMap[lowerCaseCode]) {
    return stateToRegionMap[lowerCaseCode];
  }
  
  // No match found
  return undefined;
};

/**
 * Check if a state code belongs to a specific region
 * @param stateCode - The state code to check
 * @param regionCode - The region code to check against
 * @returns True if the state belongs to the region, false otherwise
 */
export const isStateInRegion = (stateCode: string, regionCode: string): boolean => {
  const mappedRegion = mapStateToRegion(stateCode);
  return mappedRegion === regionCode.toLowerCase();
};
