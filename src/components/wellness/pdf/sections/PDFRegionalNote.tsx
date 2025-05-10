
import React, { memo } from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  regionalNoteBox: {
    backgroundColor: '#fff8e6', 
    marginBottom: 8,
    padding: 8,
    borderRadius: 3,
  },
  regionalNoteText: {
    fontSize: 11,
    fontFamily: 'Helvetica',
    // Removed fontStyle: 'italic' that was causing issues
    lineHeight: 1.4,
  },
});

interface PDFRegionalNoteProps {
  regionalNote?: string;
}

const PDFRegionalNote = ({ regionalNote }: PDFRegionalNoteProps) => {
  if (!regionalNote) return null;
  
  return (
    <View style={styles.regionalNoteBox}>
      <Text style={styles.regionalNoteText}>{regionalNote}</Text>
    </View>
  );
};

export default memo(PDFRegionalNote);
