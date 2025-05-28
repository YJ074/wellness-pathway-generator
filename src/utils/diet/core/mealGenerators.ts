
// Re-export meal generator functions with allergy-aware wrappers

import {
  generateBreakfast as genBreakfast,
  generateLunch as genLunch,
  generateDinner as genDinner,
  generateSnacks as genSnacks,
  generateMidMorningSnack as genMidMorningSnack,
  generateEveningSnack as genEveningSnack
} from '../generators';

export function generateBreakfast(dayIndex: number, dietaryPreference: string, isWeightLoss: boolean, allergies?: string, region?: string, gender?: string) {
  return genBreakfast(dayIndex, dietaryPreference, isWeightLoss, allergies, region, gender);
}

export function generateMidMorningSnack(dayIndex: number, snacks: string[], fruits: string[], isWeightLoss: boolean, allergies?: string, gender?: string) {
  return genMidMorningSnack(dayIndex, snacks, fruits, isWeightLoss, allergies, gender);
}

export function generateLunch(dayIndex: number, proteins: string[], grains: string[], vegetables: string[], isWeightLoss: boolean, isProteinFocus: boolean, allergies?: string, region?: string, dietaryPreference?: string, gender?: string) {
  return genLunch(dayIndex, proteins, grains, vegetables, isWeightLoss, isProteinFocus, allergies, region, dietaryPreference, gender);
}

export function generateEveningSnack(dayIndex: number, snacks: string[], fruits: string[], isWeightLoss: boolean, allergies?: string, region?: string, gender?: string) {
  return genEveningSnack(dayIndex, snacks, fruits, isWeightLoss, allergies, region, gender);
}

export function generateDinner(dayIndex: number, proteins: string[], vegetables: string[], isWeightLoss: boolean, isProteinFocus: boolean, allergies?: string, region?: string, dietaryPreference?: string, gender?: string) {
  return genDinner(dayIndex, proteins, vegetables, isWeightLoss, isProteinFocus, allergies, region, dietaryPreference, gender);
}
