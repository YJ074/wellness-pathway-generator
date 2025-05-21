
/**
 * Helper functions for protein name localization
 */

// Helper to format protein names with local equivalents
export const getLocalizedProteinName = (protein: string): string => {
  if (protein === 'Paneer' && !protein.includes('(')) {
    return 'Paneer (Indian Cottage Cheese)';
  } else if (protein === 'Tofu' && !protein.includes('(')) {
    return 'Tofu (Soya Paneer)';
  } else if (protein === 'Chana' && !protein.includes('(')) {
    return 'Chana (Chickpeas)';
  } else if (protein === 'Rajma' && !protein.includes('(')) {
    return 'Rajma (Kidney Beans)';
  } else if (protein === 'Soya Chunks' && !protein.includes('(')) {
    return 'Soya Chunks (High-Protein Nuggets)';
  } else if (protein === 'Tempeh' && !protein.includes('(')) {
    return 'Tempeh (Fermented Soybean Cake)';
  } else if (protein === 'Seitan' && !protein.includes('(')) {
    return 'Seitan (Wheat Protein)';
  } else if (protein.includes('Millet') && !protein.includes('(')) {
    // Add explanations for millet varieties
    if (protein.includes('Ragi')) {
      return protein.includes('(') ? protein : `${protein} (Finger Millet, rich in calcium)`;
    } else if (protein.includes('Bajra')) {
      return protein.includes('(') ? protein : `${protein} (Pearl Millet, high in iron)`;
    } else if (protein.includes('Jowar')) {
      return protein.includes('(') ? protein : `${protein} (Sorghum Millet, good for digestion)`;
    } else if (protein.includes('Foxtail')) {
      return protein.includes('(') ? protein : `${protein} (Kangni, low glycemic index)`;
    } else if (protein.includes('Little')) {
      return protein.includes('(') ? protein : `${protein} (Kutki, high in fiber)`;
    } else if (protein.includes('Barnyard')) {
      return protein.includes('(') ? protein : `${protein} (Sanwa, high in micronutrients)`;
    } else if (protein.includes('Kodo')) {
      return protein.includes('(') ? protein : `${protein} (Kodra, high in fiber and minerals)`;
    } else if (protein.includes('Proso')) {
      return protein.includes('(') ? protein : `${protein} (Cheena, good for weight management)`;
    }
    return protein.includes('(') ? protein : `${protein} (nutrient-dense ancient grain)`;
  }
  return protein;
};
