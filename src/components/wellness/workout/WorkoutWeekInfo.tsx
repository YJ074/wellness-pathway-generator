
import React from "react";
import { getWeekInfoFromDay } from '../pdf/utils/workoutPdfUtils';

interface WorkoutWeekInfoProps {
  day?: number;
  focusArea?: string;
}

const WorkoutWeekInfo = ({ day, focusArea }: WorkoutWeekInfoProps) => {
  // Early return if no day is provided
  if (!day || day < 1) return null;
  
  const { weekNumber, isDeloadWeek } = getWeekInfoFromDay(day);
  const displayFocusArea = focusArea ?? "General Fitness";

  return (
    <div className="text-sm text-muted-foreground italic border-l-2 border-l-muted pl-2 mt-1">
      Week {weekNumber} {isDeloadWeek ? " (Deload Week)" : ""} - Focus: {displayFocusArea}
    </div>
  );
};

export default WorkoutWeekInfo;
