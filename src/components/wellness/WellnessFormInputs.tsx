
import React from 'react';
import PersonalInfoInputs from './form/PersonalInfoInputs';
import DietaryPreferenceInput from './form/DietaryPreferenceInput';
import FitnessInputs from './form/FitnessInputs';
import { FormData } from './types';

interface FormInputsProps {
  formData: FormData;
  handleInputChange: (field: string, value: string) => void;
}

const WellnessFormInputs = ({ formData, handleInputChange }: FormInputsProps) => {
  return (
    <div className="space-y-6">
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
