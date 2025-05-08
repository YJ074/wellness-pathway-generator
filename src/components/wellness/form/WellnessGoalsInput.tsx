
import React from 'react';
import { Sparkles } from 'lucide-react';
import { WellnessGoal } from '@/utils/diet/types';
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WellnessGoalsInputProps {
  selectedGoals: WellnessGoal[];
  onChange: (goals: WellnessGoal[]) => void;
}

const goalDescriptions: Record<WellnessGoal, string> = {
  'hair-fall-control': 'Diet rich in biotin, iron, zinc and protein for stronger hair.',
  'glowing-skin': 'Foods high in antioxidants, vitamins A, C, E and omega-3 fatty acids.',
  'fat-loss': 'Calorie-controlled diet with high protein and fiber to promote fat burning.',
  'inch-loss': 'Foods that reduce water retention and bloating while supporting metabolism.',
  'general-wellness': 'Balanced nutrition for overall health improvement.'
};

const WellnessGoalsInput = ({ selectedGoals, onChange }: WellnessGoalsInputProps) => {
  const handleGoalToggle = (goal: WellnessGoal) => {
    if (selectedGoals.includes(goal)) {
      onChange(selectedGoals.filter(g => g !== goal));
    } else {
      onChange([...selectedGoals, goal]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-brand-blue" />
        <h3 className="font-medium">Wellness Goals</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Select the specific wellness goals you want your diet plan to focus on:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
        {Object.entries(goalDescriptions).map(([goal, description]) => (
          <TooltipProvider key={goal}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50">
                  <Checkbox 
                    id={`goal-${goal}`}
                    checked={selectedGoals.includes(goal as WellnessGoal)}
                    onCheckedChange={() => handleGoalToggle(goal as WellnessGoal)}
                  />
                  <label
                    htmlFor={`goal-${goal}`}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {goal.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-60">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default WellnessGoalsInput;
