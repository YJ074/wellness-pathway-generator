
import { DietaryPreference } from '../../types';
import { filterAllergies } from '../../helpers/allergyHelpers';

export const getGrainSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  // Grains are mostly the same for all dietary preferences
  const allGrains = dietaryPreference === 'jain' ? [
      'Rice (Local Variety)', 'Wheat Roti', 'Jowar Roti (Sorghum Flatbread)',
      'Bajra Roti (Pearl Millet Flatbread)', 'Multigrain Roti', 'Poha (Rice Flakes)',
      'Foxtail Millet Roti', 'Barley Roti (Jau Roti)', 'Rice Flakes (Poha)',
      'White Rice (Safed Chaval)', 'Red Rice', 'Barnyard Millet Khichdi',
      'Little Millet Roti', 'Amaranth Roti (Rajgira Roti)', 
      'Buckwheat Roti (Kuttu Roti)'
    ] : [
      'Rice (Local Variety)', 'Wheat Roti', 'Ragi Roti (Finger Millet Roti)', 'Jowar Roti (Sorghum Roti)',
      'Bajra Roti (Pearl Millet Roti)', 'Multigrain Roti', 'Poha (Rice Flakes)', 
      'Kodo Millet Roti', 'Proso Millet Upma',
      'Suji Roti (Semolina Roti)', 'Barley Roti (Jau Roti)', 'Mixed Millet Roti', 'Rice Flakes (Poha)',
      'Brown Rice (Bhura Chaval)', 'Black Rice', 'Red Rice', 'Hand-Pound Rice',
      'Foxtail Millet Roti', 'Little Millet Roti',
      'Amaranth Roti (Rajgira Roti)', 'Buckwheat Roti (Kuttu Roti)', 'Local Rice Pulao'
    ];
  return filterAllergies(allGrains, allergies);
};
