
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet-async";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";

const ProgramDetails = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Helmet>
        <title>Program Details | Arogyam75 - 75-Day Wellness Journey</title>
        <meta name="description" content="Learn about our comprehensive 75-day wellness program that combines traditional Indian practices with modern science for optimal health outcomes." />
        <meta name="keywords" content="Arogyam75, wellness program, 75-day wellness, personalized diet, Indian wellness, fitness program" />
        <meta property="og:title" content="Arogyam75 Program Details - 75-Day Wellness Journey" />
        <meta property="og:description" content="A comprehensive 75-day wellness program that combines traditional Indian practices with modern science for optimal health outcomes." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
        <Link to="/" className="inline-block mb-4 md:mb-6">
          <Button variant="ghost" className="gap-1 md:gap-2 text-sm md:text-base">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
            Back to Home
          </Button>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-10 text-center"
        >
          <img 
            src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" 
            alt="Arogyam75 Program Logo" 
            className="h-20 md:h-28 w-auto mx-auto mb-3 md:mb-4"
            width="112" 
            height="112"
            loading="eager"
          />
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            The Arogyam75 Program
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Your personalized 75-day journey to sustainable wellness
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12 max-w-4xl mx-auto"
        >
          <Card>
            <CardContent className="pt-4 md:pt-6 px-3 md:px-6 pb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-700">Program Overview</h2>
              <p className="mb-4 text-sm md:text-base">
                The Arogyam75 program is a comprehensive 75-day wellness journey designed to help you establish sustainable health habits through personalized nutrition and activity guidance.
              </p>
              
              <p className="mb-4 text-sm md:text-base">
                Unlike generic diet and exercise plans, our program respects your cultural background, food preferences, and individual health needs, creating a pathway that feels natural and sustainable.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-2">Comprehensive Assessment</h3>
                  <p className="text-sm md:text-base">We begin with a thorough understanding of your health profile, dietary habits, and wellness goals.</p>
                </div>
                <div className="bg-purple-50 p-3 md:p-4 rounded-lg border border-purple-100">
                  <h3 className="font-semibold text-purple-800 mb-2">Personalized Planning</h3>
                  <p className="text-sm md:text-base">Your dietary and activity recommendations are tailored to your specific needs, preferences, and regional influences.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Program Components</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="nutrition">
              <AccordionTrigger className="text-base md:text-lg font-medium">Personalized Nutrition Plan</AccordionTrigger>
              <AccordionContent className="text-sm md:text-base">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Day-by-day meal recommendations incorporating regional ingredients</li>
                  <li>Balanced macronutrient distribution aligned with your health goals</li>
                  <li>Integration of traditional superfoods with proven health benefits</li>
                  <li>Gradual dietary modifications that respect your taste preferences</li>
                  <li>Special attention to probiotic and prebiotic components for gut health</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="activity">
              <AccordionTrigger className="text-base md:text-lg font-medium">Activity Guidelines</AccordionTrigger>
              <AccordionContent className="text-sm md:text-base">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Structured exercise recommendations based on your fitness level</li>
                  <li>Integration of traditional practices like yoga and pranayama</li>
                  <li>Progressive intensity adjustments throughout the 75-day period</li>
                  <li>Rest day protocols to ensure proper recovery</li>
                  <li>Activity options that can be performed with minimal equipment</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="lifestyle">
              <AccordionTrigger className="text-base md:text-lg font-medium">Lifestyle Recommendations</AccordionTrigger>
              <AccordionContent className="text-sm md:text-base">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Sleep hygiene practices derived from traditional wisdom</li>
                  <li>Stress management techniques combining ancient and modern approaches</li>
                  <li>Hydration guidelines customized to your activity level and climate</li>
                  <li>Digital wellbeing suggestions to reduce screen-induced stress</li>
                  <li>Mindfulness practices adapted to your daily routine</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="materials">
              <AccordionTrigger className="text-base md:text-lg font-medium">Required Materials</AccordionTrigger>
              <AccordionContent className="text-sm md:text-base">
                <p className="mb-2">The program is designed to require minimal equipment:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Comfortable exercise clothing</li>
                  <li>A yoga mat or exercise mat (optional but recommended)</li>
                  <li>Water bottle for hydration</li>
                  <li>Basic kitchen equipment for meal preparation</li>
                  <li>Mobile device or computer to access your personalized plan</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 md:mb-12 max-w-4xl mx-auto"
        >
          <Card className="border-blue-200">
            <CardContent className="pt-4 md:pt-6">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-700">Expected Outcomes</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-100">
                  <h3 className="font-semibold text-green-800 mb-2">Short-term Benefits</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                    <li>Improved energy levels</li>
                    <li>Enhanced digestion</li>
                    <li>Better sleep quality</li>
                    <li>Reduced bloating</li>
                    <li>Increased mobility</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-2">Long-term Benefits</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                    <li>Sustainable weight management</li>
                    <li>Improved metabolic markers</li>
                    <li>Reduced inflammation</li>
                    <li>Enhanced immune function</li>
                    <li>Established healthy habits</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-50 p-3 md:p-4 rounded-lg border border-yellow-100">
                <h3 className="font-semibold text-yellow-800 mb-2">Your Commitment</h3>
                <p className="text-sm md:text-base">
                  For optimal results, we recommend:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-sm md:text-base">
                  <li>Following your personalized plan consistently</li>
                  <li>Setting aside 30-45 minutes daily for physical activity</li>
                  <li>Planning meals ahead when possible</li>
                  <li>Being patient with your body's adaptation process</li>
                  <li>Celebrating small victories along your wellness journey</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8 md:mb-12"
        >
          <Link to="/" className="inline-block">
            <Button size={isMobile ? "default" : "lg"} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
              Begin Your 75-Day Journey
            </Button>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Transform your health with guidance that respects your unique needs and cultural heritage
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgramDetails;
