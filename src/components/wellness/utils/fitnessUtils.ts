
// Determine fitness level based on exercise frequency
export const getFitnessLevel = (exerciseFrequency?: string): 'beginner' | 'intermediate' | 'advanced' => {
  const frequency = exerciseFrequency || '';
  if (frequency === '3-4' || frequency === '5+') {
    return 'advanced';
  } else if (frequency === '1-2') {
    return 'intermediate';
  } else {
    return 'beginner';
  }
};
