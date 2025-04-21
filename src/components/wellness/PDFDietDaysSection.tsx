
import React from 'react';
import PDFDayBlock from './PDFDayBlock';
import { DietPlan } from './types';

type PDFDietDaysSectionProps = {
  days: DietPlan['days'];
};

const PDFDietDaysSection = ({ days }: PDFDietDaysSectionProps) => (
  <>
    {days.map((dietDay) => (
      <PDFDayBlock key={dietDay.day} {...dietDay} />
    ))}
  </>
);

export default PDFDietDaysSection;

