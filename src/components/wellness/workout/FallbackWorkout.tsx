
import React from "react";

interface FallbackWorkoutProps {
  dayNumber: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  getWorkoutDetails: () => any;
}

const FallbackWorkout = ({ dayNumber, fitnessLevel, getWorkoutDetails }: FallbackWorkoutProps) => {
  if (dayNumber !== 1) return null;
  
  return (
    <div className="space-y-3 pl-2">
      <p className="text-sm text-muted-foreground">
        {fitnessLevel === 'beginner' ? 'Beginner level' : 
         fitnessLevel === 'intermediate' ? 'Intermediate level' : 'Advanced level'}: 
        {getWorkoutDetails().rounds} round{getWorkoutDetails().rounds > 1 ? 's' : ''}, 
        {fitnessLevel === 'beginner' ? 'moving slowly, focus on form' : 
         fitnessLevel === 'intermediate' ? 'moderate pace' : 'controlled tempo with dynamic variations'}
      </p>
      
      <div className="space-y-2">
        <p><strong>Surya Namaskar:</strong> {getWorkoutDetails().surya} <br />
        <em className="text-sm text-muted-foreground">Tip: Flow smoothly, synchronize breath with movement.</em></p>
        
        {fitnessLevel !== 'beginner' && (
          <p><strong>Hindu Push-ups (Dand):</strong> {getWorkoutDetails().dand} <br />
          <em className="text-sm text-muted-foreground">Tip: Keep elbows close, core tight.</em></p>
        )}
        
        <p><strong>Baithak (Indian Squat):</strong> {getWorkoutDetails().baithak} <br />
        <em className="text-sm text-muted-foreground">Tip: Heels flat, chest upright.</em></p>
        
        <p><strong>Plank Hold:</strong> {getWorkoutDetails().plank} <br />
        <em className="text-sm text-muted-foreground">Tip: Maintain straight body line, engage core.</em></p>
        
        <p><strong>Utkatasana (Chair Pose):</strong> {getWorkoutDetails().utkatasana} <br />
        <em className="text-sm text-muted-foreground">Tip: Sit back, weight in heels, arms extended.</em></p>
      </div>
      
      <p className="mt-3 font-medium">
        <strong>Workout Duration:</strong> {getWorkoutDetails().duration}
      </p>
    </div>
  );
};

export default FallbackWorkout;
