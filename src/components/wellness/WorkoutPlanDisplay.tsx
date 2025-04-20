
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Exercise {
  name: string;
  reps: string;
  description: string;
}

interface WorkoutDay {
  day: number;
  isRestDay: boolean;
  warmup: string[];
  exercises: Exercise[];
  cooldown: string[];
}

interface WorkoutPlanDisplayProps {
  days: WorkoutDay[];
}

const WorkoutPlanDisplay = ({ days }: WorkoutPlanDisplayProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Workout Plan</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => (
          <Card key={day.day}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Day {day.day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {day.isRestDay ? (
                <p className="text-green-600 font-medium">Rest Day - Focus on recovery and light stretching</p>
              ) : (
                <>
                  <div>
                    <strong>Warm-up:</strong>
                    <ul className="list-disc pl-4">
                      {day.warmup.map((exercise, idx) => (
                        <li key={idx}>{exercise}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Exercises:</strong>
                    <ul className="list-disc pl-4">
                      {day.exercises.map((exercise, idx) => (
                        <li key={idx}>
                          {exercise.name} - {exercise.reps}
                          <p className="text-sm text-gray-600">{exercise.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Cool-down:</strong>
                    <ul className="list-disc pl-4">
                      {day.cooldown.map((stretch, idx) => (
                        <li key={idx}>{stretch}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanDisplay;
