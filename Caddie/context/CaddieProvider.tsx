/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { FC, useState } from 'react';
import { CaddieContext, DefaultContextValues } from './CaddieContext';
import * as M from '../models';

export const CaddieProvider: FC = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(DefaultContextValues.currentStep);
  const [goToReview, setGoToReviewState] = useState(DefaultContextValues.goToReview);
  const [steps, setSteps] = useState<M.Steps>(DefaultContextValues.steps);
  const [myDetails, setMyDetails] = useState<M.MyDetails>(DefaultContextValues.myDetails);
  const [itinerary, setItinerary] = useState(DefaultContextValues.itinerary);
  const [additionalInformation, setAdditionalInformation] = useState(DefaultContextValues.additionalInformation);
  const [teeTimeDetails, setTeeTimeDetails] = useState<M.TeeTimeDetails>(DefaultContextValues.teeTimeDetails);

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
    setCurrentStep(3);
  };
  return (
    <CaddieContext.Provider value={{
      itinerary,
      setItinerary,
      additionalInformation,
      setAdditionalInformation,
      teeTimeDetails,
      setTeeTimeDetails,
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
    </CaddieContext.Provider>
  );
};
