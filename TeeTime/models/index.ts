/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// Place for all our custom models

export type IndividualTee = {
  course: {
    value:string;
    name:string;
  };
  adultGolfers: number;
  under16Golfers: number;
  dateOfPlay: string | null;
  timeOfPlay: string;
  otherAvailability: boolean | string;
  otherAvailabilityStart: string;
  otherAvailabilityEnd: string;
};

export type TeeDetails = {
  teeDetails: IndividualTee[];
  optionalDetails: string;
};
export type GolferDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  country?: string;
  address?: string;
};

export type MyDetails = {
  myDetails: GolferDetails;
  isLeadGolfer: boolean | null;
  leadGolfer: GolferDetails;
};

export type Steps = {
  title: string;
};
export type ConfirmedTees = {
  isConfirmed: boolean;
};

export type Confirmed = {
  confirmedTees: ConfirmedTees[];
};
