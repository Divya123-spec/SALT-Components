/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { FC, useState } from 'react';
import { CompetitionContext, DefaultContextValues } from './CompetitionContext';
import * as M from '../models';

export const PressAreaProvider: FC = ({ children }) => {
  const [myDetails, setMyDetails] = useState<M.Competition>(DefaultContextValues.myDetails);
  return (
    <CompetitionContext.Provider value={{ myDetails, setMyDetails }}>
      {children}
    </CompetitionContext.Provider>
  );
};
