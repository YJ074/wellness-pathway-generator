
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WellnessGoal } from '@/utils/diet/types';
import { Sparkles, Leaf } from 'lucide-react';

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
  wellnessGoals?: WellnessGoal[];
  hairNutrients?: string;
  skinNutrients?: string;
  fatLossNotes?: string;
  herbalRecommendations?: string[];
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
              
              {/* Wellness Benefits */}
              {day.wellnessGoals && day.wellnessGoals.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 mb-1 text-blue-600">
                    <Sparkles className="h-4 w-4" />
                    <h4 className="font-medium text-sm">Wellness Benefits</h4>
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    {day.hairNutrients && (
                      <p><strong>Hair Health:</strong> {day.hairNutrients}</p>
                    )}
                    
                    {day.skinNutrients && (
                      <p><strong>Skin Health:</strong> {day.skinNutrients}</p>
                    )}
                    
                    {day.fatLossNotes && (
                      <p><strong>Weight Management:</strong> {day.fatLossNotes}</p>
                    )}
                  </div>
                  
                  {day.herbalRecommendations && day.herbalRecommendations.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center gap-1 text-green-600">
                        <Leaf className="h-3 w-3" />
                        <p className="text-xs font-medium">Recommended Beverages</p>
                      </div>
                      <ul className="text-xs list-disc list-inside ml-1 mt-1">
                        {day.herbalRecommendations.map((herb, idx) => (
                          <li key={idx}>{herb}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DietPlanDisplay;
