
import React from 'react';
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PlanDetailsCard from './PlanDetailsCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WellnessPDF from './WellnessPDF';
import { FormData, DietPlan } from './types';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your 75-Day Diet Plan</h2>
        <div className="space-x-2">
          <PDFDownloadLink
            document={
              <WellnessPDF
                formData={formData}
                dietPlan={dietPlan}
              />
            }
            fileName={`${formData.name}-75-day-diet-plan.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                {loading ? "Generating PDF..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          <Button onClick={onReset} variant="outline">
            Back to Form
          </Button>
        </div>
      </div>
      
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
            <Card className="w-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Day {dietDay.day}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 border-b pb-6">
                  <h3 className="text-xl font-semibold text-primary">Diet Plan</h3>
                  <div className="space-y-2">
                    <p><strong>Breakfast:</strong> {dietDay.breakfast}</p>
                    <p><strong>Lunch:</strong> {dietDay.lunch}</p>
                    <p><strong>Dinner:</strong> {dietDay.dinner}</p>
                    <p><strong>Snacks:</strong> {dietDay.snacks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WellnessResults;
