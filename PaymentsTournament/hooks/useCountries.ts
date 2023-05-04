/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { authHeader } from '../../../../../../common/auth-header/authHeader';

const GET_COUNTRIES_QUERY = gql`
    query Countries {
      countries {
        isoCode
        name
        phonePrefix
        numericCode
      }
    }
`;

export const useCountries = () => {
  const { loading, error, data } = useQuery<CountryCodesResult>(GET_COUNTRIES_QUERY, {
    context: authHeader()
  });

  return {
    loading,
    error,
    dataCountryCodes: data?.countries
  };
};

export type CountryCode = {
  isoCode: string;
  name: string;
  phonePrefix: string;
  numericCode: string;
};

export type CountryCodesResult = {
  countries: CountryCode[];
};
