
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
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#64748b',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
});

interface PDFHeaderSectionProps {
  name: string;
}

const PDFHeaderSection = ({ name }: PDFHeaderSectionProps) => {
  // Use a static image URL for PDF generation that's publicly accessible
  const logoUrl = "https://lovable-uploads.s3.amazonaws.com/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png";
  
  return (
    <View>
      <Image
        src={logoUrl}
        style={styles.logo}
      />
      <Text style={styles.title}>Personalized 75-Day Wellness Plan</Text>
      <Text style={styles.subtitle}>Created for {name}</Text>
    </View>
  );
};

export default PDFHeaderSection;
