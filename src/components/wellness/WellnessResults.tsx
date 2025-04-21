import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PlanDetailsCard from './PlanDetailsCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WellnessPDF from './WellnessPDF';
import { FormData, DietPlan } from './types';
import { Download, Mail, Send, Share, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { sendPlanViaEmail, sendPlanViaWhatsApp } from '@/utils/sharing';
import WellnessResultsHeaderActions from "./WellnessResultsHeaderActions";
import WellnessMetricsDisplay from "./WellnessMetricsDisplay";
import WellnessDietDayCard from "./WellnessDietDayCard";

interface WellnessResultsProps {
  formData: FormData;
  dietPlan: DietPlan;
  onReset: () => void;
}

const WellnessResults = ({ formData, dietPlan, onReset }: WellnessResultsProps) => {
  const { toast } = useToast();
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isWhatsAppSending, setIsWhatsAppSending] = useState(false);
  
  // Helper function to get appropriate BMI category color
  const getBmiCategoryColor = (category: string): string => {
    switch (category) {
      case 'underweight':
        return 'text-amber-600';
      case 'normal':
        return 'text-green-600';
      case 'athletic build':
        return 'text-blue-600';
      case 'overweight':
        return 'text-orange-600';
      case 'high BMI':
      case 'obese':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  
  const handleSendEmail = async () => {
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please provide an email address to send the plan.",
        variant: "destructive",
      });
      return;
    }
    
    setIsEmailSending(true);
    try {
      await sendPlanViaEmail(formData, dietPlan);
      toast({
        title: "Success!",
        description: `Your wellness plan has been sent to ${formData.email}`,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Sending Failed",
        description: "Could not send the plan via email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEmailSending(false);
    }
  };
  
  const handleSendWhatsApp = async () => {
    if (!formData.mobileNumber || !formData.mobileNumber.startsWith('+91')) {
      toast({
        title: "Valid Phone Number Required",
        description: "Please provide a valid Indian mobile number to send the plan via WhatsApp.",
        variant: "destructive",
      });
      return;
    }
    
    setIsWhatsAppSending(true);
    try {
      await sendPlanViaWhatsApp(formData, dietPlan);
      toast({
        title: "WhatsApp Message Sent!",
        description: `Your wellness plan has been shared via WhatsApp to ${formData.mobileNumber}`,
      });
    } catch (error) {
      console.error("Error sending WhatsApp:", error);
      toast({
        title: "Sending Failed",
        description: "Could not send the plan via WhatsApp. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsWhatsAppSending(false);
    }
  };
  
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
