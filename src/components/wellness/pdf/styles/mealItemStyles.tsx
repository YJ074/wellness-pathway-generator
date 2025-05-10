
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  mealItem: {
    marginBottom: 12,
  },
  mealLabel: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Helvetica',
    fontWeight: 700,
  },
  mealDescription: {
    fontSize: 11,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
    fontWeight: 400,
  },
  calorieInfo: {
    fontSize: 11,
    color: '#555',
    marginBottom: 4,
    fontFamily: 'Helvetica',
    fontWeight: 400,
  },
  localNamesHighlight: {
    fontFamily: 'Helvetica-Bold',
  },
  prebioticHighlight: {
    fontFamily: 'Helvetica-Bold',
    color: '#228B22', // Forest green
  },
  probioticHighlight: {
    fontFamily: 'Helvetica-Bold',
    color: '#1E90FF', // Dodger blue
  },
  indianMeasurementHighlight: {
    fontFamily: 'Helvetica-Bold',
    color: '#8B4513', // SaddleBrown
  }
});
