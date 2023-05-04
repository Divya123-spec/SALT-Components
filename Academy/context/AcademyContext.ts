/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { createContext } from 'react';
import * as M from '../models';

export const DefaultContextValues = {
  academyLessonDetails:{
    dateOfLesson:'',
    haveSpecificInstructor:true,
    specificInstructor:'',
    lessonGoals:'',
    otherInformation:'',
    handicap:'',
    HowLongPlaying:''
  },
  myDetails:{
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    address:''
  },
  steps: [
    {
      title: 'Academy lesson details'
    },
    {
      title:'My details'
    },
    {
      title: 'Review & submit'
    }
  ],
  currentStep: 0,
  goToReview: false

} as IAcademyProps;

export const AcademyContext = createContext<IAcademyProps>(DefaultContextValues);

interface IAcademyProps {

  academyLessonDetails:M.Lessondetails;
  setAcademyLessonDetails:(data:M.Lessondetails)=>void;

  myDetails:M.MyDetails;
  setMyDetails:(data:M.MyDetails)=>void;
  
  steps: M.Steps;
  setSteps:(data:M.Steps)=>void;
  
  onNextStep: () => void;
  onStepBack: () => void;
  onAnyStepBack: (index: any) => void;
  goToReviewPage: () => void;

  goToReview: boolean;
  setGoToReview: (isReviewReady: boolean) => void;

  currentStep: number;
  setCurrentStep: (step: number) => void;

}
