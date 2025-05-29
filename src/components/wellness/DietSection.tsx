
import React from 'react';
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Clock, Utensils, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import MealPreparationSection from './MealPreparationSection';

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
    mealTimings?: {
      breakfast: string;
      midMorningSnack: string;
      lunch: string;
      eveningSnack: string;
      dinner: string;
    };
    cheatMealInfo?: string | null;
    timingTips?: string;
  };
}

const DietSection = ({ diet }: DietSectionProps) => {
  const { 
    breakfast, 
    midMorningSnack, 
    lunch, 
    eveningSnack, 
    dinner, 
    snacks,
    mealTimings,
    cheatMealInfo,
    timingTips
  } = diet;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Diet Plan</h3>
      
      {/* Meal Timings Card */}
      {mealTimings && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium text-sm">Recommended Meal Timings</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="font-medium">Breakfast:</span> {mealTimings.breakfast}
              </div>
              
              <div className="text-sm">
                <span className="font-medium">Mid-Morning:</span> {mealTimings.midMorningSnack}
              </div>
              
              <div className="text-sm">
                <span className="font-medium">Lunch:</span> {mealTimings.lunch}
              </div>
              
              <div className="text-sm">
                <span className="font-medium">Evening Snack:</span> {mealTimings.eveningSnack}
              </div>
              
              <div className="text-sm">
                <span className="font-medium">Dinner:</span> {mealTimings.dinner}
              </div>
            </div>
            
            {timingTips && (
              <div className="mt-2 text-sm text-gray-600 border-t border-gray-100 pt-2">
                <span className="font-medium">Tip:</span> {timingTips}
              </div>
            )}
            
            {cheatMealInfo && (
              <div className="mt-3 p-2 bg-amber-50 rounded-md border border-amber-100">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <p className="text-sm text-amber-800">{cheatMealInfo}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span>Breakfast</span>
            {mealTimings && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded ml-auto">
                {mealTimings.breakfast}
              </span>
            )}
          </h4>
          <p className="mb-2">{breakfast}</p>
          <MealPreparationSection mealType="breakfast" description={breakfast} />
        </CardContent>
      </Card>

      {midMorningSnack && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span>Mid-Morning Snack</span>
              {mealTimings && (
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded ml-auto">
                  {mealTimings.midMorningSnack}
                </span>
              )}
            </h4>
            <p className="mb-2">{midMorningSnack}</p>
            <MealPreparationSection mealType="snack" description={midMorningSnack} />
          </CardContent>
        </Card>
      )}

      <Card className="mb-4">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span>Lunch</span>
            {mealTimings && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded ml-auto">
                {mealTimings.lunch}
              </span>
            )}
          </h4>
          <p className="mb-2">{lunch}</p>
          <MealPreparationSection mealType="lunch" description={lunch} />
        </CardContent>
      </Card>

      {eveningSnack && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span>Evening Snack</span>
              {mealTimings && (
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded ml-auto">
                  {mealTimings.eveningSnack}
                </span>
              )}
            </h4>
            <p className="mb-2">{eveningSnack}</p>
            <MealPreparationSection mealType="snack" description={eveningSnack} />
          </CardContent>
        </Card>
      )}

      <Card className="mb-4">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span>Dinner</span>
            {mealTimings && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded ml-auto">
                {mealTimings.dinner}
              </span>
            )}
          </h4>
          <p className="mb-2">{dinner}</p>
          <MealPreparationSection mealType="dinner" description={dinner} />
        </CardContent>
      </Card>

      {snacks && !midMorningSnack && !eveningSnack && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Snacks</h4>
            <p className="mb-2">{snacks}</p>
            <MealPreparationSection mealType="snack" description={snacks} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DietSection;
