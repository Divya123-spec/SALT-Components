/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { FC, useState } from 'react';
import { AcademyContext, DefaultContextValues } from './AcademyContext';
import * as M from '../models';

export const AcademyProvider: FC = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(DefaultContextValues.currentStep);
  const [goToReview, setGoToReviewState] = useState(DefaultContextValues.goToReview);
  const [steps, setSteps] = useState<M.Steps>(DefaultContextValues.steps);
  const [myDetails, setMyDetails] = useState<M.MyDetails>(DefaultContextValues.myDetails);
  const [academyLessonDetails, setAcademyLessonDetails] = useState<M.Lessondetails>(DefaultContextValues.academyLessonDetails);

  const onNextStep = () => {
    currentStep < steps.length && setCurrentStep(currentStep + 1);
  };
  const onStepBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const onAnyStepBack = (index) => {
    setCurrentStep(index);
  };
  const setGoToReview = (isReviewReady: boolean) => {
    setGoToReviewState(isReviewReady);
  };
  const goToReviewPage = () => {
    setCurrentStep(2);
  };
  return (
    <AcademyContext.Provider value={{
      academyLessonDetails,
      setAcademyLessonDetails,
      steps,
      setSteps,
      onNextStep,
      onStepBack,
      onAnyStepBack,
      currentStep,
      setCurrentStep,
      goToReview,
      setGoToReview,
      goToReviewPage,
      myDetails,
      setMyDetails
    }}>
      {children}
    </AcademyContext.Provider>
  );
};
