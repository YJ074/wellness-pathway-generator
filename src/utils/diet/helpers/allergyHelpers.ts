
// Helper: remove ingredients based on allergy list (case-insensitive, strippable)
export const stripAndLower = (s: string) => s.trim().toLowerCase();

export const parseAllergies = (allergies?: string) =>
  allergies?.split(',')
    .map(stripAndLower)
    .filter(Boolean)
    || [];

export const isAllergic = (allergiesArr: string[], food: string) =>
  allergiesArr.some(a => food.toLowerCase().includes(a));

// Substitution helpers for common allergy cases
export const suggestSubstitutes = (item: string, allergiesArr: string[]): string => {
  // If dairy
  if (["paneer", "curd", "buttermilk", "milk", "yogurt", "ghee", "cheese"].some(d => item.toLowerCase().includes(d)) && allergiesArr.includes('dairy')) {
    // Culturally relevant: tofu, coconut milk, cashew yogurt, etc.
    if (item.toLowerCase().includes('paneer')) return "Tofu (dairy-free)";
    if (item.toLowerCase().includes('curd') || item.toLowerCase().includes('yogurt')) 
      return "Coconut Yogurt (dairy-free)";
    if (item.toLowerCase().includes('buttermilk')) 
      return "Vegan Buttermilk (dairy-free)";
    if (item.toLowerCase().includes('ghee'))
      return "Coconut Oil (dairy-free)";
    if (item.toLowerCase().includes('cheese'))
      return "Vegan Cheese (dairy-free)";
    if (item.toLowerCase().includes('milk'))
      return "Almond Milk (dairy-free)";
    return "Plant-based substitute";
  }
  if (item.toLowerCase().includes('egg') && allergiesArr.includes('egg')) return "Scrambled Tofu";
  if (item.toLowerCase().includes('chicken') && allergiesArr.includes('chicken')) return "Grilled Mushrooms";
  if (item.toLowerCase().includes('fish') && allergiesArr.includes('fish')) return "Jackfruit Curry";
  if (item.toLowerCase().includes('peanut') && allergiesArr.includes('peanuts')) return "Roasted Chickpeas";
  if (item.toLowerCase().includes('honey') && allergiesArr.includes('honey')) return "Agave Nectar";
  if ((item.toLowerCase().includes('wheat') || item.toLowerCase().includes('roti')) && allergiesArr.includes('gluten')) {
    // Gluten subs
    if (item.toLowerCase().includes('roti')) return "Jowar/Bajra/Millet Roti";
    return "Rice (gluten-free)";
  }
  return item;
};

export const filterAllergies = (list: string[], allergies?: string): string[] => {
  const allergyArr = parseAllergies(allergies);
  return list
    .map(item => isAllergic(allergyArr, item) ? suggestSubstitutes(item, allergyArr) : item)
    .filter(item => {
      // Only keep if after substitute it's not still an allergen
      return !isAllergic(allergyArr, item);
    });
};
