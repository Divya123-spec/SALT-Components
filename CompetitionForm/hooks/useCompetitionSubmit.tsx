/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';

export const SUBMIT_COMPETITION_MUTATION = gql`
  mutation SubmitCompetition($contactInfo: OpenRegistrationInput!) {
    registerToAnnualOpen(contactInfo: $contactInfo)
  }
`;

export const useCompetitionSubmit = () => {
  const [submitCompetition, { data, loading, error }] = useMutation(SUBMIT_COMPETITION_MUTATION);

  return { submitCompetition, data, loading, error };
};
