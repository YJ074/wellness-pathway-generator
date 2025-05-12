
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProgramDetails = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-block mb-6">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            The 75-Day Wellness Journey
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive program designed to transform your health and wellness through personalized nutrition and fitness guidance.
          </p>
        </motion.div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="daily">Daily Activities</TabsTrigger>
            <TabsTrigger value="outcomes">Expected Outcomes</TabsTrigger>
            <TabsTrigger value="materials">Materials & Commitment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">Program Overview</h3>
                <p className="mb-4">
                  Arogyam75 is a transformative 75-day wellness journey that combines modern nutritional science with traditional Indian wellness wisdom. This program is designed to help you achieve sustainable health improvements through personalized diet plans, appropriate physical activity, and mindful wellness practices.
                </p>
                <p className="mb-4">
                  Over the course of 75 days, you will follow a customized plan created specifically for your body type, health goals, dietary preferences, and regional food availability. The program is structured to gradually build healthy habits while addressing your unique health concerns.
                </p>
                <h4 className="text-xl font-medium mb-2 text-blue-600">Key Program Components:</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Personalized meal plans incorporating regional Indian ingredients</li>
                  <li>Customized workout routines based on your fitness level</li>
                  <li>Progressive difficulty adjustment as your fitness improves</li>
                  <li>Integration of traditional herbal recommendations</li>
                  <li>Specialized guidance for specific health concerns</li>
                  <li>Comprehensive PDF plans you can download and follow offline</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="daily" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">Daily Activities</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-blue-600">Nutrition</h4>
                    <p className="mb-3">Each day includes a complete meal plan with:</p>
                    <ul className="list-disc pl-6 space-y-1 mb-4">
                      <li>Breakfast rich in complex carbohydrates and protein</li>
                      <li>Mid-morning snack to maintain energy levels</li>
                      <li>Balanced lunch with optimal macronutrient distribution</li>
                      <li>Evening snack to prevent unhealthy cravings</li>
                      <li>Dinner designed for proper digestion and recovery</li>
                      <li>Hydration guidelines throughout the day</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-blue-600">Physical Activity</h4>
                    <p className="mb-3">The exercise component includes:</p>
                    <ul className="list-disc pl-6 space-y-1 mb-4">
                      <li>5-6 days of structured physical activity per week</li>
                      <li>Strength training with progressive resistance</li>
                      <li>Cardiovascular exercises tailored to your fitness level</li>
                      <li>Flexibility and mobility work</li>
                      <li>Strategic rest days for recovery</li>
                      <li>Weekly progress tracking</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-blue-600">Wellness Practices</h4>
                    <p className="mb-3">Daily wellness recommendations include:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Morning and evening routines for optimal health</li>
                      <li>Stress management techniques</li>
                      <li>Sleep optimization practices</li>
                      <li>Mindful eating guidance</li>
                      <li>Traditional herbal support when appropriate</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outcomes" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">Expected Outcomes</h3>
                <p className="mb-4">
                  While individual results may vary, participants who follow the program consistently typically experience:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                    <h4 className="text-xl font-medium mb-3 text-blue-700">Physical Changes</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Improved body composition</li>
                      <li>Increased energy levels</li>
                      <li>Better digestive health</li>
                      <li>Enhanced physical fitness</li>
                      <li>Improved sleep quality</li>
                      <li>Balanced weight management</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                    <h4 className="text-xl font-medium mb-3 text-purple-700">Wellness Improvements</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Reduced stress levels</li>
                      <li>Greater mental clarity</li>
                      <li>More consistent mood</li>
                      <li>Healthier relationship with food</li>
                      <li>Improved immunity</li>
                      <li>Sustainable healthy habits</li>
                    </ul>
                  </div>
                </div>
                
                <h4 className="text-xl font-medium mb-3 text-blue-600">Long-Term Benefits</h4>
                <p className="mb-3">
                  The Arogyam75 program is designed not just for short-term results, but to help you establish sustainable habits that continue to benefit your health long after the 75 days are complete. Participants typically report:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Better understanding of their body's nutritional needs</li>
                  <li>Increased confidence in making healthy food choices</li>
                  <li>Improved ability to maintain consistent physical activity</li>
                  <li>Greater awareness of how lifestyle choices impact wellbeing</li>
                  <li>Enhanced knowledge of traditional wellness practices</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">Required Materials & Commitment</h3>
                
                <div className="mb-6">
                  <h4 className="text-xl font-medium mb-3 text-blue-600">Time Commitment</h4>
                  <p className="mb-3">To achieve optimal results, participants should be prepared to commit:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>15-30 minutes for meal preparation each day (can be batch cooked)</li>
                    <li>30-60 minutes for physical activity 5-6 days per week</li>
                    <li>10-15 minutes for wellness practices daily</li>
                    <li>Weekly time for grocery shopping and meal planning</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xl font-medium mb-3 text-blue-600">Kitchen Equipment</h4>
                  <p className="mb-3">Basic kitchen equipment recommended for meal preparation:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Basic cooking utensils</li>
                    <li>Food storage containers for meal prep</li>
                    <li>Measuring cups and spoons</li>
                    <li>Blender (helpful but optional)</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xl font-medium mb-3 text-blue-600">Fitness Equipment</h4>
                  <p className="mb-3">
                    The program is designed to require minimal equipment, with bodyweight exercises forming the foundation. However, these items can enhance your experience:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Comfortable athletic clothing</li>
                    <li>Supportive footwear for exercise</li>
                    <li>Exercise mat for floor exercises</li>
                    <li>Resistance bands (optional but recommended)</li>
                    <li>Light dumbbells (optional)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-medium mb-3 text-blue-600">Digital Access</h4>
                  <p className="mb-3">To fully utilize the program resources:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Digital device (computer, tablet, or smartphone)</li>
                    <li>Internet connection to access your personalized plan</li>
                    <li>Printer access (optional) to print your PDF plan</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgramDetails;
