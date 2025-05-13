
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { getEstimatedCalories } from '../../utils/pdfCalorieUtils';
import { formatMealDescription } from '../utils/textFormatUtils';
import { styles } from '../styles/mealItemStyles';

interface PDFMealItemProps {
  label: string;
  description: string;
  mealType: string;
  dailyCalories: number;
  goalFactor: number;
}

// Enhanced helper function to normalize whitespace and deduplicate food items in text
const normalizeWhitespace = (text: string): string => {
  let processed = text
    .replace(/\s+/g, ' ')  // Replace multiple spaces with a single space
    .replace(/\s+,/g, ',') // Remove spaces before commas
    .replace(/,\s+/g, ', ') // Ensure exactly one space after commas
    .replace(/\s+\(/g, ' (') // Ensure only one space before parentheses
    .replace(/\)\s+/g, ') ') // Ensure only one space after parentheses
    .trim();
    
  // Deduplicate repeated food items in the same description
  // Build a comprehensive list of all possible food items that might get duplicated
  const foodItems = [
    "Chickoo", "cashews", "chia seeds", "flax seeds", "almonds", 
    "walnuts", "sprouts", "Dandelion Greens", "peanuts", "yogurt",
    "curd", "dahi", "kombucha", "kefir", "buttermilk", "chaas",
    "sunflower seeds", "pumpkin seeds", "sesame seeds",
    "Banana", "Apple", "Mango", "Orange", "Papaya", "Watermelon",
    "Grapes", "Pomegranate", "Kiwi", "Berries", "Strawberries",
    "Blueberries", "Raspberries", "Blackberries", "Pineapple",
    "Guava", "Litchi", "Jackfruit", "Sapota", "Custard Apple"
  ];
  
  // Deduplicate each food item
  for (const food of foodItems) {
    const regex = new RegExp(`(with|and)\\s+${food}\\s+\\([^)]+\\)([^,]*),\\s*(with|and)\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    processed = processed.replace(regex, '$1 $2 ($3)$4');
    
    // More aggressive pattern - any duplicates regardless of connector
    const anyDuplicateRegex = new RegExp(`((?:with|and)\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*(?:with|and)\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    processed = processed.replace(anyDuplicateRegex, '$1');
  }
  
  // Fix multiple commas that might appear after deduplication
  processed = processed.replace(/,\s*,/g, ',');
  
  return processed;
};

const PDFMealItem = ({ 
  label, 
  description, 
  mealType, 
  dailyCalories, 
  goalFactor 
}: PDFMealItemProps) => {
  // Extract health benefit if present in the description
  const benefitMatch = description.match(/ - \((Contains [^)]+|[^)]+health|[^)]+sources|[^)]+protein|[^)]+enzymes|[^)]+antioxidants)\)$/);
  let healthBenefit = null;
  let mealDescription = description;
  
  if (benefitMatch && benefitMatch[0]) {
    healthBenefit = benefitMatch[1];
    mealDescription = description.replace(benefitMatch[0], '');
  }
  
  // Normalize whitespace and deduplicate before formatting
  mealDescription = normalizeWhitespace(mealDescription);
  
  // Format the meal description to highlight special terms and deduplicate repeated portions
  const formattedDescription = formatMealDescription(mealDescription);
  
  return (
    <View style={styles.mealItem} wrap={false}>
      <Text style={styles.mealLabel}>• {label}</Text>
      
      <View style={styles.descriptionContainer}>
        {formattedDescription.map((segment, index) => {
          if (typeof segment === 'string') {
            return <Text key={`text-${index}`} style={styles.mealDescription}>{segment}</Text>;
          }
          return React.cloneElement(segment as React.ReactElement, { key: `segment-${index}` });
        })}
      </View>
      
      {healthBenefit && (
        <View style={styles.healthBenefitContainer}>
          <Text style={styles.healthBenefit}>
            ♥ {healthBenefit}
          </Text>
        </View>
      )}
      
      <Text style={styles.calorieInfo}>
        Calories: {getEstimatedCalories(mealType, dailyCalories, goalFactor)} kcal
      </Text>
    </View>
  );
};

export default PDFMealItem;
