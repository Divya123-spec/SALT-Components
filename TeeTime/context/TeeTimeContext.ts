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
  teeDetails:{
    teeDetails:[
      {
        course: {
          value:'',
          name:''
        },
        adultGolfers: 1,
        under16Golfers: 0,
        timeOfPlay: '',
        otherAvailability: '',
        otherAvailabilityStart: '',
        otherAvailabilityEnd: ''
      }
    ],
    optionalDetails: ''
  },
  myDetails: {
      myDetails:{
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        address: ''
      },
      leadGolfer:{
        firstName: '',
        lastName: '',
        email: ''
      }
  },
  confirmed:{ 
      confirmedTees: [{
        isConfirmed:false
      }]
  },
  steps: [
      {
        title: 'Tee time details'
      },
      {
        title: 'My Details'
      },
      {
        title: 'Extras & add-ons'
      },
      {
        title: 'Review & submit'
      }
  ],
  removedTee:false,
  teeNumber: 1,
  currentStep: 0,
  goToReview: false

} as ITeeTimeProps;


export const TeeTimeContext = createContext<ITeeTimeProps>(DefaultContextValues);

interface ITeeTimeProps {

  teeDetails: M.TeeDetails;
  setTeeDetails: (details: M.TeeDetails) => void;

  myDetails: M.MyDetails;
  setMyDetails: (details: M.MyDetails) => void;

  steps: M.Steps[];
  onNextStep: () => void;
  onStepBack: () => void;
  onAnyStepBack: (index: any) => void;
  goToReviewPage: () => void;

  confirmed: M.Confirmed;
  setConfirmed: (s: M.Confirmed) => void;

  teeNumber: number;
  setTeeNumber: (num: number) => void;

  goToReview: boolean;
  setGoToReview: (isReviewReady: boolean) => void;

  currentStep: number;
  setCurrentStep: (step: number) => void;

  removedTee:boolean;
  setRemovedTee:(state:boolean)=>void;
}
