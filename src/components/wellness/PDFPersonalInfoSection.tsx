
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormData } from './types';

const styles = {
  infoSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 5,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    marginBottom: 5,
    color: '#334155',
  },
  infoGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
  },
  infoItem: {
    width: '50%',
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  infoValue: {
    fontSize: 12,
    color: '#334155',
  },
};

interface PDFPersonalInfoSectionProps {
  formData: FormData;
}

const PDFPersonalInfoSection = ({ formData }: PDFPersonalInfoSectionProps) => {
  // Format dietary preference properly
  const formatDietaryPreference = (pref: string) => {
    if (pref === 'pure-jain') return 'Jain';
    
    return pref
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <View style={styles.infoSection}>
      <Text style={styles.infoTitle}>Personal Information</Text>
      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Age:</Text>
          <Text style={styles.infoValue}>{formData.age} years</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Gender:</Text>
          <Text style={styles.infoValue}>
            {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Weight:</Text>
          <Text style={styles.infoValue}>{formData.weight} kg</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Height:</Text>
          <Text style={styles.infoValue}>
            {formData.height
              ? `${formData.height} cm`
              : `${formData.heightFeet || '0'}ft ${formData.heightInches || '0'}in`}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Diet Preference:</Text>
          <Text style={styles.infoValue}>
            {formatDietaryPreference(formData.dietaryPreference)}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Fitness Goal:</Text>
          <Text style={styles.infoValue}>
            {formData.fitnessGoal
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PDFPersonalInfoSection;
