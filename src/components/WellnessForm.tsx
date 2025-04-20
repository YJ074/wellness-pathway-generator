
import React, { useState } from 'react';
import { User, Mail, Cake, Ruler, Weight, Egg, Send, Target, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  name: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  dietaryPreference: 'vegetarian' | 'eggitarian' | 'vegan';
  fitnessGoal: string;
  exerciseFrequency: string;
}

const WellnessForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    dietaryPreference: 'vegetarian',
    fitnessGoal: '',
    exerciseFrequency: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form Submitted",
      description: "Your wellness plan will be generated shortly.",
    });
    console.log(formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="w-4 h-4" /> Name
        </Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4" /> Email
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age" className="flex items-center gap-2">
          <Cake className="w-4 h-4" /> Age
        </Label>
        <Input
          id="age"
          type="number"
          required
          value={formData.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="height" className="flex items-center gap-2">
          <Ruler className="w-4 h-4" /> Height (cm)
        </Label>
        <Input
          id="height"
          type="number"
          required
          value={formData.height}
          onChange={(e) => handleInputChange('height', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight" className="flex items-center gap-2">
          <Weight className="w-4 h-4" /> Weight (kg)
        </Label>
        <Input
          id="weight"
          type="number"
          required
          value={formData.weight}
          onChange={(e) => handleInputChange('weight', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dietary" className="flex items-center gap-2">
          <Egg className="w-4 h-4" /> Dietary Preference
        </Label>
        <Select
          value={formData.dietaryPreference}
          onValueChange={(value) => handleInputChange('dietaryPreference', value as FormData['dietaryPreference'])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select dietary preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vegetarian">Vegetarian</SelectItem>
            <SelectItem value="eggitarian">Eggitarian</SelectItem>
            <SelectItem value="vegan">Vegan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal" className="flex items-center gap-2">
          <Target className="w-4 h-4" /> Fitness Goal
        </Label>
        <Select
          value={formData.fitnessGoal}
          onValueChange={(value) => handleInputChange('fitnessGoal', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select fitness goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weight-loss">Weight Loss</SelectItem>
            <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="endurance">Endurance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequency" className="flex items-center gap-2">
          <Activity className="w-4 h-4" /> Current Exercise Frequency
        </Label>
        <Select
          value={formData.exerciseFrequency}
          onValueChange={(value) => handleInputChange('exerciseFrequency', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select exercise frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary</SelectItem>
            <SelectItem value="1-2">1-2 times/week</SelectItem>
            <SelectItem value="3-4">3-4 times/week</SelectItem>
            <SelectItem value="5+">5+ times/week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90">
        <Send className="w-4 h-4 mr-2" /> Generate Wellness Plan
      </Button>
    </form>
  );
};

export default WellnessForm;
