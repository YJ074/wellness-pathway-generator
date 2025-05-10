
import React from "react";

interface RestDayContentProps {
  isRecoveryDay: boolean;
}

const RestDayContent = ({ isRecoveryDay }: RestDayContentProps) => {
  return (
    <div className="pl-2">
      {isRecoveryDay ? (
        <>
          <p className="text-md text-blue-700">
            Recovery day - Focus on breathwork and gentle mobility exercises.
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm">
            <li>Deep breathing exercises (5 minutes)</li>
            <li>Light walking (10-15 minutes)</li>
            <li>Gentle stretching for major muscle groups</li>
            <li>Foam rolling or self-massage if available</li>
          </ul>
          <p className="mt-2 text-sm italic text-blue-600">
            Weekly recovery is essential for progress and injury prevention.
          </p>
        </>
      ) : (
        <p className="text-md">
          Rest day - Focus on light stretching, walking, and proper hydration. 
          Rest is essential for muscle recovery and growth.
        </p>
      )}
    </div>
  );
};

export default RestDayContent;
