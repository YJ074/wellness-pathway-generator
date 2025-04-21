
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { DietPlan, FormData } from './types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  logo: {
    width: 90,
    height: 90,
    margin: '0 auto',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  dayBlock: {
    marginBottom: 28,
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 12,
  },
  dayHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: '#334155',
    fontWeight: 'bold',
  },
  mealLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#3b3b3b',
  },
  mealText: {
    fontSize: 12,
    marginBottom: 2
  }
});

interface WellnessPDFProps {
  formData: FormData;
  dietPlan: DietPlan;
}

const WellnessPDF = ({ formData, dietPlan }: WellnessPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" style={styles.logo} />
      <Text style={styles.title}>
        Personalized 75-Day Diet Plan for {formData.name}
      </Text>
      {dietPlan.days.map((dietDay) => (
        <View key={dietDay.day} style={styles.dayBlock}>
          <Text style={styles.dayHeader}>Day {dietDay.day} Diet Plan</Text>
          <View>
            <Text style={styles.mealLabel}>Breakfast:</Text>
            <Text style={styles.mealText}>{dietDay.breakfast}</Text>
            <Text style={styles.mealLabel}>Lunch:</Text>
            <Text style={styles.mealText}>{dietDay.lunch}</Text>
            <Text style={styles.mealLabel}>Dinner:</Text>
            <Text style={styles.mealText}>{dietDay.dinner}</Text>
            <Text style={styles.mealLabel}>Snacks:</Text>
            <Text style={styles.mealText}>{dietDay.snacks}</Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default WellnessPDF;
