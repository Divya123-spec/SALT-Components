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
  itinerary:'',
  teeTimeDetails:[{
    bookingRef:'',
    date:'',
    time:'',
    course:'',
    numberOfGolfers:0,
    numberOfCaddies:0
  }],
  additionalInformation:'',
  myDetails:{
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:''
  },
  steps: [
    {
      title: 'Booking details'
    },
    {
      title:'Caddie details'
    },
    {
      title:'My Details'
    },
    {
      title: 'Review & submit'
    }
  ],
  currentStep: 0,
  goToReview: false

} as ICaddieProps;

export const CaddieContext = createContext<ICaddieProps>(DefaultContextValues);

interface ICaddieProps {

  itinerary:string;
  setItinerary:(data:string)=>void;

  additionalInformation:string;
  setAdditionalInformation:(data:string)=>void;

  teeTimeDetails:M.TeeTimeDetails;
  setTeeTimeDetails:(data:M.TeeTimeDetails)=>void;

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
