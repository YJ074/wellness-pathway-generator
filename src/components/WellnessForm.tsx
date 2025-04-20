
import React, { useState } from 'react';
import { User, Mail, Cake, Ruler, Weight, Egg, Send, Target, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface DietPlan {
  days: Array<{
    day: number;
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  }>;
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
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Generate the diet plan based on user inputs
    const generatedPlan = generateDietPlan(
      formData.dietaryPreference,
      formData.fitnessGoal,
      parseInt(formData.age),
      parseInt(formData.weight)
    );
    
    setDietPlan(generatedPlan);
    setIsGenerating(false);
    
    toast({
      title: "Diet Plan Generated",
      description: "Your 75-day wellness plan has been created.",
    });
    
    console.log(formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Function to generate a personalized diet plan
  const generateDietPlan = (
    dietaryPreference: string,
    fitnessGoal: string,
    age: number,
    weight: number
  ): DietPlan => {
    const days = [];
    const proteinFocus = fitnessGoal === 'muscle-gain';
    const calorieReduction = fitnessGoal === 'weight-loss';
    
    // Get appropriate food items based on dietary preference
    const proteins = getProteinSources(dietaryPreference);
    const grains = getGrainSources();
    const vegetables = getVegetableSources();
    const fruits = getFruitSources();
    const snacks = getSnackSources(dietaryPreference, calorieReduction);
    
    // Generate a 75-day plan
    for (let i = 1; i <= 75; i++) {
      // Create slightly different meals for variety
      const dayIndex = (i - 1) % 15; // Rotate through 15 different base meal patterns
      
      const breakfast = generateBreakfast(dayIndex, dietaryPreference, calorieReduction);
      const lunch = generateLunch(dayIndex, proteins, grains, vegetables, calorieReduction, proteinFocus);
      const dinner = generateDinner(dayIndex, proteins, vegetables, calorieReduction, proteinFocus);
      const daySnacks = generateSnacks(dayIndex, snacks, fruits, calorieReduction);
      
      days.push({
        day: i,
        breakfast,
        lunch,
        dinner,
        snacks: daySnacks
      });
    }
    
    return { days };
  };

  // Helper functions for diet plan generation
  const getProteinSources = (dietaryPreference: string) => {
    const proteins = {
      'vegetarian': [
        'Paneer', 'Tofu', 'Chana (Chickpeas)', 'Rajma (Kidney Beans)', 
        'Moong Dal', 'Toor Dal', 'Sprouts', 'Greek Yogurt',
        'Cottage Cheese', 'Soy Chunks', 'Masoor Dal', 'Urad Dal'
      ],
      'eggitarian': [
        'Eggs', 'Paneer', 'Tofu', 'Chana (Chickpeas)', 'Rajma (Kidney Beans)', 
        'Moong Dal', 'Toor Dal', 'Sprouts', 'Greek Yogurt',
        'Cottage Cheese', 'Soy Chunks', 'Masoor Dal', 'Urad Dal'
      ],
      'vegan': [
        'Tofu', 'Chana (Chickpeas)', 'Rajma (Kidney Beans)', 
        'Moong Dal', 'Toor Dal', 'Sprouts', 'Soy Yogurt',
        'Soy Chunks', 'Masoor Dal', 'Urad Dal', 'Soy Milk', 'Peanut Butter'
      ]
    };
    
    return proteins[dietaryPreference as keyof typeof proteins] || proteins['vegetarian'];
  };

  const getGrainSources = () => {
    return [
      'Brown Rice', 'Quinoa', 'Bajra Roti', 'Jowar Roti', 'Ragi Roti',
      'Whole Wheat Roti', 'Oats', 'Millet', 'Brown Rice Poha',
      'Whole Wheat Bread', 'Multigrain Dosa', 'Red Rice'
    ];
  };

  const getVegetableSources = () => {
    return [
      'Spinach', 'Methi (Fenugreek Leaves)', 'Palak (Spinach)', 'Broccoli',
      'Lauki (Bottle Gourd)', 'Bhindi (Okra)', 'Baingan (Eggplant)',
      'Capsicum (Bell Pepper)', 'Carrots', 'Tomatoes', 'Cabbage',
      'Cauliflower', 'Green Beans', 'Peas', 'Beetroot', 'Pumpkin'
    ];
  };

  const getFruitSources = () => {
    return [
      'Apple', 'Banana', 'Papaya', 'Watermelon', 'Muskmelon',
      'Orange', 'Guava', 'Pomegranate', 'Pineapple', 'Strawberry',
      'Kiwi', 'Mango (in moderation)', 'Jamun', 'Chikoo'
    ];
  };

  const getSnackSources = (dietaryPreference: string, isWeightLoss: boolean) => {
    const baseSnacks = [
      'Roasted Chana', 'Makhana (Fox Nuts)', 'Murmura (Puffed Rice)',
      'Sprouts Chaat', 'Cucumber Slices', 'Carrot Sticks',
      'Homemade Hummus', 'Buttermilk', 'Vegetable Soup'
    ];
    
    if (dietaryPreference === 'eggitarian' && !isWeightLoss) {
      baseSnacks.push('Boiled Egg');
    }
    
    return baseSnacks;
  };

  const generateBreakfast = (dayIndex: number, dietaryPreference: string, isWeightLoss: boolean) => {
    const breakfastOptions = [
      'Vegetable Poha with curd',
      'Oats Idli with sambhar',
      'Vegetable Upma with a side of sprouts',
      'Besan Chilla with mint chutney',
      'Multigrain Dosa with coconut chutney',
      'Masala Daliya (Broken Wheat) with vegetables',
      'Ragi Dosa with tomato chutney',
      'Vegetable Uttapam with sambar',
      'Moong Dal Cheela with curd',
      'Steamed Sprouts Dhokla',
      'Vegetable Daliya Khichdi',
      'Jowar Upma with vegetables',
      'Quinoa Poha with vegetables',
      'Brown Rice Idli with tomato chutney',
      'Bajra Roti with vegetable curry'
    ];
    
    if (dietaryPreference === 'eggitarian') {
      const eggBreakfasts = [
        'Egg Bhurji with multigrain roti',
        'Masala Omelette with vegetable stuffing',
        'Boiled Eggs with vegetable sandwich',
        'Egg and Vegetable Wrap'
      ];
      
      // Substitute some vegetarian options with egg options
      if (dayIndex % 4 === 0) {
        return eggBreakfasts[dayIndex % eggBreakfasts.length];
      }
    }
    
    return breakfastOptions[dayIndex];
  };

  const generateLunch = (
    dayIndex: number, 
    proteins: string[], 
    grains: string[], 
    vegetables: string[], 
    isWeightLoss: boolean,
    isProteinFocus: boolean
  ) => {
    const protein = proteins[dayIndex % proteins.length];
    const grain = grains[dayIndex % grains.length];
    const veggie1 = vegetables[dayIndex % vegetables.length];
    const veggie2 = vegetables[(dayIndex + 5) % vegetables.length];
    
    let lunch = '';
    
    if (isWeightLoss) {
      lunch = `${grain} (small portion), ${protein} curry, ${veggie1} and ${veggie2} stir-fry, small bowl of curd`;
    } else if (isProteinFocus) {
      lunch = `${grain}, double portion of ${protein} curry, ${veggie1} and ${veggie2} stir-fry, bowl of curd`;
    } else {
      lunch = `${grain}, ${protein} curry, ${veggie1} and ${veggie2} stir-fry, bowl of curd`;
    }
    
    return lunch;
  };

  const generateDinner = (
    dayIndex: number, 
    proteins: string[], 
    vegetables: string[], 
    isWeightLoss: boolean,
    isProteinFocus: boolean
  ) => {
    const protein = proteins[(dayIndex + 3) % proteins.length];
    const veggie1 = vegetables[(dayIndex + 2) % vegetables.length];
    const veggie2 = vegetables[(dayIndex + 8) % vegetables.length];
    
    let dinner = '';
    
    if (isWeightLoss) {
      dinner = `${protein} curry (light), ${veggie1} and ${veggie2} sabzi, small bowl of buttermilk`;
    } else if (isProteinFocus) {
      dinner = `${protein} curry (generous portion), ${veggie1} and ${veggie2} sabzi, bowl of buttermilk`;
    } else {
      dinner = `${protein} curry, ${veggie1} and ${veggie2} sabzi, bowl of buttermilk`;
    }
    
    return dinner;
  };

  const generateSnacks = (
    dayIndex: number, 
    snacks: string[], 
    fruits: string[], 
    isWeightLoss: boolean
  ) => {
    const snack = snacks[dayIndex % snacks.length];
    const fruit = fruits[dayIndex % fruits.length];
    
    if (isWeightLoss) {
      return `${fruit} OR ${snack} (choose one per day)`;
    } else {
      return `${fruit} AND ${snack}`;
    }
  };

  return (
    <div className="space-y-6 w-full max-w-4xl">
      {!dietPlan ? (
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

          <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90" disabled={isGenerating}>
            {isGenerating ? 'Generating...' : <><Send className="w-4 h-4 mr-2" /> Generate Wellness Plan</>}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your 75-Day Diet Plan</h2>
            <Button 
              onClick={() => setDietPlan(null)} 
              variant="outline"
            >
              Back to Form
            </Button>
          </div>
          
          <div className="space-y-4">
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle>Plan Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Age:</strong> {formData.age} years</p>
                <p><strong>Weight:</strong> {formData.weight} kg</p>
                <p><strong>Dietary Preference:</strong> {formData.dietaryPreference}</p>
                <p><strong>Fitness Goal:</strong> {formData.fitnessGoal.replace('-', ' ')}</p>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dietPlan.days.map((day) => (
                <Card key={day.day}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Day {day.day}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Breakfast:</strong> {day.breakfast}</p>
                    <p><strong>Lunch:</strong> {day.lunch}</p>
                    <p><strong>Dinner:</strong> {day.dinner}</p>
                    <p><strong>Snacks:</strong> {day.snacks}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellnessForm;
