/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// Place for all our custom models

export type playerDetails = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phoneNumber?: string;
  country?: string;
  address?: string;
  cdhNumber?: string;
  handicapIndex?: number;
  homeOfGolf?: string;
};

export type PlayerDetails = {
  playerDetails: playerDetails;
};