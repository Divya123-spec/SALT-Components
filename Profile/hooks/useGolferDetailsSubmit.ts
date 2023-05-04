/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';

export const SUBMIT_GOLFER_DETAILS_MUTATION = gql`
  mutation UpdateGolferDetails($email: String!, $handicap: String, $leftrighthanded: Boolean, $preferredcourse: String, $homeclub: String) {
    updateGolferDetails(email: $email, handicap: $handicap, leftrighthanded: $leftrighthanded, preferredcourse: $preferredcourse, homeclub: $homeclub)
  }
`;

export const useGolferDetailsSubmit = () => {
  const [submitGolferDetails, { data, loading, error }] = useMutation(
    SUBMIT_GOLFER_DETAILS_MUTATION
  );

  return { submitGolferDetails, data, loading, error };
};
