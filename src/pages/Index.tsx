
import WellnessForm from "@/components/WellnessForm";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <motion.img 
            src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" 
            alt="Arogyam75 Logo" 
            className="h-36 w-auto mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
          />
          <div className="text-center mb-8 max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Fit India Movement
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Embark on a personalized 75-day wellness journey tailored to your unique health goals and lifestyle.
            </p>
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
