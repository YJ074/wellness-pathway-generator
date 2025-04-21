
import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import WellnessFormInputs from './WellnessFormInputs';
import { FormData } from './types';
import { motion } from 'framer-motion';
import { TooltipProvider } from "@/components/ui/tooltip";

interface WellnessFormViewProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isGenerating: boolean;
}

const TAB_KEYS = ['personal', 'diet', 'fitness'] as const;
type TabKey = typeof TAB_KEYS[number];

const WellnessFormView = ({ 
  formData, 
  handleInputChange, 
  handleSubmit,
  isGenerating 
}: WellnessFormViewProps) => {
  const [currentTab, setCurrentTab] = useState<TabKey>('personal');

  // Validate required fields for next navigation
  const canGoNextFromPersonal =
    !!formData.name && !!formData.email && !!formData.age &&
    ((!!formData.height) || (!!formData.heightFeet && !!formData.heightInches)) &&
    !!formData.weight && !!formData.mobileNumber && !!formData.gender;

  const canGoNextFromDiet = !!formData.dietaryPreference;

  // Action for Next button
  const handleNext = () => {
    if (currentTab === 'personal' && canGoNextFromPersonal) {
      setCurrentTab('diet');
    } else if (currentTab === 'diet' && canGoNextFromDiet) {
      setCurrentTab('fitness');
    }
  };

  const tabIdx = TAB_KEYS.indexOf(currentTab);

  return (
    <TooltipProvider>
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WellnessFormInputs 
          formData={formData} 
          handleInputChange={handleInputChange}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Show Next button for Personal/Diet; Show Generate only for Fitness */}
          {currentTab !== 'fitness' ? (
            <Button
              type="button"
              className="w-full bg-brand-blue hover:bg-brand-blue/90"
              onClick={handleNext}
              disabled={
                (currentTab === 'personal' && !canGoNextFromPersonal) ||
                (currentTab === 'diet' && !canGoNextFromDiet)
              }
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="w-full bg-brand-blue hover:bg-brand-blue/90" 
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : <><Send className="w-4 h-4 mr-2" /> Generate Wellness Plan</>}
            </Button>
          )}
        </motion.div>
      </motion.form>
    </TooltipProvider>
  );
};

export default WellnessFormView;
