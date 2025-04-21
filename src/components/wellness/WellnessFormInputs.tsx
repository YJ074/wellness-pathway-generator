
import React from 'react';
import PersonalInfoInputs from './form/PersonalInfoInputs';
import DietaryPreferenceInput from './form/DietaryPreferenceInput';
import FitnessInputs from './form/FitnessInputs';
import { FormData } from './types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dumbbell } from "lucide-react";

interface FormInputsProps {
  formData: FormData;
  handleInputChange: (field: string, value: string | boolean) => void;
}

const WellnessFormInputs = ({ formData, handleInputChange }: FormInputsProps) => {
  return (
    <div className="space-y-6">
      <PersonalInfoInputs 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />

      {/* Athletic/Muscular Build Self-ID Toggle */}
      <div className="flex items-center gap-4 border rounded-lg px-4 py-3 bg-slate-50">
        <Dumbbell className="w-5 h-5 text-blue-600" />
        <div className="flex flex-col flex-1">
          <Label htmlFor="has_muscular_build" className="font-medium mb-1">
            Do you have an athletic or muscular build that may affect your BMI reading?
          </Label>
          <span className="text-xs text-muted-foreground">
            If you have high muscle mass, BMI may not accurately reflect your health risk.
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <Switch
            id="has_muscular_build"
            checked={!!formData.has_muscular_build}
            onCheckedChange={(checked) =>
              handleInputChange('has_muscular_build', checked)
            }
          />
          <span className="text-sm ml-2">
            {formData.has_muscular_build ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <DietaryPreferenceInput 
        value={formData.dietaryPreference} 
        onChange={(value) => handleInputChange('dietaryPreference', value)} 
      />
      <FitnessInputs formData={formData} handleInputChange={handleInputChange} />
    </div>
  );
};

export default WellnessFormInputs;
