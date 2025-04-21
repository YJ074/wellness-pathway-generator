
import React from 'react';
import { motion } from 'framer-motion';
import WellnessResultsHeaderActions from "./WellnessResultsHeaderActions";
import WellnessMetricsDisplay from "./WellnessMetricsDisplay";
import WellnessDietDayCard from "./WellnessDietDayCard";
import PlanDetailsCard from './PlanDetailsCard';
import { FormData, DietPlan } from './types';

interface WellnessResultsProps {
  formData: FormData;
  dietPlan: DietPlan;
  onReset: () => void;
}

const WellnessResults = ({ formData, dietPlan, onReset }: WellnessResultsProps) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <WellnessResultsHeaderActions
        formData={formData}
        dietPlan={dietPlan}
        onReset={onReset}
      />

      <WellnessMetricsDisplay
        bmi={dietPlan.bmi}
        bmiCategory={dietPlan.bmiCategory}
        bmr={dietPlan.bmr}
        dailyCalories={dietPlan.dailyCalories}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <PlanDetailsCard formData={formData} />
      </motion.div>
      
      <div className="space-y-6">
        {dietPlan.days.map((dietDay) => (
          <motion.div
            key={dietDay.day}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: dietDay.day * 0.01 }}
          >
            <WellnessDietDayCard dietDay={dietDay} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WellnessResults;
