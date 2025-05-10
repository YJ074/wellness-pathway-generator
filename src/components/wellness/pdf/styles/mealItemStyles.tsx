
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
    fontStyle: 'italic',
    fontFamily: 'Helvetica-Oblique',
  }
});
