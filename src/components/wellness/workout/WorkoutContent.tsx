
import React from "react";
import { Badge } from "@/components/ui/badge";
import { WorkoutDay } from "@/types/workout";

interface WorkoutContentProps {
  workoutDay: WorkoutDay;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  getWorkoutDetails: () => any;
}

const WorkoutContent = ({ workoutDay, fitnessLevel, getWorkoutDetails }: WorkoutContentProps) => {
  return (
    <div className="space-y-3 pl-2">
      <p className="text-sm text-muted-foreground">
        {fitnessLevel === 'beginner' ? 'Beginner level' : 
         fitnessLevel === 'intermediate' ? 'Intermediate level' : 'Advanced level'}: 
        {workoutDay.progression && ` ${workoutDay.progression}`}
      </p>
      
      <div className="space-y-2">
        <h4 className="font-medium">Warmup:</h4>
        <ul className="list-disc pl-5 text-sm">
          {workoutDay.warmup.map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ul>
        
        <div className="flex items-center gap-2 mt-3">
          <h4 className="font-medium">Main Exercises:</h4>
          <Badge variant="outline" className="text-xs">
            {workoutDay.focusArea}
          </Badge>
        </div>
        <div className="space-y-2">
          {workoutDay.exercises.map((exercise, index) => (
            <div key={index} className="mb-2">
              <p><strong>{exercise.name}:</strong> {exercise.reps}</p>
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
            </div>
          ))}
        </div>
        
        <h4 className="font-medium mt-3">Cooldown:</h4>
        <ul className="list-disc pl-5 text-sm">
          {workoutDay.cooldown.map((stretch, index) => (
            <li key={index}>{stretch}</li>
          ))}
        </ul>
      </div>
      
      <p className="mt-3 font-medium">
        <strong>Workout Duration:</strong> ~{Math.round(15 + (workoutDay.exercises.length * 2) + (getWorkoutDetails().rounds * 5))} min
      </p>
    </div>
  );
};

export default WorkoutContent;
