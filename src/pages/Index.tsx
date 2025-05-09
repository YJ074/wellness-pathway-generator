
import WellnessForm from "@/components/WellnessForm";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    console.log('Index component mounted');
    console.log('Main content container mounted:', document.querySelector('.main-content-container'));
    document.title = "Arogyam75 - Wellness Pathway Generator";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white main-content-container">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <h1 className="text-4xl font-bold text-center">
            Fit India Movement - Arogyam75
          </h1>
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              Your 75-day wellness journey starts here
            </p>
          </div>
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <WellnessForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
