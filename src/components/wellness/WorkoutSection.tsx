
import React from "react";
import { Dumbbell } from "lucide-react";
import { WorkoutDay } from "@/types/workout";

interface WorkoutSectionProps {
  workoutDay?: WorkoutDay;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
}

const WorkoutSection = ({ workoutDay, fitnessLevel }: WorkoutSectionProps) => {
  // Workout details based on fitness level
  const getWorkoutDetails = () => {
    const workoutData = {
      beginner: {
        rounds: 1,
        dand: '5 reps',
        baithak: '10 reps',
        surya: '3 rounds',
        bhujangasana: '20 sec hold',
        utkatasana: '20 sec hold',
        armCircles: '8 forward + 8 backward',
        duration: '~15 min'
      },
      intermediate: {
        rounds: 2,
        dand: '8 reps',
        baithak: '15 reps',
        surya: '5 rounds',
        bhujangasana: '30 sec hold',
        utkatasana: '30 sec hold',
        armCircles: '10 forward + 10 backward',
        duration: '~20 min'
      },
      advanced: {
        rounds: 3,
        dand: '12 reps',
        baithak: '20 reps',
        surya: '7 rounds',
        bhujangasana: '45 sec hold',
        utkatasana: '45 sec hold',
        armCircles: '12 forward + 12 backward',
        duration: '~25 min'
      }
    };
    
    return workoutData[fitnessLevel];
  };

  const isRestDay = workoutDay?.isRestDay;

  return (
    <div className="space-y-4 border-b pb-6">
      <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
        <Dumbbell className="w-5 h-5" />
        {workoutDay?.isRestDay ? "Rest Day" : "Workout (Personalized)"}
      </h3>
      
      {isRestDay ? (
        <div className="pl-2">
          <p className="text-md">
            Recovery day - Focus on light stretching, walking, and proper hydration. 
            Rest is essential for muscle recovery and growth.
          </p>
        </div>
      ) : workoutDay ? (
        <div className="space-y-3 pl-2">
          <p className="text-sm text-muted-foreground">
            {fitnessLevel === 'beginner' ? 'Beginner level' : fitnessLevel === 'intermediate' ? 'Intermediate level' : 'Advanced level'}: {getWorkoutDetails().rounds} round{getWorkoutDetails().rounds > 1 ? 's' : ''}, {fitnessLevel === 'beginner' ? 'moving slowly, focus on form' : fitnessLevel === 'intermediate' ? 'moderate pace' : 'controlled tempo or add a light plyometric variation'}
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium">Warmup:</h4>
            <ul className="list-disc pl-5 text-sm">
              {workoutDay.warmup.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
            
            <h4 className="font-medium mt-3">Main Exercises:</h4>
            <div className="space-y-2">
              {workoutDay.exercises.map((exercise, index) => (
                <div key={index}>
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
      ) : (
        // Fallback workout display for Day 1 if workoutDay is undefined
        <FallbackWorkout dayNumber={1} fitnessLevel={fitnessLevel} getWorkoutDetails={getWorkoutDetails} />
      )}
    </div>
  );
};

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
        {fitnessLevel === 'beginner' ? 'Beginner level' : fitnessLevel === 'intermediate' ? 'Intermediate level' : 'Advanced level'}: {getWorkoutDetails().rounds} round{getWorkoutDetails().rounds > 1 ? 's' : ''}, {fitnessLevel === 'beginner' ? 'moving slowly, focus on form' : fitnessLevel === 'intermediate' ? 'moderate pace' : 'controlled tempo or add a light plyometric variation'}
      </p>
      
      <div className="space-y-2">
        <p><strong>Dand (Hindu Push-up):</strong> {getWorkoutDetails().dand} <br />
        <em className="text-sm text-muted-foreground">Tip: Keep elbows close, core tight.</em></p>
        
        <p><strong>Baithak (Deep Squat):</strong> {getWorkoutDetails().baithak} <br />
        <em className="text-sm text-muted-foreground">Tip: Heels flat, chest upright.</em></p>
        
        <p><strong>Surya Namaskar:</strong> {getWorkoutDetails().surya} <br />
        <em className="text-sm text-muted-foreground">Tip: Flow smoothly, synchronize breath.</em></p>
        
        <p><strong>Bhujangasana (Cobra):</strong> {getWorkoutDetails().bhujangasana} <br />
        <em className="text-sm text-muted-foreground">Tip: Lift chest, relax shoulders.</em></p>
        
        <p><strong>Utkatasana (Chair Pose):</strong> {getWorkoutDetails().utkatasana} <br />
        <em className="text-sm text-muted-foreground">Tip: Sit back, weight in heels.</em></p>
        
        <p><strong>Arm Circles:</strong> {getWorkoutDetails().armCircles} <br />
        <em className="text-sm text-muted-foreground">Tip: Small controlled circles.</em></p>
      </div>
      
      <p className="mt-3 font-medium">
        <strong>Workout Duration:</strong> {getWorkoutDetails().duration}
      </p>
    </div>
  );
};

export default WorkoutSection;
