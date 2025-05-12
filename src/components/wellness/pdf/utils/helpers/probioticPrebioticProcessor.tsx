
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { prebioticFoods, probioticFoods } from '@/utils/diet/helpers/prebioticProbioticHelper';
import { styles } from '../../styles/mealItemStyles';

// Process probiotic foods with improved handling to prevent text overlapping
export const processProbioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const probioticSegments: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    if (typeof segment !== 'string') {
      probioticSegments.push(segment);
      continue;
    }
    
    // Skip processing if this is a health benefit note
    if (segment.startsWith('Contains probiotics for gut health') || 
        segment.startsWith('♥ Contains probiotics')) {
      probioticSegments.push(segment);
      continue;
    }
    
    let processed = false;
    let tmpSegment = segment;
    
    for (const probiotic of probioticFoods) {
      const regex = new RegExp(`\\b(${probiotic})\\b`, 'i'); // Use word boundaries for more precise matching
      
      if (regex.test(tmpSegment)) {
        const parts = tmpSegment.split(regex);
        const newSegments = [];
        
        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) {
            newSegments.push(parts[i]);
          }
          
          if (i < parts.length - 1) {
            newSegments.push(
              <Text 
                key={`prob-${segmentId++}`} 
                style={styles.probioticHighlight}
              >
                {tmpSegment.match(regex)?.[0] || probiotic}
              </Text>
            );
          }
        }
        
        // Replace the current segment with processed parts
        for (const newSeg of newSegments) {
          probioticSegments.push(newSeg);
        }
        
        processed = true;
        break;
      }
    }
    
    if (!processed) {
      probioticSegments.push(tmpSegment);
    }
  }
  
  return probioticSegments;
};

// Process prebiotic foods with improved handling to prevent text overlapping
export const processPrebioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const prebioticSegments: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    if (typeof segment !== 'string') {
      prebioticSegments.push(segment);
      continue;
    }
    
    // Skip processing if this is a health benefit note
    if (segment.startsWith('Contains probiotics for gut health') || 
        segment.startsWith('♥ Contains')) {
      prebioticSegments.push(segment);
      continue;
    }
    
    let processed = false;
    let tmpSegment = segment;
    
    for (const prebiotic of prebioticFoods) {
      const regex = new RegExp(`\\b(${prebiotic})\\b`, 'i'); // Use word boundaries for more precise matching
      
      if (regex.test(tmpSegment)) {
        const parts = tmpSegment.split(regex);
        const newSegments = [];
        
        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) {
            newSegments.push(parts[i]);
          }
          
          if (i < parts.length - 1) {
            newSegments.push(
              <Text 
                key={`pre-${segmentId++}`} 
                style={styles.prebioticHighlight}
              >
                {tmpSegment.match(regex)?.[0] || prebiotic}
              </Text>
            );
          }
        }
        
        // Replace the current segment with processed parts
        for (const newSeg of newSegments) {
          prebioticSegments.push(newSeg);
        }
        
        processed = true;
        break;
      }
    }
    
    if (!processed) {
      prebioticSegments.push(tmpSegment);
    }
  }
  
  return prebioticSegments;
};
