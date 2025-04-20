
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import WellnessFormInputs from './WellnessFormInputs';
import { FormData } from './types';

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
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <WellnessFormInputs formData={formData} handleInputChange={handleInputChange} />
      <Button 
        type="submit" 
        className="w-full bg-brand-blue hover:bg-brand-blue/90" 
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : <><Send className="w-4 h-4 mr-2" /> Generate Wellness Plan</>}
      </Button>
    </form>
  );
};

export default WellnessFormView;
