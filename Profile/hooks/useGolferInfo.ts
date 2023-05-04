/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { authHeader } from '../../../../../../common/auth-header/authHeader';


export const GET_GOLFER_DETAILS = gql`
 query GetGolferDetails($email: String!) {
    getGolferDetails(email: $email) {
      handicap
      leftrighthanded
      preferredcourse
      homeclub
      email
      golferId
      displayName
      country
      dob
      city
      postalcode
      gender
      address
      careers
      learn
      news
      play
      relax
      shop
      firstname
      lastname
      ibm_image
      playingHistory {
        dateOfPlay
        coursePlayed
        bookingReference
      }
      purchaseHistory {
        purchaseDate
        store
        paymentGatewayAmount
      }
    }
  }
`;


export const useGetGolferDetails = (email:string) => {
    const { loading, error, data, refetch } = useQuery<GenericReturn>(GET_GOLFER_DETAILS, {
        variables: { email },
        context:authHeader()
    });

    return { loading, error, refetch, golferDetails: data?.getGolferDetails };
};

export type playingHistory = {
  dateOfPlay:string;
  coursePlayed:string;
  bookingReference:string;
};

export type purchaseHistory = {
  purchaseDate:string;
  store:string;
  paymentGatewayAmount:string;
};
export type GenericReturn = {
  getGolferDetails: {
    handicap: string;
    leftrighthanded: string;
    preferredcourse: string;
    homeclub: string;
    email: string;
    golferId: string;
    displayName:string;
    country:string;
    dob:string;
    city:string;
    postalcode:string;
    gender:string;
    address:string;
    careers:string;
    learn:string;
    news:string;
    play:string;
    relax:string;
    shop:string;
    firstname:string;
    lastname:string;
    ibm_image:string;
    playingHistory:playingHistory[];
    purchaseHistory:purchaseHistory[];
  };
};


