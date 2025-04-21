
import React from 'react';
import { View, Text } from '@react-pdf/renderer';

const styles = {
  metricsSection: {
    marginBottom: 20,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
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
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#334155',
  },
  metricSubtext: {
    fontSize: 8,
    color: '#64748b',
  },
};

interface PDFMetricsSectionProps {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  dailyCalories: number;
}

const PDFMetricsSection = ({
  bmi,
  bmiCategory,
  bmr,
  dailyCalories,
}: PDFMetricsSectionProps) => (
  <View style={styles.metricsSection}>
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>BMI</Text>
      <Text style={styles.metricValue}>{bmi.toFixed(1)}</Text>
      <Text style={styles.metricSubtext}>Category: {bmiCategory}</Text>
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

