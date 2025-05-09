import React from 'react';
import { Target, Activity } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface FitnessInputsProps {
  formData: {
    fitnessGoal: string;
    exerciseFrequency: string;
    has_muscular_build?: boolean; // now accept muscular build toggle as well
  };
  handleInputChange: (field: string, value: string | boolean) => void;
}

const FitnessInputs = ({ formData, handleInputChange }: FitnessInputsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="goal" className="flex items-center gap-2">
          <Target className="w-4 h-4" /> Fitness Goal
        </Label>
        <Select
          value={formData.fitnessGoal}
          onValueChange={(value) => handleInputChange('fitnessGoal', value)}
        >
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
        <Select
          value={formData.exerciseFrequency}
          onValueChange={(value) => handleInputChange('exerciseFrequency', value)}
        >
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
        <Switch
          id="muscularBuild"
          checked={!!formData.has_muscular_build}
          onCheckedChange={checked => handleInputChange('has_muscular_build', Boolean(checked))}
        />
        <Label 
          htmlFor="muscularBuild"
          className="text-sm font-medium"
        >
          I have a muscular build (this helps with more accurate BMI interpretation)
        </Label>
      </div>
    </div>
  );
};

export default FitnessInputs;
