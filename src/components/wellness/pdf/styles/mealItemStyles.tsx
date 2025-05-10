
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  mealItem: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 3,
  },
  mealLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
  },
  mealDescription: {
    fontSize: 11,
    color: '#1e293b',
    marginBottom: 6,
    lineHeight: 1.5,
    fontFamily: 'Helvetica',
  },
  calorieInfo: {
    fontSize: 10,
    color: '#94a3b8',
    fontFamily: 'Helvetica',
  },
  healthBenefit: {
    fontSize: 10,
    color: '#16a34a',
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  // Highlight styles for food descriptions with improved contrast and spacing
  localNamesHighlight: {
    color: '#6366f1', // indigo color for local names
    fontFamily: 'Helvetica-Bold',
    // Remove display: 'inline' as it's not supported in react-pdf/renderer
    padding: 0, 
    margin: 0,
  },
  indianMeasurementHighlight: {
    color: '#d97706', // amber color for Indian measurements
    fontFamily: 'Helvetica-Bold',
    // Remove display: 'inline' as it's not supported in react-pdf/renderer
    padding: 0,
    margin: 0,
  },
  probioticHighlight: {
    color: '#4f46e5', // indigo for probiotic foods
    fontFamily: 'Helvetica-Bold',
    // Remove display: 'inline' as it's not supported in react-pdf/renderer
    padding: 0,
    margin: 0,
  },
  prebioticHighlight: {
    color: '#059669', // emerald for prebiotic foods
    fontFamily: 'Helvetica-Bold',
    // Remove display: 'inline' as it's not supported in react-pdf/renderer
    padding: 0,
    margin: 0,
  }
});
