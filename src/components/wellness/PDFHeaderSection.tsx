
import React from 'react';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  logo: {
    width: 90,
    height: 90,
    margin: '0 auto',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#334155',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#64748b',
  },
});

interface PDFHeaderSectionProps {
  name: string;
}

const PDFHeaderSection = ({ name }: PDFHeaderSectionProps) => (
  <View>
    <Image
      src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png"
      style={styles.logo}
    />
    <Text style={styles.title}>Personalized 75-Day Wellness Plan</Text>
    <Text style={styles.subtitle}>Created for {name}</Text>
  </View>
);

export default PDFHeaderSection;
