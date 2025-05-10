
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { prebioticFoods, probioticFoods } from '@/utils/diet/helpers/prebioticProbioticHelper';
import { styles } from '../../styles/mealItemStyles';

// Process probiotic foods
export const processProbioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const probioticSegments: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    if (typeof segment !== 'string') {
      probioticSegments.push(segment);
      continue;
    }
    
    let processed = false;
    
    for (const probiotic of probioticFoods) {
      const regex = new RegExp(`(${probiotic})`, 'i');
      if (regex.test(segment)) {
        const parts = segment.split(regex);
        
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].toLowerCase() === probiotic.toLowerCase()) {
            probioticSegments.push(
              <Text 
                key={`prob-${segmentId++}`} 
                style={styles.probioticHighlight}
              >
                {parts[i]}
              </Text>
            );
          } else if (parts[i]) {
            probioticSegments.push(parts[i]);
          }
        }
        
        processed = true;
        break;
      }
    }
    
    if (!processed) {
      probioticSegments.push(segment);
    }
  }
  
  return probioticSegments;
};

// Process prebiotic foods
export const processPrebioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const prebioticSegments: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    if (typeof segment !== 'string') {
      prebioticSegments.push(segment);
      continue;
    }
    
    let processed = false;
    
    for (const prebiotic of prebioticFoods) {
      const regex = new RegExp(`(${prebiotic})`, 'i');
      if (regex.test(segment)) {
        const parts = segment.split(regex);
        
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].toLowerCase() === prebiotic.toLowerCase()) {
            prebioticSegments.push(
              <Text 
                key={`pre-${segmentId++}`} 
                style={styles.prebioticHighlight}
              >
                {parts[i]}
              </Text>
            );
          } else if (parts[i]) {
            prebioticSegments.push(parts[i]);
          }
        }
        
        processed = true;
        break;
      }
    }
    
    if (!processed) {
      prebioticSegments.push(segment);
    }
  }
  
  return prebioticSegments;
};
