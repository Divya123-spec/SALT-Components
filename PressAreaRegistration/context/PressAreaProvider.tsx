/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { FC, useState } from 'react';
import { PressAreaContext, DefaultContextValues } from './PressAreaContext';
import * as M from '../models';

export const PressAreaProvider: FC = ({ children }) => {
  const [pressAreaFormData, setPressAreaFormData] = useState<M.PressAreaRegistrationContext>(DefaultContextValues.pressAreaFormData);
  return (
    <PressAreaContext.Provider value={{ pressAreaFormData, setPressAreaFormData }}>
      {children}
    </PressAreaContext.Provider>
  );
};
