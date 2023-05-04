/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export type CrmGolferDetails = {
  handicap: string;
  leftrighthanded: string;
  preferredcourse: string;
  homeclub: string;
  email: string;
  golferId: string;
};

export type GolferDetails = CrmGolferDetails & {
  value: string;
  text: string;
};
