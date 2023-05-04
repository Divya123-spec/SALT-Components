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
  pressAreaFormData: {
    firstName: '',
    lastName: '',
    emailAddress: '',
    nameOfOrganisation: ''
  }
} as IPressAreaProps;

export const PressAreaContext = createContext<IPressAreaProps>(DefaultContextValues);

interface IPressAreaProps {
  pressAreaFormData: M.PressAreaRegistrationContext;
  setPressAreaFormData: (data: M.PressAreaRegistrationContext) => void;
}
