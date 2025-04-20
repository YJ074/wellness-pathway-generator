
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DietPlanDay {
  day: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
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
          <Card key={day.day}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Day {day.day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Breakfast:</strong> {day.breakfast}</p>
              <p><strong>Lunch:</strong> {day.lunch}</p>
              <p><strong>Dinner:</strong> {day.dinner}</p>
              <p><strong>Snacks:</strong> {day.snacks}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DietPlanDisplay;
