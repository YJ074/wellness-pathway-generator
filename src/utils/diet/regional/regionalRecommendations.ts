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
    'kerala': [
      "Kerala cuisine skillfully balances coconut, spices, and fresh ingredients. This meal adapts traditional recipes for enhanced nutrition.",
      "Features dishes that highlight the natural flavors of ingredients with minimal oil and balanced spice profiles.",
      "Incorporates steaming and stir-frying techniques that enhance nutritional value while reducing fat content.",
      "Uses locally sourced vegetables and fruits rich in vitamins and minerals essential for overall wellness.",
      "Includes traditional Kerala spices like curry leaves, black pepper, and turmeric known for their medicinal properties.",
      "Balances complex carbohydrates from red rice and root vegetables with protein from lentils and beans."
    ],
    'manipur': [
      "Manipuri cuisine showcases fermented ingredients and local herbs. This meal adapts traditional recipes for optimal nutrition.",
      "Features dishes that emphasize local produce and minimal oil usage combined with fermentation techniques for gut health.",
      "Incorporates steaming and boiling methods that preserve nutrients while creating natural flavor profiles.",
      "Uses indigenous herbs and vegetables known for their high nutritional value and adaptogenic properties.",
      "Includes balanced combinations of rice varieties with protein sources tailored to maximize nutrient absorption.",
      "Maintains the authentic Manipuri emphasis on whole foods while reducing salt and oil content."
    ],
    'meghalaya': [
      "Meghalaya cuisine features distinct tribal cooking traditions with unique ingredients. This meal adapts these traditions for balanced nutrition.",
      "Features dishes that showcase fermentation and smoking techniques recalibrated for healthier outcomes.",
      "Incorporates steaming and slow cooking methods that enhance flavor while preserving nutritional integrity.",
      "Uses diverse indigenous vegetables and fruits that provide rare micronutrients and antioxidants.",
      "Includes traditional Khasi, Garo, and Jaintia preparation methods adapted for optimal digestive health.",
      "Balances the region's protein-rich dishes with fiber-rich accompaniments for a complete nutritional profile."
    ],
    'mizoram': [
      "Mizo cuisine emphasizes simplicity and natural flavors. This meal adapts traditional recipes for enhanced nutritional balance.",
      "Features dishes with minimal processing that highlight the natural qualities of local vegetables and herbs.",
      "Incorporates steaming and boiling techniques that retain maximum nutrients with minimal added fats.",
      "Uses bamboo shoots, local greens, and foraged ingredients known for their medicinal properties.",
      "Includes traditional fermented components that support gut health while enhancing flavor complexity.",
      "Balances the region's starchy staples with protein-rich plant foods for sustained energy release."
    ],
    'nagaland': [
      "Naga cuisine features fermentation techniques and smoked ingredients. This meal adapts traditional recipes while preserving their essence.",
      "This meal reimagines classic Naga preparations traditionally centered on meat with nutrient-dense plant alternatives.",
      "Features unique local ingredients like bamboo shoots and forest herbs naturally rich in antioxidants and dietary fiber.",
      "Incorporates fermented foods that promote gut health but with controlled sodium content for balanced nutrition.",
      "Uses traditional cooking methods like steaming and open-fire roasting that minimize oil while maximizing flavor intensity.",
      "Balances indigenous Naga ingredients with readily available alternatives while respecting traditional flavor combinations."
    ],
    'odisha': [
      "Odisha cuisine balances rice, legumes, and seasonal vegetables. This meal adapts traditional recipes for enhanced nutrition.",
      "Features traditional dishes like dalma and santula prepared with minimal oil while preserving authentic flavors.",
      "Incorporates steaming and boiling techniques that enhance nutritional value while reducing fat content.",
      "Uses locally inspired preparations of lentils and rice, providing complete proteins and sustained energy.",
      "Includes traditional Odia spices like pancha phutana (five spices) known for their digestive benefits.",
      "Balances the region's fondness for rice with protein-rich legumes for a complete nutritional profile."
    ],
    'punjab': [
      "Punjabi cuisine is known for its richness and bold flavors. This meal adapts traditional recipes for balanced nutrition.",
      "Features signature dishes like dal makhani and sarson da saag made with minimal oil and dairy while preserving taste.",
      "Uses tandoor-inspired cooking methods that enhance flavor through dry heat rather than excessive fat.",
      "Incorporates whole wheat and millets in traditional breads to increase fiber and micronutrient content.",
      "Balances the region's love for dairy with plant-based alternatives that maintain creamy textures.",
      "Emphasizes fresh seasonal vegetables in sabzis prepared with carefully controlled spices and minimal oil."
    ],
    'rajasthan': [
      "Rajasthani cuisine maximizes nutrition from minimal ingredients in an arid climate. This meal honors that tradition.",
      "Features water-conservative cooking methods traditionally developed to adapt to desert conditions.",
      "Uses millet varieties like bajra that are naturally suited to arid environments while providing excellent nutrition.",
      "Incorporates beans and pulses in traditional preparations to provide sustained protein and energy.",
      "Adapts Rajasthani preservation techniques like sun-drying and pickling for enhanced nutritional profiles.",
      "Balances the traditionally high oil content of Rajasthani cuisine while maintaining authentic flavors."
    ],
    'sikkim': [
      "Sikkimese cuisine reflects its mountainous terrain with unique fermented foods. This meal adapts these techniques for health benefits.",
      "Features traditional fermentation methods that enhance nutritional bioavailability while controlled for salt content.",
      "Uses indigenous herbs and vegetables naturally rich in micronutrients adapted to high-altitude environments.",
      "Incorporates buckwheat and millet varieties traditionally grown in Sikkim's mountains for sustained energy.",
      "Adapts traditional momos and thukpas with steaming methods and reduced-fat fillings without compromising flavor.",
      "Balances the warming spices of mountain cuisines with portion control for optimal metabolism support."
    ],
    'tamilnadu': [
      "Tamil cuisine masterfully combines rice, lentils, and vegetables with medicinal spices. This meal honors that tradition.",
      "Features traditional fermented rice preparations like idli and dosa made with controlled proportions for balanced nutrition.",
      "Uses millets like ragi, kambu, and thinai that were staples in ancient Tamil cooking before rice predominance.",
      "Incorporates traditional cooling ingredients like buttermilk and coconut in controlled quantities for balanced intake.",
      "Adapts classical Tamil Nadu spice blends like sambar powder and milagai podi with careful portion control.",
      "Balances traditional rasams and kuzhambus with enhanced vegetable content for increased nutritional density."
    ],
    'telangana': [
      "Telangana cuisine balances fiery spices with cooling ingredients. This meal adapts traditional recipes for balanced nutrition.",
      "Features signature dishes like pesarattu and gongura preparations with controlled oil and enhanced protein content.",
      "Uses millets like jowar that were traditional to the region before rice became predominant.",
      "Incorporates leafy vegetables like gongura (sorrel) and bachalakura (malabar spinach) rich in vitamins and minerals.",
      "Adapts traditional tempering techniques to enhance flavor while minimizing oil content.",
      "Balances the region's penchant for spicy flavors with cooling elements like yogurt and herbs."
    ],
    'tripura': [
      "Tripuri cuisine highlights bamboo and indigenous herbs. This meal adapts traditional recipes for enhanced nutrition.",
      "Features bamboo shoot preparations naturally rich in fiber and prepared with minimal oil.",
      "Uses traditional Tripuri berma (dried fish) flavoring techniques applied to plant proteins for balanced meals.",
      "Incorporates indigenous herbs used in Tripuri cooking that naturally enhance flavor without excess salt.",
      "Adapts traditional fermentation methods for improved gut health while controlling sodium levels.",
      "Balances the traditional preference for rice with protein-rich accompaniments for complete nutrition."
    ],
    'uttarpradesh': [
      "UP cuisine blends Awadhi, Bhojpuri, and Mughlai influences. This meal adapts these traditions with balanced nutrition.",
      "Features traditional dishes like kadhi and bhartas prepared with minimal oil without compromising flavor.",
      "Uses whole grains in traditional breads like paratha and roti made with mixed flours for better nutrition.",
      "Incorporates protein-rich lentil preparations that balance the region's carbohydrate-rich staples.",
      "Adapts traditional Awadhi cooking techniques that enhance flavor through slow cooking rather than excess fat.",
      "Balances the rich flavors of UP cuisine with portion control and enhanced vegetable content."
    ],
    'uttarakhand': [
      "Uttarakhand cuisine showcases mountain grains and rustic preparation styles. This meal adapts these regional specialties.",
      "Features traditional Garhwali and Kumaoni preparations made with minimal oil while preserving authentic flavors.",
      "Uses indigenous grains like jhangora (barnyard millet) and mandua (finger millet) that provide excellent nutrition.",
      "Incorporates traditional legumes like gahat (horse gram) and bhatt (black soybean) known for their protein content.",
      "Adapts traditional rustic cooking techniques that enhance flavor through slow cooking and careful spice selection.",
      "Balances the hearty mountain flavors with portion control for optimal nutritional balance."
    ],
    'westbengal': [
      "Bengali cuisine masterfully balances sweet, bitter, and savory flavors. This meal honors that balanced approach.",
      "Features traditional preparations like shukto and ghonto made with minimal oil while maintaining authentic taste.",
      "Uses traditional fish preparations with enhanced vegetable content and controlled oil for balanced meals.",
      "Incorporates bitter greens like shorshe shaak (mustard greens) prepared in the Bengali style for their health benefits.",
      "Adapts traditional phoron (tempering) techniques that maximize flavor with minimal fat content.",
      "Balances the Bengali love for sweets with naturally sweet vegetables and fruits to satisfy the palate."
    ]
  };
  
  // Convert region to lowercase for case-insensitive matching
  const regionLower = region.toLowerCase();
  
  // Handle states/regions with spaces in their names
  const normalizedRegion = regionLower.replace(' ', '');
  if (normalizedRegion === 'northeast' || normalizedRegion === 'northeastindian') {
    return notes['northeast'] ? notes['northeast'][Math.floor(Math.random() * notes['northeast'].length)] : undefined;
  }
  if (normalizedRegion === 'westbengal') {
    return notes['westbengal'] ? notes['westbengal'][Math.floor(Math.random() * notes['westbengal'].length)] : undefined;
  }
  if (normalizedRegion === 'tamilnadu') {
    return notes['tamilnadu'] ? notes['tamilnadu'][Math.floor(Math.random() * notes['tamilnadu'].length)] : undefined;
  }
  if (normalizedRegion === 'himachalpradesh') {
    return notes['himachal'] ? notes['himachal'][Math.floor(Math.random() * notes['himachal'].length)] : undefined;
  }
  if (normalizedRegion === 'madhyapradesh') {
    return notes['madhyapradesh'][Math.floor(Math.random() * notes['madhyapradesh'].length)];
  }
  if (normalizedRegion === 'uttarpradesh') {
    return notes['uttarpradesh'][Math.floor(Math.random() * notes['uttarpradesh'].length)];
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
    'arunachal': 'northeast',
    'arunachalpradesh': 'northeast',
    'assam': 'northeast',
    'manipur': 'northeast',
    'meghalaya': 'northeast',
    'tripura': 'northeast',
    'mizoram': 'northeast',
    'nagaland': 'northeast',
    'sikkim': 'northeast'
  };
  
  const mappedRegion = stateToRegionMap[normalizedRegion];
  if (mappedRegion && notes[mappedRegion]) {
    return notes[mappedRegion][Math.floor(Math.random() * notes[mappedRegion].length)];
  }
  
  // If no specific match and no mapping, return undefined
  return undefined;
};
