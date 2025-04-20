
import React from 'react';
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PlanDetailsCard from './PlanDetailsCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WellnessPDF from './WellnessPDF';
import { FormData, DietPlan, WorkoutPlan } from './types';
import { Download } from 'lucide-react';

interface WellnessResultsProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan: WorkoutPlan;
  onReset: () => void;
}

const WellnessResults = ({ formData, dietPlan, workoutPlan, onReset }: WellnessResultsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your 75-Day Wellness Plan</h2>
        <div className="space-x-2">
          <PDFDownloadLink
            document={
              <WellnessPDF
                formData={formData}
                dietPlan={dietPlan}
                workoutPlan={workoutPlan}
              />
            }
            fileName={`${formData.name}-75-day-wellness-plan.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                {loading ? "Generating PDF..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          <Button onClick={onReset} variant="outline">
            Back to Form
          </Button>
        </div>
      </div>
      
      <PlanDetailsCard formData={formData} />
      
      <div className="grid gap-6">
        {dietPlan.days.map((dietDay, index) => {
          const workoutDay = workoutPlan.days[index];
          return (
            <Card key={dietDay.day} className="w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Day {dietDay.day}</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                {/* Diet Plan Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">Diet Plan</h3>
                  <div className="space-y-2">
                    <p><strong>Breakfast:</strong> {dietDay.breakfast}</p>
                    <p><strong>Lunch:</strong> {dietDay.lunch}</p>
                    <p><strong>Dinner:</strong> {dietDay.dinner}</p>
                    <p><strong>Snacks:</strong> {dietDay.snacks}</p>
                  </div>
                </div>
                
                {/* Workout Plan Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">Workout Plan</h3>
                  {workoutDay.isRestDay ? (
                    <p className="text-green-600 font-medium">
                      Rest Day - Focus on recovery and light stretching
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <strong>Warm-up:</strong>
                        <ul className="list-disc pl-4">
                          {workoutDay.warmup.map((exercise, idx) => (
                            <li key={idx}>{exercise}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong>Exercises:</strong>
                        <ul className="space-y-2">
                          {workoutDay.exercises.map((exercise, idx) => (
                            <li key={idx} className="border-l-2 border-primary pl-4">
                              <p className="font-medium">{exercise.name} - {exercise.reps}</p>
                              <p className="text-sm text-gray-600">{exercise.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong>Cool-down:</strong>
                        <ul className="list-disc pl-4">
                          {workoutDay.cooldown.map((stretch, idx) => (
                            <li key={idx}>{stretch}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WellnessResults;
