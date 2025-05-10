
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WorkoutDay } from '@/types/workout';

interface Exercise {
  name: string;
  reps: string;
  description: string;
  imageUrl?: string;
  tutorialUrl?: string;
}

interface WorkoutPlanDisplayProps {
  days: WorkoutDay[];
}

const WorkoutPlanDisplay = ({ days }: WorkoutPlanDisplayProps) => {
  if (!days || days.length === 0) return null;
  
  // Show first 7 days of workout plan
  const displayedDays = days.slice(0, 7);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your 75-Day Workout Plan</h2>
        <span className="text-sm text-gray-500">(First week preview)</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedDays.map((day) => (
          <Card key={day.day} className={cn(
            "transition-all duration-300",
            day.isRestDay ? "bg-blue-50 border-blue-100" : ""
          )}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  Day {day.day}
                  {day.isRestDay && <span className="text-blue-600 font-normal text-sm">(Recovery)</span>}
                </CardTitle>
                {day.focusArea && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {day.focusArea}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {day.isRestDay ? (
                <div className="text-blue-700 text-sm italic pb-2">
                  <p>Focus on recovery with light stretching, mobility work and breathwork</p>
                  <p className="mt-2">• Deep breathing exercises (5 minutes)</p>
                  <p>• Light walking (10-15 minutes)</p>
                  <p>• Gentle yoga stretches for flexibility</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-2">{day.progression}</p>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium text-sm">Warm-up:</h4>
                      <ul className="pl-5 text-xs list-disc">
                        {day.warmup.map((exercise, i) => (
                          <li key={i}>{exercise}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm">Main Exercises:</h4>
                      <ul className="pl-5 text-xs">
                        {day.exercises.map((exercise, i) => (
                          <li key={i} className="mb-1">
                            <div className="flex flex-col">
                              <span className="font-medium">{exercise.name} - {exercise.reps}</span>
                              <span className="text-xs text-gray-500">{exercise.description}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm">Cool-down:</h4>
                      <ul className="pl-5 text-xs list-disc">
                        {day.cooldown.map((exercise, i) => (
                          <li key={i}>{exercise}</li>
                        ))}
                      </ul>
                    </div>
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
