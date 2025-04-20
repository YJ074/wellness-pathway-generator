
import WellnessForm from "@/components/WellnessForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <img 
            src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" 
            alt="Arogyam75 Logo" 
            className="h-24 w-auto mb-4"
          />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Wellness Pathway Generator</h1>
            <p className="text-lg text-gray-600">Complete the form below to receive your personalized wellness plan</p>
          </div>
          <WellnessForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
