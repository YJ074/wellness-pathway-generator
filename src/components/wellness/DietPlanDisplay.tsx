
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DietPlanDay {
  day: number;
  breakfast: string;
  midMorningSnack?: string;
  lunch: string;
  eveningSnack?: string;
  dinner: string;
  snacks?: string;
  calories?: number;
  water?: number;
}

interface DietPlanDisplayProps {
  days: DietPlanDay[];
}

const DietPlanDisplay = ({ days }: DietPlanDisplayProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Diet Plan</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => (
          <Card key={day.day} className="overflow-hidden">
            <CardHeader className="pb-2 bg-slate-50">
              <CardTitle className="text-xl">Day {day.day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <p><strong>Breakfast:</strong> {day.breakfast}</p>
              
              {day.midMorningSnack && (
                <p><strong>Mid-Morning Snack:</strong> {day.midMorningSnack}</p>
              )}
              
              <p><strong>Lunch:</strong> {day.lunch}</p>
              
              {day.eveningSnack && (
                <p><strong>Evening Snack:</strong> {day.eveningSnack}</p>
              )}
              
              <p><strong>Dinner:</strong> {day.dinner}</p>
              
              {day.snacks && !day.midMorningSnack && !day.eveningSnack && (
                <p><strong>Snacks:</strong> {day.snacks}</p>
              )}
              
              {day.calories && (
                <p className="italic text-sm text-gray-600">
                  <strong>Approx. Calories:</strong> {day.calories} kcal
                </p>
              )}
              
              {day.water && (
                <p className="italic text-sm text-gray-600">
                  <strong>Water:</strong> {day.water} L
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DietPlanDisplay;
