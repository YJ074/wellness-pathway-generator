
import React from 'react';
import { motion } from 'framer-motion';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import BasicInfoInputs from './BasicInfoInputs';
import ContactInputs from './ContactInputs';
import { FormData } from '../types';

interface PersonalInfoInputsProps {
  formData: FormData;
  handleInputChange: (field: string, value: string | boolean) => void;
}

const PersonalInfoInputs = ({ formData, handleInputChange }: PersonalInfoInputsProps) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BasicInfoInputs
        name={formData.name}
        age={formData.age}
        height={formData.height}
        weight={formData.weight}
        gender={formData.gender}
        heightFeet={formData.heightFeet}
        heightInches={formData.heightInches}
        onInputChange={handleInputChange}
      />
      
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox 
          id="muscularBuild"
          checked={!!formData.has_muscular_build}
          onCheckedChange={(checked) => handleInputChange('has_muscular_build', Boolean(checked))}
        />
        <Label 
          htmlFor="muscularBuild" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have a muscular build (this helps with more accurate BMI interpretation)
        </Label>
      </div>
      
      <ContactInputs
        email={formData.email}
        mobileNumber={formData.mobileNumber}
        onInputChange={handleInputChange}
      />
    </motion.div>
  );
};

export default PersonalInfoInputs;
