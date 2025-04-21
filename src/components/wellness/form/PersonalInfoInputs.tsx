
import React from 'react';
import { motion } from 'framer-motion';
import BasicInfoInputs from './BasicInfoInputs';
import ContactInputs from './ContactInputs';
import { FormData } from '../types';

interface PersonalInfoInputsProps {
  formData: FormData;
  handleInputChange: (field: string, value: string) => void;
}

const PersonalInfoInputs = ({ formData, handleInputChange }: PersonalInfoInputsProps) => {
  return (
    <motion.div 
      className="space-y-4"
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
      
      <ContactInputs
        email={formData.email}
        mobileNumber={formData.mobileNumber}
        onInputChange={handleInputChange}
      />
    </motion.div>
  );
};

export default PersonalInfoInputs;
