
// Generate regional cultural notes
export const generateRegionalNote = (region?: string): string | undefined => {
  if (!region) return undefined;
  
  const notes: Record<string, string[]> = {
    'north': [
      "This North Indian meal uses ghee for authentic flavor while keeping portions controlled.",
      "Incorporates traditional Punjabi spices that aid digestion and boost metabolism.",
      "Features classic North Indian protein sources like rajma and paneer for sustained energy.",
      "Uses traditional cooking techniques from Punjab that preserve nutrients while adding flavor."
    ],
    'south': [
      "Includes fermented foods common in South Indian cuisine that support gut health.",
      "Uses coconut in moderation, a staple in South Indian cooking rich in medium-chain fatty acids.",
      "Features traditional South Indian spices like curry leaves and mustard seeds with medicinal properties.",
      "Incorporates rice varieties native to South India that have lower glycemic index."
    ],
    'east': [
      "Uses mustard oil, rich in monounsaturated fats, common in Eastern Indian cooking.",
      "Features Bengali-style preparation techniques that maximize the nutritional profile.",
      "Incorporates seasonal greens used abundantly in Eastern Indian cuisine.",
      "Balanced with traditional Eastern Indian spice blends beneficial for metabolism."
    ],
    'west': [
      "Uses jaggery instead of sugar, a healthier sweetener common in Western Indian cuisine.",
      "Features traditional Gujarati/Maharashtrian cooking methods that enhance flavors without excessive fat.",
      "Incorporates Western Indian spices known for their digestive benefits.",
      "Balanced with protein sources traditionally used in Western Indian meals."
    ],
    'central': [
      "Features whole grains native to Central India, known for their high fiber content.",
      "Uses traditional spice blends from Madhya Pradesh that aid digestion.",
      "Incorporates cooking methods that preserve nutrients while enhancing flavors.",
      "Balanced with local protein sources traditional to Central Indian cuisine."
    ],
    'northeast': [
      "Includes herbs and spices native to Northeast India with medicinal properties.",
      "Features fermentation methods traditional to Northeast Indian cuisine that enhance probiotic content.",
      "Uses minimal oil cooking techniques common in Northeastern tribal cooking.",
      "Incorporates indigenous grains and vegetables high in micronutrients."
    ]
  };
  
  const regionLower = region.toLowerCase();
  return notes[regionLower] ? notes[regionLower][Math.floor(Math.random() * notes[regionLower].length)] : undefined;
};
