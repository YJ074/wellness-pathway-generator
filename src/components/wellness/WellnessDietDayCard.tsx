
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
}

interface WellnessDietDayCardProps {
  dietDay: DietPlanDay;
}

const WellnessDietDayCard = ({ dietDay }: WellnessDietDayCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">Day {dietDay.day}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 border-b pb-6">
          <h3 className="text-xl font-semibold text-primary">Diet Plan</h3>
          <div className="space-y-3">
            <p><strong>Breakfast:</strong> {dietDay.breakfast}</p>
            {dietDay.midMorningSnack && (
              <p><strong>Mid-Morning Snack:</strong> {dietDay.midMorningSnack}</p>
            )}
            <p><strong>Lunch:</strong> {dietDay.lunch}</p>
            {dietDay.eveningSnack && (
              <p><strong>Evening Snack:</strong> {dietDay.eveningSnack}</p>
            )}
            <p><strong>Dinner:</strong> {dietDay.dinner}</p>
            {dietDay.snacks && !dietDay.midMorningSnack && !dietDay.eveningSnack && (
              <p><strong>Snacks:</strong> {dietDay.snacks}</p>
            )}
            {dietDay.calories && (
              <p className="italic text-sm text-gray-600 mt-2">
                <strong>Approx. Calories:</strong> {dietDay.calories} kcal
              </p>
            )}
            {dietDay.water && (
              <p className="italic text-sm text-gray-600">
                <strong>Water:</strong> {dietDay.water} L
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessDietDayCard;
