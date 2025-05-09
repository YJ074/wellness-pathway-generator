
import WellnessForm from "@/components/WellnessForm";
import { motion } from "framer-motion";
import { useEffect, lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  useEffect(() => {
    console.log('Index component mounted');
    console.log('WellnessForm import check:', WellnessForm);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <Suspense fallback={<Skeleton className="h-36 w-36 rounded-md" />}>
            <motion.img 
              src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" 
              alt="Arogyam75 Logo" 
              loading="lazy"
              className="h-36 w-auto mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.2 }}
            />
          </Suspense>
          <div className="text-center mb-8 max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Fit India Movement
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Embark on a personalized 75-day wellness journey tailored to your unique health goals and lifestyle.
            </p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm"
            >
              Arogyam75 creates customized diet and workout plans based on your personal health data, 
              dietary preferences, and fitness goals. Fill out the form below to generate your 75-day wellness pathway.
            </motion.p>
          </div>
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <WellnessForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
