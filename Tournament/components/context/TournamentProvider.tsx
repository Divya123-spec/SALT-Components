/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { FC, useState } from 'react';
import { TournamentContext, DefaultContextValues } from './TournamentContext';
import * as M from '../models';

export const TournamentProvider: FC = ({ children }) => {
  const [playerDetails, setPlayerDetails] = useState<M.PlayerDetails>(DefaultContextValues.playerDetails);
  return (
    <TournamentContext.Provider
      value={{
        playerDetails,
        setPlayerDetails
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};
