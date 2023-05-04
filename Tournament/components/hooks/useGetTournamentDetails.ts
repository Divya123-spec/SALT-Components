/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { authHeader } from '../../../../../../../common/auth-header/authHeader';


export const GET_TOURNAMENT_ADMIN_DETAILS = gql`
 query getTournamentAdminDetails {
    getTournamentAdminDetails {
      competitionName
      competitionId
      tournamentType
      entryCost
      startDate
      endDate
      registrationOpenDate
      registrationCloseDate
      maximumHandicap
      minimumHandicap
      paymentDeadline
      dateOfBirthRequired
      paymentOnRegistration
      dateofbirthadditionalinfo
      handicapadditionaltext
      cutoffdate
      statustabdatavisibility
      unsuccessful_entries
      reserved
      entries_accepted
      entries_to_date
    }
  }
`;


export const useGetTournamentDetails = () => {
    const { loading, error, data } = useQuery<GenericReturn>(GET_TOURNAMENT_ADMIN_DETAILS, {
        context:authHeader()
    });
    return { 
      loading, 
      error, 
      tournamentDetails: data?.getTournamentAdminDetails
    };
};

export type GenericReturn = {
  getTournamentAdminDetails: [{
    competitionName: string;
    competitionId:string;
    tournamentType:string;
    entryCost:string;
    startDate:string;
    endDate:string;
    registrationOpenDate:string;
    registrationCloseDate:string;
    maximumHandicap: String;
    minimumHandicap: String;
    paymentDeadline: String;
    dateOfBirthRequired: String;
    paymentOnRegistration: String;
    dateofbirthadditionalinfo: String;
    handicapadditionaltext: String;
    cutoffdate: String;
    statustabdatavisibility:boolean;
    unsuccessful_entries:boolean;
    reserved:boolean;
    entries_accepted:boolean;
    entries_to_date:boolean;
  }];
};

export type TournamentDetails = {
    competitionName: string;
    competitionId:string;
    tournamentType:string;
    entryCost:string;
    startDate:string;
    registrationOpenDate:string;
    registrationCloseDate:string;
};

export type TournamentDetailsResult = {
  getTournamentDetails: TournamentDetails[];
};