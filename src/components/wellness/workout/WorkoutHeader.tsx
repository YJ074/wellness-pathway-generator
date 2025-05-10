
import React from "react";
import { Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WorkoutHeaderProps {
  isRestDay: boolean;
  isRecoveryDay: boolean;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
}

const WorkoutHeader = ({ isRestDay, isRecoveryDay, fitnessLevel }: WorkoutHeaderProps) => {
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
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
        <Dumbbell className="w-5 h-5" />
        {isRestDay ? (isRecoveryDay ? "Recovery Day" : "Rest Day") : "Workout (Personalized)"}
      </h3>
      
      <Badge className={getDifficultyColor()}>
        {getDifficultyDisplay()}
      </Badge>
    </div>
  );
};

export default WorkoutHeader;
