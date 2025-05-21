// Generate regional cultural notes with enhanced details about traditional foods and cooking methods
export const generateRegionalNote = (region?: string): string | undefined => {
  if (!region) return undefined;
  
  const notes: Record<string, string[]> = {
    'north': [
      "North Indian cuisine emphasizes hearty, wholesome meals with abundant use of dairy. This meal incorporates ghee in moderation for authentic Punjabi flavor.",
      "Traditional North Indian cooking techniques like 'dum' (slow cooking) preserve nutrients while enhancing the aromatic spices like garam masala and cardamom.",
      "This balanced North Indian thali includes dal, sabzi, and roti - following the traditional Punjab meal structure that naturally provides complete nutrition.",
      "Incorporates paneer, a North Indian protein staple, prepared using traditional methods that maximize nutritional benefits while supporting your wellness goals.",
      "North Indian cuisine features rich gravies balanced with cooling yogurt-based sides. This meal adapts these traditions for optimal nutrition.",
      "The meal includes traditional North Indian grain varieties used in villages for generations, providing a more wholesome alternative to commercial preparations."
    ],
    'south': [
      "South Indian cuisine features fermented foods like dosa and idli that support gut health. This meal balances traditional fermentation with portion control.",
      "This authentic South Indian meal uses coconut in moderation, a cultural staple rich in healthy medium-chain fatty acids that support metabolism.",
      "Incorporates traditional South Indian spice tempering (tadka) with mustard seeds, curry leaves, and asafoetida that aid digestion and add depth of flavor.",
      "Features rice varieties native to South India like red rice or hand-pounded rice that have a lower glycemic index than polished varieties.",
      "South Indian cooking emphasizes steaming and minimal oil preparation methods that naturally preserve nutrients while enhancing flavor.",
      "This meal follows the traditional South Indian principle of balancing six tastes in one meal for holistic nutrition."
    ],
    'east': [
      "East Indian Bengali cuisine traditionally balances five essential flavors in each meal: sweet, sour, salty, bitter, and pungent, creating naturally balanced nutrition.",
      "This meal uses mustard oil, a staple in Eastern Indian cooking rich in monounsaturated fats and traditional to Bengali households.",
      "Features seasonal green leafy vegetables (shaak) prepared in the authentic Bengali style, preserving micronutrients while enhancing flavor.",
      "Incorporates fish protein prepared using traditional Eastern techniques that maximize nutritional value while keeping calories controlled.",
      "East Indian cuisine values the nutritional benefits of bitter greens. This meal includes controlled portions of these traditional ingredients.",
      "Features the traditional Bengali five-spice blend (panch phoron) known for its digestive properties and authentic flavor enhancement."
    ],
    'west': [
      "Western Indian Gujarati meals traditionally balance six tastes (sweet, salty, sour, spicy, bitter, astringent) in one thali, creating naturally holistic nutrition.",
      "Uses jaggery instead of refined sugar, a healthier sweetener common in Maharashtra and Gujarat that provides minerals alongside sweetness.",
      "This meal incorporates fenugreek (methi) and other bitter greens central to Gujarati cuisine that naturally support blood sugar regulation.",
      "Features dal prepared with the traditional Gujarati tempering that uses minimal oil while maximizing flavor through proper spice sequencing.",
      "Western Indian cuisines incorporate numerous legumes and pulses prepared with traditional techniques that enhance protein bioavailability.",
      "The meal includes kokum, a souring agent used in Konkan coastal cuisine that aids digestion and adds flavor without calories."
    ],
    'central': [
      "Central Indian cuisine from Madhya Pradesh emphasizes hearty, warming foods with local grains like jowar and bajra that provide sustained energy.",
      "This meal includes traditional Central Indian wheat preparations that preserve the whole grain goodness while supporting your specific nutritional needs.",
      "Features less-known Central Indian spice blends that aid digestion and have been used traditionally for centuries in Malwa and Bundelkhand regions.",
      "Incorporates traditional Central Indian preparation of legumes that enhances their protein bioavailability while keeping the authentic regional flavor.",
      "Central Indian cooking utilizes slow-cooking clay pot methods that enhance flavors while preserving nutrients, adapted here for daily nutrition.",
      "Features traditional Malwa region ingredients like safflower and sesame seeds that provide essential fatty acids important for cellular health."
    ],
    'northeast': [
      "Northeastern cuisine emphasizes fresh, minimally processed ingredients. This meal features fermentation methods traditional to Assamese and Naga cooking.",
      "Incorporates bamboo shoot preparations common in Northeastern tribal cuisine, providing unique prebiotics that support gut health.",
      "This meal uses minimal oil cooking techniques from Manipuri cuisine that naturally keep calories controlled while maximizing nutrition.",
      "Features indigenous herbs and spices from the Northeast like Sichuan pepper and local ginger varieties that have traditional medicinal properties.",
      "Northeastern cuisines use traditional food preservation methods that enhance both flavor and nutritional benefits of the ingredients.",
      "The meal balances the traditional Northeastern emphasis on fermented foods with fresh seasonal produce for optimal nutrition."
    ],
    'kerala': [
      "Kerala's 'Sadhya' tradition emphasizes balance through multiple small portions served on banana leaf. This meal adapts those principles for daily nutrition.",
      "This meal incorporates coconut oil in moderate amounts, a Kerala staple that provides medium-chain fatty acids beneficial for metabolism.",
      "Features traditional Kerala spice combinations with black pepper, cardamom, and cloves that aid digestion while adding authentic flavor.",
      "Includes kanji (rice gruel) preparation methods from Kerala that optimize the bioavailability of nutrients while supporting gentle digestion.",
      "Kerala cuisine includes numerous medicinal ingredients like curry leaves and turmeric used traditionally in Ayurveda for their health benefits.",
      "The meal introduces Malabar coast seafood preparations rich in omega-3 fatty acids essential for brain and heart health."
    ],
    'punjab': [
      "Punjabi cuisine traditionally celebrates fresh-from-the-farm ingredients. This meal uses whole grains like barley and millets authentic to Punjab.",
      "Features makki di roti (cornmeal flatbread) and sarson da saag (mustard greens) prepared with traditional techniques but controlled portions.",
      "This meal includes Punjabi-style legume preparations that maximize protein content while controlling butter and cream typically used in restaurants.",
      "Incorporates traditional Punjabi home-cooking methods that use minimal oil while preserving the robust flavors through slow cooking.",
      "The hearty Punjabi food tradition evolved to support agricultural laborers. This meal adapts those nutrient-dense traditions for modern activity levels.",
      "Features buttermilk (chaas) preparation methods from rural Punjab that enhance probiotic benefits while supporting digestion."
    ],
    'maharashtra': [
      "Maharashtra's diverse cuisine varies from coastal to interior regions. This meal draws from traditional Maharashtrian home cooking with balanced spices.",
      "Features kokum, a souring agent used in Konkan coastal cuisine that aids digestion and adds flavor without calories.",
      "This meal includes traditional Maharashtrian protein preparations like usal (sprouted legumes) that enhance bioavailability of nutrients.",
      "Incorporates moderate use of peanuts and sesame seeds central to Maharashtrian cuisine, providing healthy fats in traditional proportions.",
      "Features traditional Kolhapuri spice combinations prepared with authentic grinding methods that release maximum flavor with minimal quantities.",
      "The meal adapts traditional Vidarbha region grain preparations that support sustained energy release throughout the day."
    ],
    'gujarat': [
      "Gujarati cuisine balances sweet, salty and spicy flavors in each meal. This plan adapts traditional Kathiyawadi and Surti cooking for balanced nutrition.",
      "Features steamed dhokla and khandvi preparations authentic to Gujarat that provide protein with minimal oil compared to fried snacks.",
      "This meal includes traditional Gujarati kadhi made with yogurt and chickpea flour, providing protein while supporting gut health.",
      "Incorporates undhiyu-inspired seasonal vegetable combinations prepared with authentic Gujarati spices but controlled oil.",
      "Features traditional Gujarati fasting foods that naturally emphasize nutrient-dense ingredients like nuts, fruits and specific grains.",
      "The meal introduces traditional Kutchi region millet preparations that provide sustained energy while supporting digestive health."
    ],
    'west bengal': [
      "Bengali cuisine traditionally follows a specific meal structure starting with bitter and ending with sweet. This meal adapts this wisdom for modern nutrition.",
      "Features Bengali-style fish preparation using mustard that provides healthy fats while maintaining authentic regional flavor.",
      "This meal includes traditional Bengali vegetable preparations like chorchori that maximize the use of seasonal produce including stems and peels.",
      "Incorporates rice in portion-controlled serving as per traditional Bengali custom, accompanied by protein and vegetables for balance.",
      "Features traditional Bengali five-spice (panch phoron) used in precise quantities to enhance flavor while supporting digestive processes.",
      "The meal includes traditional North Bengal preparations adapted to maximize nutritional benefits while maintaining cultural authenticity."
    ],
    'tamil nadu': [
      "Tamil cuisine emphasizes balance through six tastes in each meal. This plan incorporates this ancient wisdom while controlling portions.",
      "Features traditional Tamil Nadu-style rasam preparation known for its digestive properties and medicinal value from pepper and cumin.",
      "This meal includes traditional South Indian vegetable preparations like poriyal and kootu that preserve nutrients while adding variety.",
      "Incorporates traditional millets like ragi, which were staples in ancient Tamil diets long before rice became predominant.",
      "Features Chettinad-style preparation methods that extract maximum flavor from spices while using minimal oil in cooking.",
      "The meal balances the principles of Siddha medicine traditional to Tamil Nadu, emphasizing seasonal ingredients with medicinal properties."
    ],
    'north east': [
      "Northeastern tribal cuisines emphasize foraged greens and herbs. This meal incorporates traditional knowledge of these micronutrient-rich ingredients.",
      "Features traditional Northeastern fermentation techniques for bamboo shoots and soybeans that enhance nutritional value while adding umami flavor.",
      "This meal includes minimal-oil preparation methods traditional to Naga, Manipuri and Assamese cooking that naturally keep calories controlled.",
      "Incorporates indigenous herbs like Sichuan pepper (thoiding) and wild perilla seeds used for centuries in Northeastern tribal nutrition.",
      "Features traditional Assamese riverine fish preparations rich in essential fatty acids important for brain and heart health.",
      "The meal introduces traditional fermented bamboo shoot preparations that provide unique prebiotics important for gut health."
    ],
    'andhra': [
      "Andhra cuisine balances flavors with an emphasis on spices, tamarind, and local greens. This meal incorporates traditional ingredients while controlling spice levels for better digestion.",
      "Features millet-based preparations central to traditional Andhra home cooking that provide sustained energy release while supporting blood sugar regulation.",
      "This meal includes traditional Andhra-style preparation of leafy greens like gongura (sorrel) that maximize nutrition while providing authentic flavor.",
      "Incorporates traditional protein sources like pesarattu (moong dal pancakes) and pappu (lentil preparations) that are staples in Andhra households.",
      "Features tamarind-based preparations authentic to Andhra that provide vitamin C and support digestive health when consumed in appropriate portions.",
      "The meal includes traditional millet varieties indigenous to Rayalaseema region that support sustained energy and provide essential micronutrients."
    ],
    'telangana': [
      "Telangana cuisine features unique preparations distinct from neighboring regions. This meal incorporates traditional jowar and bajra preparations.",
      "Features moderate use of red chilies and tamarind, signature flavors in Telangana cooking, balanced for both taste and nutrition.",
      "This meal includes traditional Telangana-style pachadis and chutneys that enhance nutritional value with minimal processing.",
      "Incorporates sarva pindi and other unique Telangana preparations adapted for balanced nutrition.",
      "Features traditional Telangana rural cooking methods that maximize flavor while preserving nutrients and using minimal oil.",
      "The meal introduces traditional millet preparations from ancient Telangana culinary traditions that support sustained energy."
    ],
    'karnataka': [
      "Karnataka cuisine features diverse regional variations. This meal incorporates elements of both North Karnataka's hearty dishes and South Karnataka's lighter fare.",
      "Features traditional ragi-based preparations that were staples in Karnataka long before refined grains became common.",
      "This meal includes traditional Karnataka-style sambar and huli preparations with authentic spice combinations.",
      "Incorporates kosambari (moong dal salad) and other nutritious Karnataka specialties that provide balanced nutrition.",
      "Features traditional Udupi-style preparations that emphasize quality ingredients and traditional cooking methods for optimal nutrition.",
      "The meal introduces Kodava-style preparations using indigenous spices that enhance flavor while providing medicinal benefits."
    ],
    'arunachal': [
      "Arunachal Pradesh cuisine emphasizes minimally processed ingredients with traditional preservation techniques. This meal features fermentation methods that enhance nutritional benefits.",
      "This meal incorporates indigenous herbs and vegetables from Arunachal, many of which have medicinal properties recognized in traditional healing practices.",
      "Arunachal's diverse tribal cuisines favor steaming and boiling over frying. This meal uses these traditional cooking methods that naturally preserve nutrients while minimizing added fats.",
      "Incorporates bamboo shoot preparations common in Arunachal tribal cuisine, providing unique prebiotics that support gut health.",
      "Features traditional Arunachal cooking with millet varieties indigenous to the region that support sustained energy and provide essential micronutrients.",
      "This meal balances traditional fermented foods with fresh seasonal produce, maintaining the authentic flavors of Arunachal tribal cuisine while optimizing nutrition."
    ]
  };
  
  // Convert region to lowercase for case-insensitive matching
  const regionLower = region.toLowerCase();
  
  // Handle states/regions with spaces in their names
  const normalizedRegion = regionLower.replace(' ', '');
  if (normalizedRegion === 'northeast' || normalizedRegion === 'northeastindian') {
    return notes['north east'] ? notes['north east'][Math.floor(Math.random() * notes['north east'].length)] : undefined;
  }
  if (normalizedRegion === 'westbengal') {
    return notes['west bengal'] ? notes['west bengal'][Math.floor(Math.random() * notes['west bengal'].length)] : undefined;
  }
  if (normalizedRegion === 'tamilnadu') {
    return notes['tamil nadu'] ? notes['tamil nadu'][Math.floor(Math.random() * notes['tamil nadu'].length)] : undefined;
  }
  if (normalizedRegion === 'karnataka') {
    return notes['karnataka'] ? notes['karnataka'][Math.floor(Math.random() * notes['karnataka'].length)] : undefined;
  }
  
  // Check for the exact region match first
  if (notes[regionLower]) {
    return notes[regionLower][Math.floor(Math.random() * notes[regionLower].length)];
  }
  
  // If specific state not found, fall back to the broader regional category
  // Map states to regions
  const stateToRegionMap: Record<string, string> = {
    // North
    'punjab': 'north',
    'haryana': 'north',
    'uttarpradesh': 'north',
    'uttarakhand': 'north',
    'himachalpradesh': 'north',
    'delhi': 'north',
    'jammuandkashmir': 'north',
    'ladakh': 'north',
    'chandigarh': 'north',
    
    // South
    'kerala': 'south',
    'tamilnadu': 'south',
    'karnataka': 'south',
    'andhra': 'south',
    'andhrapradesh': 'south',
    'telangana': 'south',
    'puducherry': 'south',
    'lakshadweep': 'south',
    
    // East
    'westbengal': 'east',
    'odisha': 'east',
    'bihar': 'east',
    'jharkhand': 'east',
    'andamanandnicobar': 'east',
    
    // West
    'maharashtra': 'west',
    'gujarat': 'west',
    'goa': 'west',
    'rajasthan': 'west',
    'dadraandnagarhaveli': 'west',
    
    // Central
    'madhyapradesh': 'central',
    'chhattisgarh': 'central',
    
    // Northeast
    'arunachal': 'north east',
    'arunachalpradesh': 'north east',
    'assam': 'north east',
    'manipur': 'north east',
    'meghalaya': 'north east',
    'tripura': 'north east',
    'mizoram': 'north east',
    'nagaland': 'north east',
    'arunachalpradesh': 'north east',
    'sikkim': 'north east'
  };
  
  const mappedRegion = stateToRegionMap[normalizedRegion];
  if (mappedRegion && notes[mappedRegion]) {
    return notes[mappedRegion][Math.floor(Math.random() * notes[mappedRegion].length)];
  }
  
  // If no specific match and no mapping, return undefined
  return undefined;
};
