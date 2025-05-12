
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
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  mealDescription: {
    fontSize: 11,
    color: '#1e293b',
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
    fontFamily: 'Helvetica',
    marginTop: 2,
    paddingLeft: 5,
    marginBottom: 6,
  },
  // Improved highlight styles for better text rendering without overlapping
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
