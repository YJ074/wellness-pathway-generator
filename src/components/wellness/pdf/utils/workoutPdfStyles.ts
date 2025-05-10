
import { StyleSheet } from '@react-pdf/renderer';

export const workoutPdfStyles = StyleSheet.create({
  planSection: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
    marginRight: 8,
  },
  difficultyLabel: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 8,
  },
  beginnerLabel: {
    backgroundColor: '#dcfce7', // Light green
    color: '#166534', // Dark green
  },
  intermediateLabel: {
    backgroundColor: '#dbeafe', // Light blue
    color: '#1e40af', // Dark blue
  },
  advancedLabel: {
    backgroundColor: '#fef9c3', // Light yellow
    color: '#854d0e', // Dark yellow
  },
  subsectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginTop: 8,
    marginBottom: 4,
  },
  exerciseItem: {
    marginBottom: 3,
  },
  bulletPoint: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    marginLeft: 5,
  },
  goalTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    marginLeft: 5,
    fontSize: 8,
  },
  calorieInfo: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    marginTop: 10,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  weekInfoContainer: {
    backgroundColor: '#e5e7eb',
    marginVertical: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  weekInfo: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#4b5563',
  },
  restDayText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6b7280',
    marginLeft: 8,
    marginTop: 10,
  },
  progressionInfo: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4b5563',
    marginBottom: 5,
  },
  recoveryNote: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4b5563',
    marginLeft: 8,
    marginTop: 3,
    marginBottom: 6,
  },
});
