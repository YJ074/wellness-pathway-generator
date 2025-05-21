// Generate regional cultural notes with enhanced details about traditional foods and cooking methods
export const generateRegionalNote = (region?: string): string | undefined => {
  if (!region) return undefined;
  
  const notes: Record<string, string[]> = {
    'north': [
      "North Indian cuisine is characterized by rich gravies and the use of dairy products. This meal balances traditional flavors with lighter cooking methods.",
      "Features dishes like rajma chawal and chole bhature, prepared with controlled oil and spices to maintain their authentic taste while optimizing nutrition.",
      "Incorporates tandoori cooking techniques that enhance flavors through roasting rather than frying, reducing overall fat content.",
      "Uses whole wheat and millets to provide sustained energy and excellent micronutrient profiles.",
      "Includes seasonal vegetables and fruits that are locally sourced to maximize freshness and nutritional value.",
      "Emphasizes the use of homemade spices and masalas to control sodium levels and avoid artificial additives."
    ],
    'south': [
      "South Indian cuisine is known for its use of rice, lentils, and spices. This meal balances traditional flavors with lighter cooking methods.",
      "Features dishes like idli, dosa, and sambar, prepared with controlled oil and spices to maintain their authentic taste while optimizing nutrition.",
      "Incorporates steaming and boiling techniques that enhance flavors while minimizing the use of oil.",
      "Uses a variety of lentils and legumes to provide a complete protein source.",
      "Includes coconut and curry leaves, which are rich in antioxidants and essential nutrients.",
      "Emphasizes the use of fresh, locally sourced ingredients to maximize flavor and nutritional value."
    ],
    'east': [
      "East Indian cuisine is characterized by its use of fish, rice, and lentils. This meal balances traditional flavors with lighter cooking methods.",
      "Features dishes like macher jhol and dalma, prepared with controlled oil and spices to maintain their authentic taste while optimizing nutrition.",
      "Incorporates steaming and boiling techniques that enhance flavors while minimizing the use of oil.",
      "Uses a variety of locally sourced vegetables and fruits to provide essential nutrients.",
      "Includes mustard oil and panch phoron (five-spice mix), which are rich in antioxidants and essential nutrients.",
      "Emphasizes the use of fresh, locally sourced ingredients to maximize flavor and nutritional value."
    ],
    'west': [
      "West Indian cuisine is known for its use of spices, vegetables, and lentils. This meal balances traditional flavors with lighter cooking methods.",
      "Features dishes like dhokla, thepla, and undhiyu, prepared with controlled oil and spices to maintain their authentic taste while optimizing nutrition.",
      "Incorporates steaming and roasting techniques that enhance flavors while minimizing the use of oil.",
      "Uses a variety of locally sourced vegetables and fruits to provide essential nutrients.",
      "Includes jaggery and peanuts, which are rich in iron and protein.",
      "Emphasizes the use of fresh, locally sourced ingredients to maximize flavor and nutritional value."
    ],
    'central': [
      "Central Indian cuisine is characterized by its use of wheat, lentils, and vegetables. This meal balances traditional flavors with lighter cooking methods.",
      "Features dishes like dal bafla and bhutte ka kees, prepared with controlled oil and spices to maintain their authentic taste while optimizing nutrition.",
      "Incorporates baking and roasting techniques that enhance flavors while minimizing the use of oil.",
      "Uses a variety of locally sourced vegetables and fruits to provide essential nutrients.",
      "Includes spices like cumin, coriander, and turmeric, which are rich in antioxidants and essential nutrients.",
      "Emphasizes the use of fresh, locally sourced ingredients to maximize flavor and nutritional value."
    ],
    'northeast': [
      "Northeast Indian cuisine is characterized by its use of rice, bamboo shoots, and fermented foods. This meal balances traditional flavors with lighter cooking methods.",
      "Features dishes like momos, thukpa, and dalma, prepared with controlled oil and spices to maintain their authentic taste while optimizing nutrition.",
      "Incorporates steaming and boiling techniques that enhance flavors while minimizing the use of oil.",
      "Uses a variety of locally sourced vegetables and fruits to provide essential nutrients.",
      "Includes ginger, garlic, and chilies, which are rich in antioxidants and essential nutrients.",
      "Emphasizes the use of fresh, locally sourced ingredients to maximize flavor and nutritional value."
    ],
    'andhra': [
      "Andhra cuisine is known for its spicy flavors and use of tamarind. This meal balances traditional tastes with health-conscious cooking methods.",
      "Features dishes like pesarattu and gongura pachadi, prepared with controlled oil and spices to maintain their authentic taste while optimizing nutrition.",
      "Incorporates steaming and stir-frying techniques that enhance flavors while minimizing the use of oil.",
      "Uses a variety of lentils and locally sourced vegetables to provide essential nutrients.",
      "Includes spices like mustard seeds, fenugreek, and red chilies, which are rich in antioxidants.",
      "Emphasizes the use of fresh ingredients to maximize flavor and nutritional value."
    ],
    'telangana': [
      "Telangana cuisine blends flavors from Andhra and Maharashtra. This meal balances traditional tastes with health-conscious cooking methods.",
      "Features dishes like biryani and bagara baingan, prepared with controlled oil and spices to maintain their authentic taste while optimizing nutrition.",
      "Incorporates baking and stir-frying techniques that enhance flavors while minimizing the use of oil.",
      "Uses a variety of lentils and locally sourced vegetables to provide essential nutrients.",
      "Includes spices like cumin, coriander, and turmeric, which are rich in antioxidants.",
      "Emphasizes the use of fresh ingredients to maximize flavor and nutritional value."
    ],
    'karnataka': [
      "Karnataka cuisine is known for its diverse flavors and use of lentils. This meal balances traditional tastes with health-conscious cooking methods.",
      "Features dishes like bisi bele bath and akki roti, prepared with controlled oil and spices to maintain their authentic taste while optimizing nutrition.",
      "Incorporates steaming and stir-frying techniques that enhance flavors while minimizing the use of oil.",
      "Uses a variety of lentils and locally sourced vegetables to provide essential nutrients.",
      "Includes spices like mustard seeds, fenugreek, and curry leaves, which are rich in antioxidants.",
      "Emphasizes the use of fresh ingredients to maximize flavor and nutritional value."
    ],
    'arunachal': [
      "Arunachal cuisine utilizes indigenous herbs and bamboo shoots. This meal adapts traditional recipes to create a nutritionally balanced option.",
      "Features dishes prepared with minimal oil and emphasizes the natural flavors of local ingredients.",
      "Incorporates steaming and boiling techniques to retain nutrients and reduce fat content.",
      "Uses locally sourced vegetables and herbs known for their medicinal properties.",
      "Emphasizes the use of traditional cooking methods that enhance flavor without compromising health.",
      "Showcases unique ingredients like fermented soybean and bamboo shoots, rich in micronutrients and fiber."
    ],
    'chhattisgarh': [
      "Chhattisgarh cuisine relies on rice and lesser-known grains. This meal adapts traditional recipes to create a nutritionally balanced option.",
      "Features dishes prepared with minimal oil and emphasizes the natural flavors of local ingredients.",
      "Incorporates steaming and boiling techniques to retain nutrients and reduce fat content.",
      "Uses locally sourced vegetables and herbs known for their medicinal properties.",
      "Emphasizes the use of traditional cooking methods that enhance flavor without compromising health.",
      "Showcases unique ingredients like kodo millet and chaulai saag, rich in micronutrients and fiber."
    ],
    'assam': [
      "Assamese cuisine features unique souring agents like elephant apple. This meal adapts traditional recipes to create a nutritionally balanced option.",
      "Features dishes prepared with minimal oil and emphasizes the natural flavors of local ingredients.",
      "Incorporates steaming and boiling techniques to retain nutrients and reduce fat content.",
      "Uses locally sourced vegetables and herbs known for their medicinal properties.",
      "Emphasizes the use of traditional cooking methods that enhance flavor without compromising health.",
      "Showcases unique ingredients like tenga and lai xaak, rich in micronutrients and fiber."
    ],
    'bihar': [
      "Bihari cuisine is characterized by sattu and litti. This meal adapts traditional recipes to create a nutritionally balanced option.",
      "Features dishes prepared with minimal oil and emphasizes the natural flavors of local ingredients.",
      "Incorporates baking and roasting techniques to retain nutrients and reduce fat content.",
      "Uses locally sourced vegetables and herbs known for their medicinal properties.",
      "Emphasizes the use of traditional cooking methods that enhance flavor without compromising health.",
      "Showcases unique ingredients like sattu and makhana, rich in micronutrients and fiber."
    ],
    'goa': [
      "Goan cuisine blends Portuguese and Indian flavors. This meal adapts traditional recipes to create a nutritionally balanced option.",
      "Features dishes prepared with minimal oil and emphasizes the natural flavors of local ingredients.",
      "Incorporates steaming and grilling techniques to retain nutrients and reduce fat content.",
      "Uses locally sourced vegetables and herbs known for their medicinal properties.",
      "Emphasizes the use of traditional cooking methods that enhance flavor without compromising health.",
      "Showcases unique ingredients like kokum and toddy vinegar, rich in micronutrients and flavor."
    ],
    'gujarat': [
      "Gujarati cuisine is known for its vegetarian dishes and sweet flavors. This meal adapts traditional recipes to create a nutritionally balanced option.",
      "Features dishes prepared with minimal oil and emphasizes the natural flavors of local ingredients.",
      "Incorporates steaming and baking techniques to retain nutrients and reduce fat content.",
      "Uses locally sourced vegetables and herbs known for their medicinal properties.",
      "Emphasizes the use of traditional cooking methods that enhance flavor without compromising health.",
      "Showcases unique ingredients like dhokla and thepla, rich in micronutrients and fiber."
    ],
    'haryana': [
      "Haryanvi cuisine is characterized by dairy products and simple flavors. This meal adapts traditional recipes to create a nutritionally balanced option.",
      "Features dishes prepared with minimal oil and emphasizes the natural flavors of local ingredients.",
      "Incorporates boiling and roasting techniques to retain nutrients and reduce fat content.",
      "Uses locally sourced vegetables and herbs known for their medicinal properties.",
      "Emphasizes the use of traditional cooking methods that enhance flavor without compromising health.",
      "Showcases unique ingredients like bajra and singhare, rich in micronutrients and fiber."
    ],
    'himachal': [
      "Himachali cuisine utilizes mountain herbs and lentils. This meal adapts traditional recipes to create a nutritionally balanced option.",
      "Features dishes prepared with minimal oil and emphasizes the natural flavors of local ingredients.",
      "Incorporates steaming and boiling techniques to retain nutrients and reduce fat content.",
      "Uses locally sourced vegetables and herbs known for their medicinal properties.",
      "Emphasizes the use of traditional cooking methods that enhance flavor without compromising health.",
      "Showcases unique ingredients like siddu and chana madra, rich in micronutrients and fiber."
    ],
    'jharkhand': [
      "Jharkhandi cuisine relies on forest produce and rice. This meal adapts traditional recipes to create a nutritionally balanced option.",
      "Features dishes prepared with minimal oil and emphasizes the natural flavors of local ingredients.",
      "Incorporates steaming and boiling techniques to retain nutrients and reduce fat content.",
      "Uses locally sourced vegetables and herbs known for their medicinal properties.",
      "Emphasizes the use of traditional cooking methods that enhance flavor without compromising health.",
      "Showcases unique ingredients like dhuska and bari, rich in micronutrients and fiber."
    ],
    'madhyapradesh': [
      "Madhya Pradesh cuisine balances Central Indian heartiness with complex flavors. This meal adapts traditional recipes to create a nutritionally balanced option.",
      "Features traditional Malwa region staples like poha and dal bafla, prepared with controlled oil to maintain their authentic taste while optimizing nutrition.",
      "This meal incorporates Bundelkhandi cooking techniques that enhance flavors through slow cooking and careful spice selection rather than excessive fat.",
      "Includes herbs and spices traditionally used in MP's tribal cuisines, known for their medicinal properties and flavor enhancement.",
      "Uses classic MP preparation styles adapted to create healthier versions without compromising the dishes' rustic character.",
      "Showcases indigenous Malwa and Nimar region grains like jowar and ragi that are naturally rich in micronutrients and fiber."
    ],
    'maharashtra': [
      "Maharashtra cuisine offers remarkable regional diversity from coastal to inland preparations. This meal balances flavors from various Maharashtra regions.",
      "Features traditional Vidarbha and Khandesh dishes adapted for balanced nutrition while preserving their distinctive spice profiles.",
      "Incorporates Puneri thecha (spice mix) in limited quantities to maintain authentic flavor while controlling sodium and oil content.",
      "Showcases traditional Maharashtrian grains like jowar, bajra and nachni (ragi) that provide sustained energy and excellent micronutrient profiles.",
      "Uses classic Konkan and Marathwada cooking techniques that maximize flavor through careful tempering with minimal oil.",
      "Includes Kolhapuri mathha (buttermilk) preparation that provides gut-friendly probiotics while enhancing the meal's digestibility."
    ],
    'jammu': [
      "Jammu cuisine is known for its use of dairy products and spices. This meal balances traditional flavors with lighter cooking methods.",
      "Features dishes like rajma chawal and dum aloo, prepared with controlled oil and spices to maintain their authentic taste while optimizing nutrition.",
      "Incorporates tandoori cooking techniques that enhance flavors through roasting rather than frying, reducing overall fat content.",
      "Uses whole wheat and millets to provide sustained energy and excellent micronutrient profiles.",
      "Includes seasonal vegetables and fruits that are locally sourced to maximize freshness and nutritional value.",
      "Emphasizes the use of homemade spices and masalas to control sodium levels and avoid artificial additives."
    ],
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
  if (normalizedRegion === 'himachalpradesh') {
    return notes['himachal'] ? notes['himachal'][Math.floor(Math.random() * notes['himachal'].length)] : undefined;
  }
  if (normalizedRegion === 'madhyapradesh') {
    return notes['madhyapradesh'][Math.floor(Math.random() * notes['madhyapradesh'].length)];
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
    'himachal': 'north',
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
    'sikkim': 'north east'
  };
  
  const mappedRegion = stateToRegionMap[normalizedRegion];
  if (mappedRegion && notes[mappedRegion]) {
    return notes[mappedRegion][Math.floor(Math.random() * notes[mappedRegion].length)];
  }
  
  // If no specific match and no mapping, return undefined
  return undefined;
};
