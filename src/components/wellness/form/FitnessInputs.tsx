
import React from 'react';
import { Target, Activity, Dumbbell } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface FitnessInputsProps {
  formData: {
    fitnessGoal: string;
    exerciseFrequency: string;
    has_muscular_build?: boolean;
    includeWorkoutPlan?: boolean; // Field is still kept for backward compatibility
  };
  handleInputChange: (field: string, value: string | boolean) => void;
}

const FitnessInputs = ({
  formData,
  handleInputChange
}: FitnessInputsProps) => {
  // Set includeWorkoutPlan to true by default when the component loads
  React.useEffect(() => {
    if (formData.includeWorkoutPlan !== true) {
      handleInputChange('includeWorkoutPlan', true);
    }
  }, []);

  return <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="goal" className="flex items-center gap-2">
          <Target className="w-4 h-4" /> Fitness Goal
        </Label>
        <Select value={formData.fitnessGoal} onValueChange={value => handleInputChange('fitnessGoal', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select fitness goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weight-loss">Weight Loss</SelectItem>
            <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="endurance">Endurance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequency" className="flex items-center gap-2">
          <Activity className="w-4 h-4" /> Current Exercise Frequency
        </Label>
        <Select value={formData.exerciseFrequency} onValueChange={value => handleInputChange('exerciseFrequency', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select exercise frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary</SelectItem>
            <SelectItem value="1-2">1-2 times/week</SelectItem>
            <SelectItem value="3-4">3-4 times/week</SelectItem>
            <SelectItem value="5+">5+ times/week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Muscular Build Toggle */}
      <div className="flex items-center space-x-3 mt-4">
        <Switch id="muscularBuild" checked={!!formData.has_muscular_build} onCheckedChange={checked => handleInputChange('has_muscular_build', Boolean(checked))} />
        <Label htmlFor="muscularBuild" className="text-sm font-medium">
          I have a muscular build (this helps with more accurate BMI interpretation)
        </Label>
      </div>

      {/* Info box about workout plan - replaced checkbox with informational message */}
      <div className="flex items-center space-x-2 mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <div className="grid gap-1.5 leading-none">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-blue-600" />
            75-day workout plan included
          </Label>
          <p className="text-sm text-muted-foreground">
            Your personalized exercise routine without gym equipment is automatically included alongside your diet plan
          </p>
        </div>
      </div>
    </div>;
};

export default FitnessInputs;
