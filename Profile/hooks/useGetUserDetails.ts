/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { authHeader } from '../../../../../../common/auth-header/authHeader';


export const GET_USER_DETAILS = gql`
 query GetGolferDetails($email: String!) {
    getGolferDetails(email: $email) {
      email
      displayName
      country
      city
      address
      dob
      postalcode
      gender
      firstname
      lastname
      mobilePhone
      ibm_image
    }
  }
`;


export const useGetUserDetails = (email:string) => {
    const { loading, error, data } = useQuery<GenericReturn>(GET_USER_DETAILS, {
        variables: { email },
        context:authHeader()
    });
    return { loading, error, userDetails: data?.getGolferDetails };
};

export type GenericReturn = {
  getGolferDetails: {
    email: string;
    displayName:string;
    country:string;
    city:string;
    address:string;
    dob:string;
    gender:string;
    postalcode:string;
    firstname:string;
    lastname:string;
    mobilePhone:string;
    ibm_image:string;
  };
};