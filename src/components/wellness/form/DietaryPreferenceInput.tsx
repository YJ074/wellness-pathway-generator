
import React from 'react';
import { Salad, HelpCircle } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DietaryPreferenceInputProps {
  value: string;
  onChange: (value: string) => void;
}

const dietaryDescriptions = {
  'lacto-vegetarian': 'A diet that excludes meat, fish, and eggs, but includes dairy products. Commonly practiced in India, this diet focuses on plant-based foods and dairy nutrition.',
  'lacto-ovo-vegetarian': 'A flexible vegetarian diet that includes dairy products and eggs, while excluding meat and fish.',
  'pure-vegetarian': 'A diet that excludes all animal products except dairy.',
  'jain': 'A strict vegetarian diet following Jain religious principles.',
  'pure-jain': 'Strict Jain satvik diet. Excludes all root vegetables (potato, carrot, beetroot, radish, onion, garlic, ginger), sprouts, fruits (if not traditionally permitted), fermented foods, mushrooms, and absolutely all animal products. Focus on grains, pulses, gourds, leafy vegetables, and dairy.',
  'sattvic': 'A diet rooted in Ayurvedic and yogic traditions, emphasizing pure, natural, and minimally processed foods.',
  'non-vegetarian': 'A diet that includes all food groups: meats, fish, eggs, and vegetarian options.'
};

const DietaryPreferenceInput = ({ value, onChange }: DietaryPreferenceInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor="dietary" className="flex items-center gap-2">
          <Salad className="w-4 h-4" /> Dietary Preference
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-full h-6 w-6 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
              <HelpCircle className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4">
            <div className="space-y-4">
              <h4 className="font-medium leading-none mb-2">Dietary Preferences Guide</h4>
              {Object.entries(dietaryDescriptions).map(([key, description]) => (
                <div key={key} className="space-y-1">
                  <h5 className="text-sm font-medium leading-none">
                    {key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h5>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select dietary preference" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lacto-vegetarian">Lacto Vegetarian</SelectItem>
          <SelectItem value="lacto-ovo-vegetarian">Lacto-Ovo Vegetarian</SelectItem>
          <SelectItem value="pure-vegetarian">Pure Vegetarian</SelectItem>
          <SelectItem value="jain">Jain</SelectItem>
          <SelectItem value="pure-jain">Pure Jain</SelectItem>
          <SelectItem value="sattvic">Sattvic</SelectItem>
          <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground mt-1">
        {dietaryDescriptions[value as keyof typeof dietaryDescriptions] || 'Select a dietary preference to see description'}
      </p>
    </div>
  );
};

export default DietaryPreferenceInput;
