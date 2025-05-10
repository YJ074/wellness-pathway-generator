
import { StyleSheet } from '@react-pdf/renderer';

export const workoutPdfStyles = StyleSheet.create({
  planSection: {
    marginBottom: 15,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 6,
    borderRadius: 3,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  subsectionTitle: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 6,
    paddingLeft: 4,
    borderLeft: '2pt solid #e2e8f0',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  restDayText: {
    fontSize: 11,
    marginBottom: 8,
    lineHeight: 1.4,
    paddingLeft: 5,
    fontFamily: 'Helvetica',
  },
  exerciseItem: {
    marginBottom: 8,
    paddingLeft: 10,
  },
  bulletPoint: {
    fontSize: 11,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  exerciseLabel: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  calorieInfo: {
    fontSize: 11,
    marginTop: 8,
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    color: '#555',
    fontFamily: 'Helvetica',
  },
  difficultyLabel: {
    fontSize: 9,
    marginLeft: 5,
    padding: '2 5',
    borderRadius: 3,
    color: 'white',
    fontFamily: 'Helvetica',
  },
  beginnerLabel: {
    backgroundColor: '#22c55e', // green
  },
  intermediateLabel: {
    backgroundColor: '#f59e0b', // amber
  },
  advancedLabel: {
    backgroundColor: '#ef4444', // red
  },
  goalTag: {
    fontSize: 9,
    marginTop: 3,
    marginLeft: 10,
    padding: '1 4',
    borderRadius: 2,
    backgroundColor: '#e2e8f0',
    color: '#334155',
    fontFamily: 'Helvetica',
  },
  weekInfoContainer: {
    marginBottom: 6,
    marginTop: 4,
    borderLeft: '2pt solid #64748b',
    paddingLeft: 6,
  },
  weekInfo: {
    fontSize: 10,
    color: '#64748b',
    fontStyle: 'italic',
    fontFamily: 'Helvetica',
  },
  recoveryNote: {
    fontSize: 10,
    marginTop: 5,
    color: '#3b82f6',
    fontStyle: 'italic',
    fontFamily: 'Helvetica',
  }
});
