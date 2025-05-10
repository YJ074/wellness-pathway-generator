
import React from "react";
import { Utensils, Droplet, Sparkles, MapPin, Heart } from "lucide-react";
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
    regionalNote?: string;
  };
}

const DietSection = ({ diet }: DietSectionProps) => {
  const mealCalories = calculateMealCalories(diet.calories || 2000);
  const totalCalories = diet.calories || 0;
  const hasRegionalNote = !!diet.regionalNote && diet.regionalNote.trim() !== '';
  
  // Helper to extract health benefits from meal descriptions
  const extractHealthBenefit = (mealText: string): { meal: string, benefit: string | null } => {
    const benefitMatch = mealText.match(/ - \((.*?)\)$/);
    if (benefitMatch && benefitMatch[1]) {
      return {
        meal: mealText.replace(benefitMatch[0], ''),
        benefit: benefitMatch[1]
      };
    }
    return { meal: mealText, benefit: null };
  };

  // Process each meal to extract benefits
  const breakfast = extractHealthBenefit(diet.breakfast);
  const midMorningSnack = diet.midMorningSnack ? extractHealthBenefit(diet.midMorningSnack) : null;
  const lunch = extractHealthBenefit(diet.lunch);
  const eveningSnack = diet.eveningSnack ? extractHealthBenefit(diet.eveningSnack) : null;
  const dinner = extractHealthBenefit(diet.dinner);
  const snacks = diet.snacks ? extractHealthBenefit(diet.snacks) : null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
        <Utensils className="w-5 h-5" />
        Diet Plan {totalCalories > 0 ? `(${totalCalories} kcal)` : ''}
      </h3>
      
      {/* Regional Note */}
      {hasRegionalNote && (
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
          <p className="text-sm text-amber-800 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-amber-600 flex-shrink-0" />
            <span className="italic">{diet.regionalNote}</span>
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        <div>
          <p>
            <strong>Breakfast:</strong> {breakfast.meal} 
            <span className="text-sm font-medium text-amber-600 ml-1">
              ({mealCalories.breakfast} kcal)
            </span>
          </p>
          {breakfast.benefit && (
            <p className="text-sm text-green-600 ml-6 flex items-center mt-1">
              <Heart className="h-3 w-3 mr-1 inline-block" /> {breakfast.benefit}
            </p>
          )}
        </div>
        
        {midMorningSnack && (
          <div>
            <p>
              <strong>Mid-Morning Snack:</strong> {midMorningSnack.meal}
              <span className="text-sm font-medium text-amber-600 ml-1">
                ({mealCalories.midMorningSnack} kcal)
              </span>
            </p>
            {midMorningSnack.benefit && (
              <p className="text-sm text-green-600 ml-6 flex items-center mt-1">
                <Heart className="h-3 w-3 mr-1 inline-block" /> {midMorningSnack.benefit}
              </p>
            )}
          </div>
        )}
        
        <div>
          <p>
            <strong>Lunch:</strong> {lunch.meal}
            <span className="text-sm font-medium text-amber-600 ml-1">
              ({mealCalories.lunch} kcal)
            </span>
          </p>
          {lunch.benefit && (
            <p className="text-sm text-green-600 ml-6 flex items-center mt-1">
              <Heart className="h-3 w-3 mr-1 inline-block" /> {lunch.benefit}
            </p>
          )}
        </div>
        
        {eveningSnack && (
          <div>
            <p>
              <strong>Evening Snack:</strong> {eveningSnack.meal}
              <span className="text-sm font-medium text-amber-600 ml-1">
                ({mealCalories.eveningSnack} kcal)
              </span>
            </p>
            {eveningSnack.benefit && (
              <p className="text-sm text-green-600 ml-6 flex items-center mt-1">
                <Heart className="h-3 w-3 mr-1 inline-block" /> {eveningSnack.benefit}
              </p>
            )}
          </div>
        )}
        
        <div>
          <p>
            <strong>Dinner:</strong> {dinner.meal}
            <span className="text-sm font-medium text-amber-600 ml-1">
              ({mealCalories.dinner} kcal)
            </span>
          </p>
          {dinner.benefit && (
            <p className="text-sm text-green-600 ml-6 flex items-center mt-1">
              <Heart className="h-3 w-3 mr-1 inline-block" /> {dinner.benefit}
            </p>
          )}
        </div>
        
        {snacks && !midMorningSnack && !eveningSnack && (
          <div>
            <p><strong>Snacks:</strong> {snacks.meal}</p>
            {snacks.benefit && (
              <p className="text-sm text-green-600 ml-6 flex items-center mt-1">
                <Heart className="h-3 w-3 mr-1 inline-block" /> {snacks.benefit}
              </p>
            )}
          </div>
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
