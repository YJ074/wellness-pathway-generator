
import React from "react";

interface WellnessMetricsDisplayProps {
  bmi: number | undefined;
  bmiCategory: string | undefined;
  bmr: number | undefined;
  dailyCalories: number | undefined;
}

const getBmiCategoryColor = (category: string): string => {
  switch (category) {
    case "underweight":
      return "text-amber-600";
    case "normal":
      return "text-green-600";
    case "athletic build":
      return "text-blue-600";
    case "overweight":
      return "text-orange-600";
    case "high BMI":
    case "obese":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const WellnessMetricsDisplay = ({
  bmi,
  bmiCategory,
  bmr,
  dailyCalories,
}: WellnessMetricsDisplayProps) => {
  if (bmi === undefined || bmr === undefined) return null;

  return (
    <div className="bg-slate-50 p-4 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Your Health Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-white rounded-md border">
          <div className="text-sm text-gray-500">Body Mass Index (BMI)</div>
          <div className="text-2xl font-bold">{bmi.toFixed(1)}</div>
          <div className="text-sm">
            Category:{" "}
            <span className={`font-medium ${getBmiCategoryColor(bmiCategory ?? "")}`}>
              {bmiCategory
                ? bmiCategory.charAt(0).toUpperCase() + bmiCategory.slice(1)
                : ""}
            </span>
            {bmiCategory === "athletic build" && (
              <p className="text-xs italic mt-1">
                Based on your exercise frequency, your higher BMI likely reflects muscle mass rather than excess fat.
              </p>
            )}
          </div>
        </div>
        <div className="p-3 bg-white rounded-md border">
          <div className="text-sm text-gray-500">Basal Metabolic Rate (BMR)</div>
          <div className="text-2xl font-bold">{bmr} kcal</div>
          <div className="text-sm">Base calories needed at rest</div>
        </div>
        <div className="p-3 bg-white rounded-md border">
          <div className="text-sm text-gray-500">Daily Calorie Target</div>
          <div className="text-2xl font-bold">{dailyCalories} kcal</div>
          <div className="text-sm">Adjusted for your fitness goal</div>
        </div>
      </div>
    </div>
  );
};

export default WellnessMetricsDisplay;
