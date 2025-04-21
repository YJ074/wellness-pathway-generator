
import React from 'react';
import PersonalInfoInputs from './form/PersonalInfoInputs';
import DietaryPreferenceInput from './form/DietaryPreferenceInput';
import FitnessInputs from './form/FitnessInputs';
import { FormData } from './types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select";

interface FormInputsProps {
  formData: FormData;
  handleInputChange: (field: string, value: string) => void;
}

const WellnessFormInputs = ({ formData, handleInputChange }: FormInputsProps) => {
  return (
    <div className="space-y-6">
      {/* Gender dropdown section */}
      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <Select
          value={formData.gender}
          onValueChange={(value) => handleInputChange('gender', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <PersonalInfoInputs formData={formData} handleInputChange={handleInputChange} />
      <DietaryPreferenceInput 
        value={formData.dietaryPreference} 
        onChange={(value) => handleInputChange('dietaryPreference', value)} 
      />
      <FitnessInputs formData={formData} handleInputChange={handleInputChange} />
    </div>
  );
};

export default WellnessFormInputs;
