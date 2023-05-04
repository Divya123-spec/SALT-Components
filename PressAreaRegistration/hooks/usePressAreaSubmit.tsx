/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';

export const SUBMIT_PRESS_AREA_REGISTRATION_MUTATION = gql`
  mutation SubmitPressArea($emailPayload: EmailPayload) {
    sendEmail(emailPayload: $emailPayload)
  }
`;

export const usePressAreaSubmit = () => {
  const [submitPressArea, { data, loading, error }] = useMutation(
    SUBMIT_PRESS_AREA_REGISTRATION_MUTATION
  );

  return { submitPressArea, data, loading, error };
};
