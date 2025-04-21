
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold">Your 75-Day Personalized Wellness Plan</h2>
        <div className="flex flex-wrap gap-2">
          <PDFDownloadLink
            document={
              <WellnessPDF
                formData={formData}
                dietPlan={dietPlan}
              />
            }
            fileName={`${formData.name}-75-day-wellness-plan.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                {loading ? "Generating PDF..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          
          <Button variant="outline" onClick={handleSendEmail} disabled={isEmailSending}>
            <Mail className="mr-2 h-4 w-4" />
            {isEmailSending ? "Sending..." : "Email Plan"}
          </Button>
          
          <Button variant="outline" onClick={handleSendWhatsApp} disabled={isWhatsAppSending}>
            <Share className="mr-2 h-4 w-4" />
            {isWhatsAppSending ? "Sending..." : "Share on WhatsApp"}
          </Button>
          
          <Button onClick={onReset} variant="outline">
            Back to Form
          </Button>
        </div>
      </div>
      
      {dietPlan.bmi && dietPlan.bmr && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-50 p-4 rounded-lg border shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-2">Your Health Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-md border">
              <div className="text-sm text-gray-500">Body Mass Index (BMI)</div>
              <div className="text-2xl font-bold">{dietPlan.bmi.toFixed(1)}</div>
              <div className="text-sm">
                Category: <span className={`font-medium ${getBmiCategoryColor(dietPlan.bmiCategory)}`}>
                  {dietPlan.bmiCategory.charAt(0).toUpperCase() + dietPlan.bmiCategory.slice(1)}
                </span>
                {dietPlan.bmiCategory === 'athletic build' && (
                  <p className="text-xs italic mt-1">
                    Based on your exercise frequency, your higher BMI likely reflects muscle mass rather than excess fat.
                  </p>
                )}
              </div>
            </div>
            
            <div className="p-3 bg-white rounded-md border">
              <div className="text-sm text-gray-500">Basal Metabolic Rate (BMR)</div>
              <div className="text-2xl font-bold">{dietPlan.bmr} kcal</div>
              <div className="text-sm">Base calories needed at rest</div>
            </div>
            
            <div className="p-3 bg-white rounded-md border">
              <div className="text-sm text-gray-500">Daily Calorie Target</div>
              <div className="text-2xl font-bold">{dietPlan.dailyCalories} kcal</div>
              <div className="text-sm">Adjusted for your fitness goal</div>
            </div>
          </div>
        </motion.div>
      )}
      
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
                  <div className="space-y-3">
                    <p><strong>Breakfast:</strong> {dietDay.breakfast}</p>
                    
                    {dietDay.midMorningSnack && (
                      <p><strong>Mid-Morning Snack:</strong> {dietDay.midMorningSnack}</p>
                    )}
                    
                    <p><strong>Lunch:</strong> {dietDay.lunch}</p>
                    
                    {dietDay.eveningSnack && (
                      <p><strong>Evening Snack:</strong> {dietDay.eveningSnack}</p>
                    )}
                    
                    <p><strong>Dinner:</strong> {dietDay.dinner}</p>
                    
                    {dietDay.snacks && !dietDay.midMorningSnack && !dietDay.eveningSnack && (
                      <p><strong>Snacks:</strong> {dietDay.snacks}</p>
                    )}
                    
                    {dietDay.calories && (
                      <p className="italic text-sm text-gray-600 mt-2">
                        <strong>Approx. Calories:</strong> {dietDay.calories} kcal
                      </p>
                    )}
                    
                    {dietDay.water && (
                      <p className="italic text-sm text-gray-600">
                        <strong>Water:</strong> {dietDay.water} L
                      </p>
                    )}
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
