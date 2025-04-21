
import React from 'react';
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PlanDetailsCard from './PlanDetailsCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WellnessPDF from './WellnessPDF';
import { FormData, DietPlan, WorkoutPlan } from './types';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface WellnessResultsProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan: WorkoutPlan;
  onReset: () => void;
}

const WellnessResults = ({ formData, dietPlan, workoutPlan, onReset }: WellnessResultsProps) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <PlanDetailsCard formData={formData} />
      </motion.div>
      
      <div className="space-y-6">
        {dietPlan.days.map((dietDay, index) => {
          const workoutDay = workoutPlan.days[index];
          return (
            <motion.div
              key={dietDay.day}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="w-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">Day {dietDay.day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Diet Plan Section */}
                  <div className="space-y-4 border-b pb-6">
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
                                {(exercise.tutorialUrl || exercise.tutorialUrlHindi) && (
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {exercise.tutorialUrl && (
                                      <a
                                        href={exercise.tutorialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline text-sm"
                                      >
                                        Tutorial (English)
                                      </a>
                                    )}
                                    {exercise.tutorialUrlHindi && (
                                      <a
                                        href={exercise.tutorialUrlHindi}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-700 underline text-sm"
                                      >
                                        Tutorial (Hindi)
                                      </a>
                                    )}
                                  </div>
                                )}
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
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WellnessResults;

