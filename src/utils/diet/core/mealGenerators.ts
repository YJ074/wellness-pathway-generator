
// Re-export meal generator functions with allergy-aware wrappers

import {
  generateBreakfast as genBreakfast,
  generateLunch as genLunch,
  generateDinner as genDinner,
  generateSnacks as genSnacks,
  generateMidMorningSnack as genMidMorningSnack,
  generateEveningSnack as genEveningSnack
} from '../generators';

export function generateBreakfast(dayIndex: number, dietaryPreference: string, isWeightLoss: boolean, allergies?: string, region?: string) {
  return genBreakfast(dayIndex, dietaryPreference, isWeightLoss, allergies, region);
}

export function generateMidMorningSnack(dayIndex: number, snacks: string[], fruits: string[], isWeightLoss: boolean, allergies?: string) {
  return genMidMorningSnack(dayIndex, snacks, fruits, isWeightLoss, allergies);
}

export function generateLunch(dayIndex: number, proteins: string[], grains: string[], vegetables: string[], isWeightLoss: boolean, isProteinFocus: boolean, allergies?: string, region?: string) {
  return genLunch(dayIndex, proteins, grains, vegetables, isWeightLoss, isProteinFocus, allergies, region);
}

export function generateEveningSnack(dayIndex: number, snacks: string[], fruits: string[], isWeightLoss: boolean, allergies?: string, region?: string) {
  return genEveningSnack(dayIndex, snacks, fruits, isWeightLoss, allergies, region);
}

export function generateDinner(dayIndex: number, proteins: string[], vegetables: string[], isWeightLoss: boolean, isProteinFocus: boolean, allergies?: string, region?: string) {
  return genDinner(dayIndex, proteins, vegetables, isWeightLoss, isProteinFocus, allergies, region);
}
