
import React from "react";
import { Dumbbell } from "lucide-react";
import { WorkoutDay } from "@/types/workout";
import { Badge } from "@/components/ui/badge";

interface WorkoutSectionProps {
  workoutDay?: WorkoutDay;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
}

const WorkoutSection = ({ workoutDay, fitnessLevel }: WorkoutSectionProps) => {
  // Workout details based on fitness level
  const getWorkoutDetails = () => {
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

  const isRestDay = workoutDay?.isRestDay;
  const isRecoveryDay = workoutDay?.day && workoutDay.day % 7 === 0;
  
  // Calculate weekly progression
  const calculateWeekAndFocus = (day?: number) => {
    if (!day) return { week: 1, focus: "General Fitness" };
    
    const weekNumber = Math.floor((day - 1) / 7) + 1;
    const isDeloadWeek = (weekNumber % 4 === 0);
    
    return { 
      week: weekNumber,
      isDeload: isDeloadWeek,
      focus: workoutDay?.focusArea || "General Fitness" 
    };
  };
  
  const weekInfo = calculateWeekAndFocus(workoutDay?.day);

  // Get the difficulty level display name
  const getDifficultyDisplay = () => {
    if (fitnessLevel === 'advanced') return "Advanced";
    if (fitnessLevel === 'intermediate') return "Intermediate";
    return "Beginner";
  };
  
  // Get appropriate badge color based on difficulty
  const getDifficultyColor = () => {
    if (fitnessLevel === 'advanced') return "text-white bg-red-500 hover:bg-red-600";
    if (fitnessLevel === 'intermediate') return "text-white bg-amber-500 hover:bg-amber-600";
    return "text-white bg-green-500 hover:bg-green-600";
  };

  return (
    <div className="space-y-4 border-b pb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
          <Dumbbell className="w-5 h-5" />
          {isRestDay ? (isRecoveryDay ? "Recovery Day" : "Rest Day") : "Workout (Personalized)"}
        </h3>
        
        <Badge className={getDifficultyColor()}>
          {getDifficultyDisplay()}
        </Badge>
      </div>
      
      {/* Week and Focus Information */}
      {workoutDay?.day && (
        <div className="text-sm text-muted-foreground italic">
          Week {weekInfo.week} {weekInfo.isDeload ? " (Deload Week)" : ""} - Focus: {weekInfo.focus}
        </div>
      )}
      
      {isRestDay ? (
        <div className="pl-2">
          {isRecoveryDay ? (
            <>
              <p className="text-md text-blue-700">
                Recovery day - Focus on breathwork and gentle mobility exercises.
              </p>
              <ul className="mt-2 list-disc pl-5 text-sm">
                <li>Deep breathing exercises (5 minutes)</li>
                <li>Light walking (10-15 minutes)</li>
                <li>Gentle stretching for major muscle groups</li>
                <li>Foam rolling or self-massage if available</li>
              </ul>
              <p className="mt-2 text-sm italic text-blue-600">
                Weekly recovery is essential for progress and injury prevention.
              </p>
            </>
          ) : (
            <p className="text-md">
              Rest day - Focus on light stretching, walking, and proper hydration. 
              Rest is essential for muscle recovery and growth.
            </p>
          )}
        </div>
      ) : workoutDay ? (
        <div className="space-y-3 pl-2">
          <p className="text-sm text-muted-foreground">
            {fitnessLevel === 'beginner' ? 'Beginner level' : fitnessLevel === 'intermediate' ? 'Intermediate level' : 'Advanced level'}: 
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
                <div key={index}>
                  <p><strong>{exercise.name}:</strong> {exercise.reps}</p>
                  <p className="text-sm text-muted-foreground">{exercise.description}</p>
                  {exercise.tutorialUrl && (
                    <a href={exercise.tutorialUrl} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1">
                      <span>▶️</span> Watch tutorial
                    </a>
                  )}
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
        {fitnessLevel === 'beginner' ? 'Beginner level' : fitnessLevel === 'intermediate' ? 'Intermediate level' : 'Advanced level'}: {getWorkoutDetails().rounds} round{getWorkoutDetails().rounds > 1 ? 's' : ''}, {fitnessLevel === 'beginner' ? 'moving slowly, focus on form' : fitnessLevel === 'intermediate' ? 'moderate pace' : 'controlled tempo with dynamic variations'}
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

export default WorkoutSection;
