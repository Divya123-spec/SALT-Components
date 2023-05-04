/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation, useQuery } from '@apollo/client';

export const GET_EMAIL_PREFERENCES_QUERY = gql`
  query GetEmailPreferences($emailAddress: String!) {
    getEmailPreferences(emailAddress: $emailAddress) {
      contactid
      emailaddress1
      firstname
      lastname
      ibm_careers
      ibm_learn
      ibm_news
      ibm_play
      ibm_relax
      ibm_shop
    }
  }
`;

export const useEmailPreferences = (emailAddress) => {
  const  { loading, error, data, refetch } = useQuery(
    GET_EMAIL_PREFERENCES_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      variables:  { emailAddress },
      skip: emailAddress === null || emailAddress === undefined
    }
  );

  return { refetch, loading, error, data };
};

export const UPDATE_EMAIL_PREFERENCES_MUTATION = gql`
  mutation UpdateEmailPreferences($newEmailPreferences: EmailPreferencesInput!) {
    updateEmailPreferences(newEmailPreferences: $newEmailPreferences)
  }
`;

export const useUpdateEmailPreferences = () => {
  const [submitPreferencesUpdate, { data, loading, error }] = useMutation(
    UPDATE_EMAIL_PREFERENCES_MUTATION
  );

  return { submitPreferencesUpdate, data, loading, error };
};
