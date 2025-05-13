
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  mealItem: {
    marginBottom: 14, // Increased from 10 to 14
    padding: 10, // Increased from 8 to 10
    backgroundColor: '#f9f9f9',
    borderRadius: 3,
  },
  mealLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8, // Increased from 6 to 8
    fontFamily: 'Helvetica-Bold',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8, // Increased from 6 to 8
    alignItems: 'baseline',
  },
  mealDescription: {
    fontSize: 11,
    color: '#1e293b',
    lineHeight: 1.9, // Further increased line height for better readability
    fontFamily: 'Helvetica',
    letterSpacing: 0.25, // Increased letter spacing to prevent character overlap
    wordSpacing: 0.5, // Added word spacing for better readability
  },
  healthBenefitContainer: {
    marginTop: 6, // Increased from 4 to 6
    marginBottom: 8, // Increased from 6 to 8
  },
  healthBenefit: {
    fontSize: 10,
    color: '#16a34a',
    fontFamily: 'Helvetica',
    paddingLeft: 5,
    lineHeight: 1.9, // Increased line height
    letterSpacing: 0.25, // Increased letter spacing
    wordSpacing: 0.5, // Added word spacing
  },
  calorieInfo: {
    fontSize: 10,
    color: '#94a3b8',
    fontFamily: 'Helvetica',
    lineHeight: 1.9, // Increased line height
    letterSpacing: 0.25, // Increased letter spacing
    wordSpacing: 0.5, // Added word spacing
  },
  // Improved highlight styles with better spacing and increased line height
  localNamesHighlight: {
    color: '#6366f1',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    lineHeight: 1.9, // Increased
    letterSpacing: 0.25, // Increased letter spacing
    wordSpacing: 0.5, // Added word spacing
    padding: 0, 
    margin: 0,
  },
  indianMeasurementHighlight: {
    color: '#d97706',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    lineHeight: 1.9, // Increased
    letterSpacing: 0.25, // Increased letter spacing
    wordSpacing: 0.5, // Added word spacing
    padding: 0,
    margin: 0,
  },
  probioticHighlight: {
    color: '#4f46e5',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    lineHeight: 1.9, // Increased
    letterSpacing: 0.25, // Increased letter spacing
    wordSpacing: 0.5, // Added word spacing
    padding: 0,
    margin: 0,
  },
  prebioticHighlight: {
    color: '#059669',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    lineHeight: 1.9, // Increased
    letterSpacing: 0.25, // Increased letter spacing
    wordSpacing: 0.5, // Added word spacing
    padding: 0,
    margin: 0,
  }
});
