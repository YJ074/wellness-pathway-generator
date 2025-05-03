
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  metricsSection: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBox: {
    width: '30%',
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 5,
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748b',
    fontFamily: 'Helvetica',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
    fontFamily: 'Helvetica-Bold',
  },
  metricSubtext: {
    fontSize: 8,
    color: '#64748b',
    fontFamily: 'Helvetica',
  },
  muscleNote: {
    fontSize: 7,
    fontStyle: 'italic',
    color: '#1d4ed8',
    marginTop: 2,
    fontFamily: 'Helvetica',
  }
});

interface PDFMetricsSectionProps {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  dailyCalories: number;
  hasMuscularBuild?: boolean;
}

const PDFMetricsSection = ({
  bmi,
  bmiCategory,
  bmr,
  dailyCalories,
  hasMuscularBuild
}: PDFMetricsSectionProps) => (
  <View style={styles.metricsSection}>
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>BMI</Text>
      <Text style={styles.metricValue}>{bmi.toFixed(1)}</Text>
      <Text style={styles.metricSubtext}>Category: {bmiCategory}</Text>
      {hasMuscularBuild && (
        <Text style={styles.muscleNote}>
          This BMI is likely influenced by lean muscle mass, not excess fat.
        </Text>
      )}
    </View>
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>Base Metabolic Rate</Text>
      <Text style={styles.metricValue}>{bmr} kcal</Text>
      <Text style={styles.metricSubtext}>Calories at rest</Text>
    </View>
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>Daily Target</Text>
      <Text style={styles.metricValue}>{dailyCalories} kcal</Text>
      <Text style={styles.metricSubtext}>Adjusted for your goal</Text>
    </View>
  </View>
);

export default PDFMetricsSection;
