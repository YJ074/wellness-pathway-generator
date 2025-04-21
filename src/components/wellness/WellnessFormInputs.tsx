
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormData } from './types';
import PersonalInfoInputs from './form/PersonalInfoInputs';
import DietaryPreferenceInput from './form/DietaryPreferenceInput';
import FitnessInputs from './form/FitnessInputs';

// Add types for controlled tab navigation
interface WellnessFormInputsProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const WellnessFormInputs = ({ formData, handleInputChange, currentTab, setCurrentTab }: WellnessFormInputsProps) => {
  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
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
          {/* Allergies Field MOVED HERE */}
          <div className="space-y-1 mt-6">
            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
              Allergies or Ingredients to Exclude
            </label>
            <input
              id="allergies"
              type="text"
              placeholder="e.g. Peanuts, Dairy, Gluten"
              value={formData.allergies || ''}
              onChange={e => handleInputChange('allergies', e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <span className="text-xs text-muted-foreground">
              List any food allergies or intolerances (comma-separated).
            </span>
          </div>
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
