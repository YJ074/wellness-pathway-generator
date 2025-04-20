
import React from 'react';
import { motion } from 'framer-motion';
import BasicInfoInputs from './BasicInfoInputs';
import ContactInputs from './ContactInputs';

interface PersonalInfoInputsProps {
  formData: {
    name: string;
    email: string;
    age: string;
    height: string;
    weight: string;
    mobileNumber: string;
  };
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
