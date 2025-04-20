import React from 'react';
import { User, Mail, Cake, Ruler, Weight, Salad, Target, Activity } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface FormInputsProps {
  formData: {
    name: string;
    email: string;
    age: string;
    height: string;
    weight: string;
    dietaryPreference: 'lacto-vegetarian' | 'lacto-ovo-vegetarian' | 'pure-vegetarian' | 'jain' | 'sattvic' | 'non-vegetarian';
    fitnessGoal: string;
    exerciseFrequency: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

const dietaryDescriptions = {
  'lacto-vegetarian': 'A diet that excludes meat, fish, and eggs, but includes dairy products. Commonly practiced in India, this diet focuses on plant-based foods and dairy nutrition. Rich in vegetables, fruits, grains, legumes, and dairy products like milk, yogurt, and paneer.',
  
  'lacto-ovo-vegetarian': 'A flexible vegetarian diet that includes dairy products and eggs, while excluding meat and fish. Provides a balanced approach to vegetarian eating, offering additional protein sources through eggs and dairy. Popular among those seeking a more varied vegetarian diet.',
  
  'pure-vegetarian': 'A diet that excludes all animal products except dairy. Similar to veganism but allows dairy consumption. Emphasizes plant-based whole foods, legumes, grains, fruits, and vegetables. Often chosen for ethical, health, or cultural reasons in Indian contexts.',
  
  'jain': 'A strict vegetarian diet following Jain religious principles. Excludes root vegetables, eggs, and any foods that might harm living organisms. Focuses on ahimsa (non-violence) by avoiding foods that require killing plants or animals. Includes fruits, leafy vegetables, grains, and dairy.',
  
  'sattvic': 'A diet rooted in Ayurvedic and yogic traditions, emphasizing pure, natural, and minimally processed foods. Includes fresh, organic vegetables, fruits, whole grains, and dairy. Avoids stimulants, onions, garlic, and promotes foods that bring mental clarity and spiritual balance.',
  
  'non-vegetarian': 'A diet that includes all food groups: meats, fish, eggs, and vegetarian options. Provides a wide variety of protein sources and nutrients. Common in many Indian households, offering flexibility in meal planning and catering to diverse nutritional needs.'
};

const WellnessFormInputs = ({ formData, handleInputChange }: FormInputsProps) => {
  return (
    <div className="space-y-6">
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
          <Salad className="w-4 h-4" /> Dietary Preference
        </Label>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Select
              value={formData.dietaryPreference}
              onValueChange={(value) => handleInputChange('dietaryPreference', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select dietary preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lacto-vegetarian">Lacto Vegetarian</SelectItem>
                <SelectItem value="lacto-ovo-vegetarian">Lacto-Ovo Vegetarian</SelectItem>
                <SelectItem value="pure-vegetarian">Pure Vegetarian</SelectItem>
                <SelectItem value="jain">Jain</SelectItem>
                <SelectItem value="sattvic">Sattvic</SelectItem>
                <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
              </SelectContent>
            </Select>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <p className="text-sm text-muted-foreground">
              {dietaryDescriptions[formData.dietaryPreference] || 'Select a dietary preference to see description'}
            </p>
          </HoverCardContent>
        </HoverCard>
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
    </div>
  );
};

export default WellnessFormInputs;
