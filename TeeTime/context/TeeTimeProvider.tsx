/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { FC, useState } from 'react';
import { TeeTimeContext, DefaultContextValues } from './TeeTimeContext';
import * as M from '../models';

export const TeeTimeProvider: FC = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(DefaultContextValues.currentStep);
  const [goToReview, setGoToReviewState] = useState(DefaultContextValues.goToReview);
  const [teeNumber, setTeeNumber] = useState(DefaultContextValues.teeNumber);
  const [steps] = useState(DefaultContextValues.steps);
  const [teeDetails, setTeeDetails] = useState<M.TeeDetails>(DefaultContextValues.teeDetails);
  const [myDetails, setMyDetails] = useState<M.MyDetails>(DefaultContextValues.myDetails);
  const [confirmed, setConfirmed] = useState<M.Confirmed>(DefaultContextValues.confirmed);
  const [removedTee, setRemovedTee] = useState(DefaultContextValues.removedTee);
  const onNextStep = () => {
    currentStep < steps.length && setCurrentStep(currentStep + 1);
  };
  const onStepBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const onAnyStepBack = (index) => {
    index < currentStep && setCurrentStep(index);
  };
  const setGoToReview = (isReviewReady: boolean) => {
    setGoToReviewState(isReviewReady);
  };
  const goToReviewPage = () => {
    setCurrentStep(3);
  };
  return (
    <TeeTimeContext.Provider
      value={{
        steps,
        onNextStep,
        onStepBack,
        onAnyStepBack,
        currentStep,
        setCurrentStep,
        goToReview,
        setGoToReview,
        goToReviewPage,
        teeDetails,
        setTeeDetails,
        teeNumber,
        setTeeNumber,
        myDetails,
        setMyDetails,
        confirmed,
        setConfirmed,
        removedTee,
        setRemovedTee
      }}
    >
      {children}
    </TeeTimeContext.Provider>
  );
};
