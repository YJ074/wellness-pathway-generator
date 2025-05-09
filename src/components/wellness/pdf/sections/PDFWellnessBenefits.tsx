
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  wellnessBox: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#e6f2ff',
    borderRadius: 3,
  },
  wellnessTitle: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0066cc',
  },
  wellnessItem: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  herbalTitle: {
    fontSize: 11,
    marginTop: 4,
    marginBottom: 2,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
});

interface PDFWellnessBenefitsProps {
  hairNutrients?: string;
  skinNutrients?: string;
  fatLossNotes?: string;
  herbalRecommendations?: string[];
}

const PDFWellnessBenefits = ({ 
  hairNutrients, 
  skinNutrients, 
  fatLossNotes, 
  herbalRecommendations 
}: PDFWellnessBenefitsProps) => {
  // Check if we have any wellness benefits to display
  const hasWellnessBenefits = hairNutrients || skinNutrients || fatLossNotes || 
                             (herbalRecommendations && herbalRecommendations.length > 0);
                             
  if (!hasWellnessBenefits) return null;
  
  return (
    <View style={styles.wellnessBox}>
      <Text style={styles.wellnessTitle}>Wellness Benefits</Text>
      
      {hairNutrients && (
        <Text style={styles.wellnessItem}>• Hair Health: {hairNutrients}</Text>
      )}
      
      {skinNutrients && (
        <Text style={styles.wellnessItem}>• Skin Health: {skinNutrients}</Text>
      )}
      
      {fatLossNotes && (
        <Text style={styles.wellnessItem}>• Weight Management: {fatLossNotes}</Text>
      )}
      
      {herbalRecommendations && herbalRecommendations.length > 0 && (
        <View>
          <Text style={styles.herbalTitle}>Recommended Beverages:</Text>
          {herbalRecommendations.map((herb, index) => (
            <Text key={index} style={styles.wellnessItem}>• {herb}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default PDFWellnessBenefits;
