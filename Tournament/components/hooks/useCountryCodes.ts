/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { authHeader } from '../../../../../../../common/auth-header/authHeader';

const GET_COUNTRYCODES_QUERY = gql`
  query GetCountryCodes {
  getCountryCodes {
    name
    code
  }
}
`;

export const useCountryCodes = () => {
  const { loading, error, data } = useQuery<CountryCodesResult>(GET_COUNTRYCODES_QUERY, {
    context:authHeader()
  });

  return {
    loadingCountryCodes: loading,
    errorCountryCodes: error,
    dataCountryCodes: data?.getCountryCodes
  };
};

export type CountryCode = {
  name: string;
  code: string;
};

export type CountryCodesResult = {
  getCountryCodes: CountryCode[];
};
