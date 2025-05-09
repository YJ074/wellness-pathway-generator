
// Utility to limit soya source appearances
export const limitSoyaInDietDays = (proteinList: string[], totalDays: number, maxPerDays: number = 30): string[] => {
  // Soya related protein names (case insensitive)
  const soyaKeywords = ["soya", "soya chunks", "soya products"];
  // Find the soya item in the list
  const soyaItem = proteinList.find(p =>
    soyaKeywords.some(keyword => p.toLowerCase().includes(keyword))
  );
  if (!soyaItem) {
    // No soya in protein list, return repeated as is
    return Array(totalDays).fill(null).map((_, idx) => proteinList[idx % proteinList.length]);
  }

  // Build the protein plan for totalDays, placing soya only once in any rolling maxPerDays
  const out: string[] = [];
  let lastSoyaDay = -maxPerDays; // Negative so it can be placed at index 0
  let soyaUsed = 0;
  let proteinIdx = 0;

  for (let day = 0; day < totalDays; day++) {
    // If enough days since last soya, and we haven't used soya too recently, try place soya
    if (day - lastSoyaDay >= maxPerDays && soyaUsed < Math.floor(totalDays / maxPerDays) + 1) {
      out.push(soyaItem);
      lastSoyaDay = day;
      soyaUsed++;
    } else {
      // Pick the next non-soya protein
      let nonSoyaProtein = proteinList[proteinIdx % proteinList.length];
      let cycleProteins = 0;
      // Skip over soya
      while (nonSoyaProtein === soyaItem && cycleProteins < proteinList.length) {
        proteinIdx++;
        nonSoyaProtein = proteinList[proteinIdx % proteinList.length];
        cycleProteins++;
      }
      out.push(nonSoyaProtein);
      proteinIdx++;
    }
  }
  return out;
};
