
import React from 'react';
import { motion } from 'framer-motion';
import WellnessResultsHeaderActions from "./WellnessResultsHeaderActions";
import WellnessMetricsDisplay from "./WellnessMetricsDisplay";
import WellnessDietDayCard from "./WellnessDietDayCard";
import PlanDetailsCard from './PlanDetailsCard';
import { FormData, DietPlan, WorkoutPlan } from './types';

interface WellnessResultsProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan: WorkoutPlan | null; // Make it optional since we're adding it now
  onReset: () => void;
}

const WellnessResults = ({ formData, dietPlan, workoutPlan, onReset }: WellnessResultsProps) => {
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
        hasMuscularBuild={!!formData.has_muscular_build}
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
            <WellnessDietDayCard 
              dietDay={dietDay}
              formData={formData}
              workoutDay={workoutPlan ? workoutPlan.days.find(w => w.day === dietDay.day) : undefined}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WellnessResults;
