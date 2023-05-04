/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { FC, useState } from 'react';
import { GolfPackageContext, DefaultContextValues } from './GolfPackageContext';
import * as M from '../models';

export const GolfPackageProvider: FC = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(DefaultContextValues.currentStep);
  const [goToReview, setGoToReviewState] = useState(DefaultContextValues.goToReview);
  const [steps, setSteps] = useState<M.Steps>(DefaultContextValues.steps);
  const [packageDetails, setPackageDetails] = useState<M.PackageDetails>(DefaultContextValues.packageDetails);
  const [myDetails, setMyDetails] = useState<M.MyDetails>(DefaultContextValues.myDetails);
  const [isLeadGolfer, setIsLeadGolfer] = useState<boolean>(DefaultContextValues.isLeadGolfer);
  const [leadGolfer, setLeadGolfer] = useState<M.LeadGolfer>(DefaultContextValues.leadGolfer);
  const [otherGolfers, setOtherGolfers] = useState<M.OtherGolfers>(DefaultContextValues.otherGolfers);
  const [golferId, setGolferIdState] = useState(DefaultContextValues.golferId);
  const [teeTimes, setTeeTimes] = useState<M.TeeTimes>(DefaultContextValues.teeTimes);
  const [hasTeeTime, setHasTeeTime] = useState(DefaultContextValues.hasTeeTime);
  const [nrOfTees, setNrOfTees] = useState(DefaultContextValues.nrOfTees);

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
  const setGolferId = (id: number) => {
    setGolferIdState(id);
  };
  return (
    <GolfPackageContext.Provider value={{
      hasTeeTime,
      nrOfTees,
      setNrOfTees,
      setHasTeeTime,
      teeTimes,
      setTeeTimes,
      golferId,
      setGolferId,
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
      packageDetails,
      setPackageDetails,
      myDetails,
      setMyDetails,
      isLeadGolfer,
      setIsLeadGolfer,
      leadGolfer,
      setLeadGolfer,
      otherGolfers,
      setOtherGolfers
    }}>
      {children}
    </GolfPackageContext.Provider>
  );
};
