import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import WellnessForm from "@/components/WellnessForm";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info, BookOpen, Copyright } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    console.log('Index component mounted');
    console.log('WellnessForm component check:', WellnessForm);
    console.log('Device is mobile:', isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center mb-4 md:mb-6"
        >
          <nav className={`bg-white px-3 md:px-6 py-2 md:py-3 rounded-full shadow-sm flex ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
            <Link to="/program-details">
              <Button variant="ghost" size={isMobile ? "sm" : "default"} className="flex items-center gap-1 text-xs md:text-sm">
                <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden xs:inline">Program</span> Details
              </Button>
            </Link>
            <Link to="/about-us">
              <Button variant="ghost" size={isMobile ? "sm" : "default"} className="flex items-center gap-1 text-xs md:text-sm">
                <Info className="h-3 w-3 md:h-4 md:w-4" />
                About Us
              </Button>
            </Link>
          </nav>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 md:space-y-8"
        >
          <motion.img 
            src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" 
            alt="Arogyam75 Logo - 75-day personalized wellness journey" 
            loading="lazy"
            width="144"
            height="144"
            className="h-24 md:h-36 w-auto hover:scale-110 transition-transform duration-300 cursor-pointer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
          />
          <div className="text-center mb-4 md:mb-8 max-w-2xl px-2 md:px-0" style={{ margin: "0" }}>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Fit India Movement
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Embark on a personalized 75-day wellness journey tailored to your unique health goals and lifestyle.
            </p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 text-sm md:text-base text-gray-700 bg-blue-50 p-2 md:p-3 rounded-lg border border-blue-100 shadow-sm"
            >
              Arogyam75 creates customized diet and workout plans based on your personal health data, 
              dietary preferences, and fitness goals. Fill out the form below to generate your 75-day wellness pathway.
            </motion.p>
          </div>
          <div className="w-full max-w-md bg-white shadow-xl md:shadow-2xl rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <WellnessForm />
          </div>
        </motion.div>
        
        <footer className="mt-8 md:mt-16 pb-4 text-center text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <div className="flex items-center">
              <Copyright className="h-3 w-3 mr-1" />
              <span>{new Date().getFullYear()} Arogyam75. All rights reserved.</span>
            </div>
            <div>
              <a href="mailto:support@arogyyam75.com" className="text-blue-600 hover:underline">
                support@arogyyam75.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
