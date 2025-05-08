
import React from "react";
import { Utensils, Droplet, Sparkles } from "lucide-react";
import { calculateMealCalories } from "./utils/mealCalories";
import { WellnessGoal } from "@/utils/diet/types";

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
    wellnessGoals?: WellnessGoal[];
    hairNutrients?: string;
    skinNutrients?: string;
    fatLossNotes?: string;
    herbalRecommendations?: string[];
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
          <p className="flex items-center text-sm text-gray-600 mt-1">
            <Droplet className="h-3 w-3 mr-1 text-blue-500" />
            <strong>Water:</strong> {diet.water} L
          </p>
        )}
        
        {/* Wellness Goals Section */}
        {diet.wellnessGoals && diet.wellnessGoals.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-medium flex items-center gap-2 text-blue-700">
              <Sparkles className="h-4 w-4" />
              Wellness Benefits
            </h4>
            
            <div className="mt-2 space-y-2 text-sm">
              {diet.hairNutrients && (
                <p><strong>Hair Health:</strong> {diet.hairNutrients}</p>
              )}
              
              {diet.skinNutrients && (
                <p><strong>Skin Health:</strong> {diet.skinNutrients}</p>
              )}
              
              {diet.fatLossNotes && (
                <p><strong>Weight Management:</strong> {diet.fatLossNotes}</p>
              )}
              
              {diet.herbalRecommendations && diet.herbalRecommendations.length > 0 && (
                <div>
                  <strong>Recommended Beverages:</strong>
                  <ul className="list-disc list-inside ml-2">
                    {diet.herbalRecommendations.map((herb, index) => (
                      <li key={index}>{herb}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietSection;
