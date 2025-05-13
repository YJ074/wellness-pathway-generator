
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
    marginBottom: 6, // Increased from 4 to provide more spacing
    fontFamily: 'Helvetica-Bold',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
    alignItems: 'baseline',
  },
  mealDescription: {
    fontSize: 11,
    color: '#1e293b',
    lineHeight: 1.5,
    fontFamily: 'Helvetica',
  },
  healthBenefitContainer: {
    marginTop: 4,
    marginBottom: 6,
  },
  healthBenefit: {
    fontSize: 10,
    color: '#16a34a',
    fontFamily: 'Helvetica',
    paddingLeft: 5,
    lineHeight: 1.4,
  },
  calorieInfo: {
    fontSize: 10,
    color: '#94a3b8',
    fontFamily: 'Helvetica',
    lineHeight: 1.4, // Added line height to improve readability
  },
  // Improved highlight styles with better spacing to prevent overlapping
  localNamesHighlight: {
    color: '#6366f1',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    lineHeight: 1.5,
    padding: 0, 
    margin: 0,
  },
  indianMeasurementHighlight: {
    color: '#d97706',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    lineHeight: 1.5,
    padding: 0,
    margin: 0,
  },
  probioticHighlight: {
    color: '#4f46e5',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    lineHeight: 1.5,
    padding: 0,
    margin: 0,
  },
  prebioticHighlight: {
    color: '#059669',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    lineHeight: 1.5,
    padding: 0,
    margin: 0,
  }
});
