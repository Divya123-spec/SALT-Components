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
  myDetails: {
    firstName: '',
    lastName: '',
    emailAddress: '',
    country: '',
    termsAndConditions: false,
    mailPreferences: false,
    marketingListID: '',
    gender: ''
  }
} as ICompetitionProps;

export const CompetitionContext = createContext<ICompetitionProps>(DefaultContextValues);

interface ICompetitionProps {
  myDetails: M.Competition;
  setMyDetails: (data: M.Competition) => void;
}
