
import React from "react";
import { Utensils } from "lucide-react";
import { calculateMealCalories } from "./utils/mealCalories";

interface DietSectionProps {
  diet: {
    breakfast: string;
    midMorningSnack?: string;
    lunch: string;
    eveningSnack?: string;
    dinner: string;
    snacks?: string;
    calories?: number;
    water?: number;
  };
}

const DietSection = ({ diet }: DietSectionProps) => {
  const mealCalories = calculateMealCalories(diet.calories || 2000);
  const totalCalories = diet.calories || 0;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
        <Utensils className="w-5 h-5" />
        Diet Plan (Calorie-Counted)
      </h3>
      <div className="space-y-3">
        <p>
          <strong>Breakfast:</strong> {diet.breakfast} 
          <span className="text-sm font-medium text-amber-600 ml-1">
            ({mealCalories.breakfast} kcal)
          </span>
        </p>
        
        {diet.midMorningSnack && (
          <p>
            <strong>Mid-Morning Snack:</strong> {diet.midMorningSnack}
            <span className="text-sm font-medium text-amber-600 ml-1">
              ({mealCalories.midMorningSnack} kcal)
            </span>
          </p>
        )}
        
        <p>
          <strong>Lunch:</strong> {diet.lunch}
          <span className="text-sm font-medium text-amber-600 ml-1">
            ({mealCalories.lunch} kcal)
          </span>
        </p>
        
        {diet.eveningSnack && (
          <p>
            <strong>Evening Snack:</strong> {diet.eveningSnack}
            <span className="text-sm font-medium text-amber-600 ml-1">
              ({mealCalories.eveningSnack} kcal)
            </span>
          </p>
        )}
        
        <p>
          <strong>Dinner:</strong> {diet.dinner}
          <span className="text-sm font-medium text-amber-600 ml-1">
            ({mealCalories.dinner} kcal)
          </span>
        </p>
        
        {diet.snacks && !diet.midMorningSnack && !diet.eveningSnack && (
          <p><strong>Snacks:</strong> {diet.snacks}</p>
        )}
        
        {totalCalories > 0 && (
          <p className="mt-3 font-medium">
            <strong>Approx. Total Calories:</strong> {totalCalories} kcal
          </p>
        )}
        
        {diet.water && (
          <p className="italic text-sm text-gray-600">
            <strong>Water:</strong> {diet.water} L
          </p>
        )}
      </div>
    </div>
  );
};

export default DietSection;
