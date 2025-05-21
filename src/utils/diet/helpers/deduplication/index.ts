
// Export main deduplication functions
export { deduplicateMealDescription, removeDuplicateOptions } from './normalization';
export { detectDuplication } from './detection';
export { applyTriplePassDeduplication } from './formatting';

// Also export the PDF-specific normalizer for enhanced deduplication in PDFs
export { normalizeMealForPDF } from './mealNormalization/pdfNormalizer';
