
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    padding: 10, // Increased from 8
    backgroundColor: '#fef7ed',
    borderRadius: 3,
    border: '1pt solid #fed7aa',
  },
  header: {
    fontSize: 10, // Increased from 9
    fontFamily: 'Helvetica-Bold',
    color: '#c2410c',
    marginBottom: 8, // Increased from 6
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 6, // Increased from 4
    fontSize: 10, // Increased from 9
  },
  tipsList: {
    marginBottom: 8, // Increased from 6
  },
  tip: {
    fontSize: 9, // Increased from 8
    color: '#c2410c',
    marginBottom: 4, // Increased from 3
    flexDirection: 'row',
    alignItems: 'flex-start',
    lineHeight: 1.6, // Increased from 1.4
  },
  tipBullet: {
    marginRight: 6, // Increased from 4
    fontSize: 9, // Increased from 8
    fontFamily: 'Helvetica-Bold',
    minWidth: 8, // Added minimum width to prevent overlap
  },
  tipText: {
    flex: 1,
    lineHeight: 1.6, // Increased from 1.4
    fontFamily: 'Helvetica',
    letterSpacing: 0.2, // Added letter spacing
    wordSpacing: 0.3, // Added word spacing
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6, // Increased from 4
    paddingTop: 6, // Increased from 4
    borderTop: '0.5pt solid #fed7aa',
  },
  footerItem: {
    fontSize: 8, // Increased from 7
    color: '#c2410c',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Helvetica',
  },
  footerIcon: {
    marginRight: 4, // Increased from 3
    fontSize: 8, // Increased from 7
  }
});

interface PDFMealPreparationProps {
  mealDescription: string;
  mealType: string;
}

const PDFMealPreparation = ({ mealDescription, mealType }: PDFMealPreparationProps) => {
  const getPreparationInstructions = (meal: string, type: string) => {
    const lowerMeal = meal.toLowerCase();
    const instructions = [];
    
    if (lowerMeal.includes('roti') || lowerMeal.includes('chapati')) {
      instructions.push("Knead dough with warm water, rest 15-20 min before rolling");
      instructions.push("Cook on medium-high heat, puff on direct flame");
    }
    
    if (lowerMeal.includes('dal') || lowerMeal.includes('lentil')) {
      instructions.push("Soak lentils 30 min, cook with turmeric and salt");
      instructions.push("Add tempering of cumin, mustard seeds, curry leaves");
    }
    
    if (lowerMeal.includes('rice')) {
      instructions.push("Rinse rice until clear, use 1:2 rice to water ratio");
      instructions.push("Cook 15-18 min, rest 5 min before serving");
    }
    
    if (lowerMeal.includes('curry') || lowerMeal.includes('sabzi')) {
      instructions.push("Heat oil, add whole spices first, then golden onions");
      instructions.push("Add ginger-garlic paste, cook until fragrant");
    }
    
    if (lowerMeal.includes('salad')) {
      instructions.push("Wash vegetables thoroughly, chop before serving");
      instructions.push("Add lemon juice and salt just before eating");
    }
    
    if (lowerMeal.includes('sprouts')) {
      instructions.push("Soak overnight, tie in cloth, keep in dark 12-24 hrs");
      instructions.push("Rinse 2-3 times daily until sprouts appear");
    }
    
    if (lowerMeal.includes('paneer')) {
      instructions.push("Use fresh paneer, soak in warm water before cooking");
      instructions.push("Add paneer at end to prevent becoming rubbery");
    }
    
    // General tips based on meal type
    if (type === 'breakfast') {
      instructions.push("Prepare fresh for best nutrition and taste");
    } else if (type === 'lunch') {
      instructions.push("Serve with fresh curd or buttermilk for digestion");
    } else if (type === 'dinner') {
      instructions.push("Keep light and easy to digest");
    }
    
    if (instructions.length === 0) {
      instructions.push("Use fresh ingredients for best taste and nutrition");
      instructions.push("Season to taste with preferred spices");
    }
    
    return instructions.slice(0, 3); // Limit to 3 tips for PDF space
  };

  const preparationTips = getPreparationInstructions(mealDescription, mealType);

  return (
    <View style={styles.container} wrap={false}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>👩‍🍳</Text>
        <Text>Preparation Guide</Text>
      </View>
      
      <View style={styles.tipsList}>
        {preparationTips.map((tip, index) => (
          <View key={index} style={styles.tip}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerIcon}>⏰</Text>
          <Text>Prep: 10-15 min</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerIcon}>🔥</Text>
          <Text>Cook: Medium heat</Text>
        </View>
      </View>
    </View>
  );
};

export default PDFMealPreparation;
