
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PlanDetailsCard from './PlanDetailsCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WellnessPDF from './WellnessPDF';
import { FormData, DietPlan } from './types';
import { Download, Mail, Send, Share } from 'lucide-react';
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
        <h2 className="text-2xl font-bold">Your 75-Day Diet Plan</h2>
        <div className="flex flex-wrap gap-2">
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
