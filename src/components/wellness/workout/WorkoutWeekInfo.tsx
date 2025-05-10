
import React from "react";
import { getWeekInfoFromDay } from '../pdf/utils/workoutPdfUtils';

interface WorkoutWeekInfoProps {
  day?: number;
  focusArea?: string;
}

const WorkoutWeekInfo = ({ day, focusArea }: WorkoutWeekInfoProps) => {
  if (!day) return null;
  
  const { weekNumber, isDeloadWeek } = getWeekInfoFromDay(day);
  const focus = focusArea || "General Fitness";

  return (
    <div className="text-sm text-muted-foreground italic">
      Week {weekNumber} {isDeloadWeek ? " (Deload Week)" : ""} - Focus: {focus}
    </div>
  );
};

export default WorkoutWeekInfo;
