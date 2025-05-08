
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkoutDay } from "@/types/workout";
import WorkoutSection from "./WorkoutSection";
import DietSection from "./DietSection";
import { getFitnessLevel } from "./utils/fitnessUtils";

interface DietPlanDay {
  day: number;
  breakfast: string;
  midMorningSnack?: string;
  lunch: string;
  eveningSnack?: string;
  dinner: string;
  snacks?: string; // legacy field
  calories?: number;
  water?: number;
  bmi?: number;
  bmiCategory?: string;
  regionalNote?: string;
}

interface WellnessDietDayCardProps {
  dietDay: DietPlanDay;
  formData?: {
    exerciseFrequency?: string;
    fitnessGoal?: string;
    region?: string;
  };
  workoutDay?: WorkoutDay;
}

const WellnessDietDayCard = ({ dietDay, formData, workoutDay }: WellnessDietDayCardProps) => {
  const fitnessLevel = getFitnessLevel(formData?.exerciseFrequency);
  
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">Day {dietDay.day}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Workout Section */}
        <WorkoutSection 
          workoutDay={workoutDay} 
          fitnessLevel={fitnessLevel} 
        />
        
        {/* Diet Plan Section */}
        <DietSection diet={dietDay} />
      </CardContent>
    </Card>
  );
};

export default WellnessDietDayCard;
