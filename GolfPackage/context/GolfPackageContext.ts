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
  packageDetails:{
    golfPackage:{
      name:'',
      value:''
    },
    adultGolfers:'',
    under16Golfers:'0'
  },
  myDetails:{
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber: '',
    country:'',
    address:''
  },
  leadGolfer:{
    firstName:'',
    lastName:'',
    email:'',
    homeGolfClub:'',
    handicap:''
  },
  isLeadGolfer:false,
  otherGolfers:[{
    firstName:'',
    lastName:'',
    email:'',
    homeGolfClub:'',
    handicap:''
  }],
  teeTimes:[{
    course:{
      name:'',
      value:''
    },
    timeOfPlay:'',
    otherAvailability:'',
    otherAvailabilityStart:'',
    otherAvailabilityEnd:''
  }],
  steps: [
    {
      title: 'Package Details'
    },
    {
      title:'Tee time details'
    },
    {
      title: 'My Details'
    },
    {
      title: 'Review & submit'
    }
  ],
  currentStep: 0,
  nrOfTees:1,
  goToReview: false,
  hasTeeTime:false


} as IGolfPackageProps;

export const GolfPackageContext = createContext<IGolfPackageProps>(DefaultContextValues);

interface IGolfPackageProps {

  packageDetails:M.PackageDetails;
  setPackageDetails:(details:M.PackageDetails)=>void;

  myDetails:M.MyDetails;
  setMyDetails:(details:M.MyDetails)=>void;

  isLeadGolfer:boolean;
  setIsLeadGolfer:(details:boolean)=>void;

  leadGolfer:M.LeadGolfer;
  setLeadGolfer:(details:M.LeadGolfer)=>void;

  otherGolfers:M.OtherGolfers;
  setOtherGolfers:(details:M.OtherGolfers)=>void;

  teeTimes:M.TeeTimes;
  setTeeTimes:(details:M.TeeTimes)=>void;

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

  golferId: number;
  setGolferId: (id: number) => void;

  hasTeeTime:boolean;
  setHasTeeTime:(value:boolean)=>void;

  nrOfTees:number;
  setNrOfTees:(nrOfTees)=>void;
}
