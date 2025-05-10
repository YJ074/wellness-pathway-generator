
import React from "react";
import { WorkoutDay } from "@/types/workout";
import WorkoutHeader from "./workout/WorkoutHeader";
import WorkoutWeekInfo from "./workout/WorkoutWeekInfo";
import RestDayContent from "./workout/RestDayContent";
import WorkoutContent from "./workout/WorkoutContent";
import FallbackWorkout from "./workout/FallbackWorkout";
import { getWorkoutDetails } from "./workout/utils/workoutDetailsUtils";

interface WorkoutSectionProps {
  workoutDay?: WorkoutDay;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
}

const WorkoutSection = ({ workoutDay, fitnessLevel }: WorkoutSectionProps) => {
  const isRestDay = workoutDay?.isRestDay;
  const isRecoveryDay = workoutDay?.day && workoutDay.day % 7 === 0;
  const workoutDetails = getWorkoutDetails(fitnessLevel);

  return (
    <div className="space-y-4 border-b pb-6">
      <WorkoutHeader 
        isRestDay={!!isRestDay} 
        isRecoveryDay={!!isRecoveryDay} 
        fitnessLevel={fitnessLevel} 
      />
      
      {/* Week and Focus Information */}
      <WorkoutWeekInfo day={workoutDay?.day} focusArea={workoutDay?.focusArea} />
      
      {isRestDay ? (
        <RestDayContent isRecoveryDay={!!isRecoveryDay} />
      ) : workoutDay ? (
        <WorkoutContent 
          workoutDay={workoutDay} 
          fitnessLevel={fitnessLevel}
          getWorkoutDetails={() => workoutDetails}
        />
      ) : (
        // Fallback workout display for Day 1 if workoutDay is undefined
        <FallbackWorkout 
          dayNumber={1} 
          fitnessLevel={fitnessLevel} 
          getWorkoutDetails={() => workoutDetails} 
        />
      )}
    </div>
  );
};

export default WorkoutSection;
