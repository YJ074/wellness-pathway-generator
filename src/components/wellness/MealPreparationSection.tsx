
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Clock, Flame } from "lucide-react";

interface MealPreparationSectionProps {
  mealType: string;
  description: string;
}

const MealPreparationSection = ({ mealType, description }: MealPreparationSectionProps) => {
  const getPreparationInstructions = (meal: string, type: string) => {
    const lowerMeal = meal.toLowerCase();
    
    // Common preparation tips based on meal content
    const instructions = [];
    
    if (lowerMeal.includes('roti') || lowerMeal.includes('chapati')) {
      instructions.push("🥖 Knead dough with warm water, rest for 15-20 minutes before rolling");
      instructions.push("🔥 Cook on medium-high heat, puff on direct flame for best results");
    }
    
    if (lowerMeal.includes('dal') || lowerMeal.includes('lentil')) {
      instructions.push("🫘 Soak lentils for 30 minutes, cook with turmeric and salt");
      instructions.push("🌿 Add tempering (tadka) of cumin, mustard seeds, and curry leaves");
    }
    
    if (lowerMeal.includes('rice')) {
      instructions.push("🍚 Rinse rice until water runs clear, use 1:2 rice to water ratio");
      instructions.push("⏰ Cook for 15-18 minutes, let it rest for 5 minutes before serving");
    }
    
    if (lowerMeal.includes('curry') || lowerMeal.includes('sabzi')) {
      instructions.push("🥘 Heat oil, add whole spices first, then onions until golden");
      instructions.push("🧄 Add ginger-garlic paste, cook until fragrant before adding vegetables");
    }
    
    if (lowerMeal.includes('salad')) {
      instructions.push("🥗 Wash all vegetables thoroughly, chop just before serving");
      instructions.push("🍋 Add lemon juice and salt just before eating to maintain freshness");
    }
    
    if (lowerMeal.includes('sprouts')) {
      instructions.push("🌱 Soak overnight, tie in cloth and keep in dark place for 12-24 hours");
      instructions.push("💧 Rinse 2-3 times daily until sprouts appear");
    }
    
    if (lowerMeal.includes('paneer')) {
      instructions.push("🧀 Use fresh paneer, soak in warm water before cooking to keep soft");
      instructions.push("🔥 Add paneer at the end to prevent it from becoming rubbery");
    }
    
    // General cooking tips based on meal type
    if (type === 'breakfast') {
      instructions.push("☀️ Prepare fresh for best nutrition and taste");
      instructions.push("⏰ Allow 15-20 minutes for preparation");
    } else if (type === 'lunch') {
      instructions.push("🍽️ Can be prepared in advance and reheated");
      instructions.push("🥄 Serve with fresh curd or buttermilk for better digestion");
    } else if (type === 'dinner') {
      instructions.push("🌙 Keep dinner light and easy to digest");
      instructions.push("⏰ Finish eating 2-3 hours before bedtime");
    }
    
    // If no specific instructions found, provide general tips
    if (instructions.length === 0) {
      instructions.push("👩‍🍳 Use fresh ingredients for best taste and nutrition");
      instructions.push("🧂 Season to taste with salt, pepper, and preferred spices");
      instructions.push("🔥 Cook on medium heat to preserve nutrients");
    }
    
    return instructions.slice(0, 4); // Limit to 4 most relevant tips
  };

  const preparationTips = getPreparationInstructions(description, mealType);

  return (
    <Card className="mt-4 border-orange-200 bg-orange-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-800">
          <ChefHat className="h-4 w-4" />
          Meal Preparation Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {preparationTips.map((tip, index) => (
            <div key={index} className="text-sm text-orange-700 flex items-start gap-2">
              <span className="text-xs mt-0.5">•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-orange-600">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Prep: 10-15 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="h-3 w-3" />
            <span>Cook: Medium heat</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealPreparationSection;
