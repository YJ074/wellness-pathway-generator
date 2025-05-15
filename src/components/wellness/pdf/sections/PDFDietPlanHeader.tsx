
import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
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
});

const PDFDietPlanHeader = () => {
  return <Text style={styles.sectionTitle}>Diet Plan</Text>;
};

export default PDFDietPlanHeader;
