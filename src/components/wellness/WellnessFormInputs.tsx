
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormData } from './types';
import PersonalInfoInputs from './form/PersonalInfoInputs';
import DietaryPreferenceInput from './form/DietaryPreferenceInput';
import FitnessInputs from './form/FitnessInputs';

interface WellnessFormInputsProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
}

const WellnessFormInputs = ({ formData, handleInputChange }: WellnessFormInputsProps) => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="diet">Diet</TabsTrigger>
        <TabsTrigger value="fitness">Fitness</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal">
        <PersonalInfoInputs 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
      </TabsContent>
      
      <TabsContent value="diet">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DietaryPreferenceInput 
            value={formData.dietaryPreference} 
            onChange={(value) => handleInputChange('dietaryPreference', value)}
          />
        </motion.div>
      </TabsContent>
      
      <TabsContent value="fitness">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FitnessInputs 
            formData={formData} 
            handleInputChange={handleInputChange}
          />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default WellnessFormInputs;
