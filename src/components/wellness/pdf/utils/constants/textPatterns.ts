
// Text highlighting patterns for meal descriptions

// Patterns for detecting local food names with dash notation
export const dashPattern = /([^,\.]+)(\s-\s[^,\.]+)/g;

// Patterns for Indian measurements
export const measurementPatterns = [
  /(\d+(?:\.\d+)?\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?)/i,
  /(\d+(?:\.\d+)?\s*(?:¼|½|¾)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?)/i,
  /(\((?:\d+(?:\.\d+)?|one|two|three|four|five|six)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?\))/i,
  /(\((?:\d+(?:\.\d+)?|one|two|three|four|five|six)\s*(?:¼|½|¾)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?\))/i,
  /(\d+\s*(?:roti|rotis|chapati|chapatis|phulka|phulkas|dhokla|dhoklas))/i,
  /(\(\d+\s*(?:roti|rotis|chapati|chapatis|phulka|phulkas|dhokla|dhoklas)\))/i,
  /(\(?(?:small|medium)?\s*handful\)?)/i,
  /(\((?:small|medium)?\s*handful\))/i
];

// Pattern for parenthetical local names
export const localNameRegex = /\(([^)]+)\)/g;
