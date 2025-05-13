/**
 * Webhook service for sending data to external services like Make.com
 * This file handles webhook communication without exposing it in the UI
 */

import { DietPlan, FormData, WorkoutPlan } from '@/components/wellness/types';
import { pdf, Document } from '@react-pdf/renderer';
import React from 'react';
import WellnessPDF from '@/components/wellness/WellnessPDF';
import { toast } from '@/hooks/use-toast';

// Make.com webhook URL - you should replace this with your actual Make.com webhook URL
// This should be a URL provided by Make.com when you create a webhook there
const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/YOUR_WEBHOOK_ID';

/**
 * Sends wellness plan data to a Make.com webhook endpoint
 * @param formData User form data
 * @param dietPlan Generated diet plan
 * @param workoutPlan Optional workout plan
 */
export const sendPlanToMakeWebhook = async (
  formData: FormData, 
  dietPlan: DietPlan, 
  workoutPlan?: WorkoutPlan
): Promise<boolean> => {
  try {
    console.log("Preparing to send wellness plan data to Make.com webhook");
    
    // Prepare webhook payload with wellness plan data
    const webhookData = {
      userInfo: {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        weight: formData.weight,
        height: formData.height || `${formData.heightFeet}'${formData.heightInches}"`,
        mobileNumber: formData.mobileNumber,
        fitnessGoal: formData.fitnessGoal,
        dietaryPreference: formData.dietaryPreference,
        wellnessGoals: formData.wellnessGoals,
        timestamp: new Date().toISOString()
      },
      contactInfo: {
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        name: formData.name
      },
      dietPlan: {
        metrics: {
          bmi: dietPlan.bmi,
          bmiCategory: dietPlan.bmiCategory,
          bmr: dietPlan.bmr,
          dailyCalories: dietPlan.dailyCalories
        },
        days: dietPlan.days.map(day => ({
          ...day,
          // Format wellness benefits for better presentation
          wellnessInfo: {
            hairNutrients: day.hairNutrients,
            skinNutrients: day.skinNutrients,
            fatLossNotes: day.fatLossNotes,
            pcosFriendlyNotes: day.pcosFriendlyNotes,
            herbalRecommendations: day.herbalRecommendations
          }
        }))
      },
      workoutPlan: workoutPlan ? {
        days: workoutPlan.days
      } : null,
      // Adding metadata for Make.com processing
      metadata: {
        source: 'arogyam75',
        version: '1.0',
        includesWorkout: !!workoutPlan
      }
    };
    
    console.log("Sending wellness plan data to Make.com webhook");
    
    // Send the webhook payload to Make.com
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });
    
    if (!response.ok) {
      console.error("Make.com webhook API error:", await response.text());
      toast({
        title: "Webhook Error",
        description: "Could not send your data to our systems. We'll still provide your plan here.",
        variant: "destructive",
      });
      return false;
    }
    
    console.log("Wellness plan sent successfully to Make.com");
    return true;
  } catch (error) {
    console.error("Error sending webhook to Make.com:", error);
    return false;
  }
};

/**
 * Sends PDF data to a webhook endpoint
 * @param formData User form data
 * @param dietPlan Generated diet plan
 * @param workoutPlan Optional workout plan
 */
export const sendPDFToWebhook = async (
  formData: FormData, 
  dietPlan: DietPlan, 
  workoutPlan?: WorkoutPlan
): Promise<boolean> => {
  try {
    console.log("Preparing to send PDF data to webhook");
    
    // Create the PDF document properly typed as Document element
    // The type casting is necessary to resolve the TypeScript error
    const pdfDocument = React.createElement(WellnessPDF as unknown as React.FC<Record<string, unknown>>, { 
      formData, 
      dietPlan, 
      workoutPlan 
    });
    
    // Generate PDF as base64 data
    const pdfBlob = await pdf(pdfDocument).toBlob();
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const base64data = reader.result?.toString().split(',')[1];
          
          // Prepare webhook payload with PDF data and user information
          const webhookData = {
            userInfo: {
              name: formData.name,
              email: formData.email,
              age: formData.age,
              gender: formData.gender,
              fitnessGoal: formData.fitnessGoal,
              dietaryPreference: formData.dietaryPreference,
              timestamp: new Date().toISOString()
            },
            contactData: {
              email: formData.email,
              mobileNumber: formData.mobileNumber,
              name: formData.name
            },
            pdfData: base64data,
            // Adding metadata for Make.com processing
            metadata: {
              contentType: 'application/pdf',
              filename: `${formData.name.replace(/\s+/g, '-').toLowerCase()}-wellness-plan.pdf`,
              source: 'arogyam75'
            }
          };
          
          console.log("Sending webhook with PDF data");
          
          // Send the webhook payload
          const response = await fetch(MAKE_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookData),
          });
          
          if (!response.ok) {
            console.error("Webhook API error:", await response.text());
            resolve(false);
            return;
          }
          
          console.log("Webhook sent successfully");
          resolve(true);
        } catch (error) {
          console.error("Error sending webhook:", error);
          resolve(false);
        }
      };
      
      reader.onerror = () => {
        console.error("Error reading PDF blob");
        resolve(false);
      };
      
      // Read the blob as Data URL to get base64 data
      reader.readAsDataURL(pdfBlob);
    });
  } catch (error) {
    console.error("Error in webhook preparation:", error);
    return false;
  }
};
