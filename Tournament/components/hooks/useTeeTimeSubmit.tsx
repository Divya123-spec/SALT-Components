/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';
import { authHeader } from '../../../../../../../common/auth-header/authHeader';

export const SUBMIT_TEE_TIME_MUTATION = gql`
  mutation SubmitTeeTime($emailPayload: EmailPayload) {
    sendEmail(emailPayload: $emailPayload)
  }
`;

export const useTeeTimeSubmit = () => {
  const [submitTeeTime, { loading, data, error }] = useMutation(SUBMIT_TEE_TIME_MUTATION, {
    context:authHeader()
  });

  return { submitTeeTime, loading, data, error };
};
