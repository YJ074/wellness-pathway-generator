
import React from "react";

interface WorkoutWeekInfoProps {
  day?: number;
  focusArea?: string;
}

const WorkoutWeekInfo = ({ day, focusArea }: WorkoutWeekInfoProps) => {
  if (!day) return null;
  
  const weekNumber = Math.floor((day - 1) / 7) + 1;
  const isDeloadWeek = (weekNumber % 4 === 0);
  const focus = focusArea || "General Fitness";

  return (
    <div className="text-sm text-muted-foreground italic">
      Week {weekNumber} {isDeloadWeek ? " (Deload Week)" : ""} - Focus: {focus}
    </div>
  );
};

export default WorkoutWeekInfo;
