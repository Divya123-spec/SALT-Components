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
    playerDetails: {
        playerDetails: {
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            phoneNumber: '',
            country: '',
            address: '',
            cdhNumber: '',
            handicapIndex: 0,
            homeOfGolf: ''
        }
    }
} as IPlayerDetailProps;

export const TournamentContext = createContext<IPlayerDetailProps>(DefaultContextValues);

interface IPlayerDetailProps {
    playerDetails: M.PlayerDetails;
    setPlayerDetails: (details: M.PlayerDetails) => void;
}