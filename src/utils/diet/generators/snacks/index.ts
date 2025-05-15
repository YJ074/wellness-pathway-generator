
export { generateMidMorningSnack } from './midMorningSnack';
export { generateEveningSnack } from './eveningSnack';
export { generateSnacks } from './generalSnack';
export { generateAfternoonSnack } from './afternoonSnack';

// Export a more descriptive version that explains purpose
export const generateMorningSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Import here to avoid circular dependency
  const { generateMidMorningSnack: genMidMorning } = require('./midMorningSnack');
  return genMidMorning(dayIndex, snacks, fruits, isWeightLoss, allergies);
};
