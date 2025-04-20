
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import WellnessFormInputs from './WellnessFormInputs';
import { FormData } from './types';
import { motion } from 'framer-motion';

interface WellnessFormViewProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isGenerating: boolean;
}

const WellnessFormView = ({ 
  formData, 
  handleInputChange, 
  handleSubmit,
  isGenerating 
}: WellnessFormViewProps) => {
  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WellnessFormInputs formData={formData} handleInputChange={handleInputChange} />
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          type="submit" 
          className="w-full bg-brand-blue hover:bg-brand-blue/90" 
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : <><Send className="w-4 h-4 mr-2" /> Generate Wellness Plan</>}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default WellnessFormView;
