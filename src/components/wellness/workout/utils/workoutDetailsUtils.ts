
interface WorkoutDetails {
  rounds: number;
  dand: string;
  baithak: string;
  surya: string;
  plank: string;
  utkatasana: string;
  duration: string;
}

export const getWorkoutDetails = (fitnessLevel: 'beginner' | 'intermediate' | 'advanced'): WorkoutDetails => {
  const workoutData = {
    beginner: {
      rounds: 2,
      dand: 'Not included - focus on form first',
      baithak: '8 reps',
      surya: '2 rounds',
      plank: '20 sec hold',
      utkatasana: '20 sec hold',
      duration: '~15 min'
    },
    intermediate: {
      rounds: 2,
      dand: '15 reps',
      baithak: '12 reps',
      surya: '4 rounds',
      plank: '30 sec hold',
      utkatasana: '30 sec hold',
      duration: '~20 min'
    },
    advanced: {
      rounds: 3,
      dand: '12 plyometric reps',
      baithak: 'Jump squats x15',
      surya: '6 rounds (dynamic flow)',
      plank: '45 sec dynamic plank',
      utkatasana: '45 sec with pulses',
      duration: '~25 min'
    }
  };
  
  return workoutData[fitnessLevel];
};
