/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/


import { gql, useLazyQuery } from '@apollo/client';

export const GET_BOOKING_REF = gql`
    query GetBookingDetails($itinerary: String!) {
      getBookingDetails(itinerary: $itinerary) {
        itinerary
        name
        purchaseDate
        tees {
          bookingRef
          date
          time
          course {
            id
            courseCode
            courseName
            numberOfHoles
          }
          numberOfGolfers
          numberOfCaddies
        }
      }
    }
`;


export const useBookingRef = () => {
    const [getBookingDetails, { data, loading, error }] = useLazyQuery(GET_BOOKING_REF);
    
    return { getBookingDetails, data, loading, error };
};
