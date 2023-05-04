/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// Place for all our custom models

export type PackageDetails ={
  golfPackage:{
    name:string;
    value:string;
  };
  adultGolfers:number|string;
  under16Golfers:number|string;
};

export type MyDetails={
  firstName:string;
  lastName:string;
  email?:string;
  phoneNumber?: string;
  country?:string;
  homeGolfClub?:string;
  address?:string;
};

export type LeadGolfer={
  firstName:string;
  lastName:string;
  email?:string;
  homeGolfClub?:string;
  handicap?:string;
};

export type OtherGolfers={
  firstName:string;
  lastName:string;
  email?:string;
  homeGolfClub?:string;
  handicap?:string;
}[];

export type RequestedCaddies={
  nrOfCaddies:number;
};
export type TeeTimes={
  course:{
    name:string;
    value:string;
  };
  timeOfPlay:string;
  dateOfPlay:string|null;
  otherAvailability:string;
  otherAvailabilityStart?:string;
  otherAvailabilityEnd?:string;

}[];

export type Steps={
  title:string;
}[];
