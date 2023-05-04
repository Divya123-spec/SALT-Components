/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/


import { gql, useMutation } from '@apollo/client';
import { authHeader } from '../../../../../../common/auth-header/authHeader';

export const PERSONAL_DATA = gql`
mutation SaveProfileDetails($email: String!, $displayName: String!, $firstname: String, $lastname: String, $address: String, $country: String, $city: String, $postalcode: String, $dob: String, $gender: String
  $careers: Boolean, $learn: Boolean, $news: Boolean, $play: Boolean, $relax: Boolean, $shop: Boolean, $addressTypeCode: Int) {
  saveProfileDetails(email: $email, displayName: $displayName, firstname: $firstname, lastname: $lastname, address: $address, country: $country, city: $city,postalcode: $postalcode, dob: $dob, gender: $gender
    careers: $careers, learn: $learn, news: $news, play: $play, relax: $relax, shop: $shop, addressTypeCode: $addressTypeCode)
}
`;

export const usePersonalDataSubmit = () => {
  const [SaveProfileDetails, { data, error, loading }] = useMutation(
    PERSONAL_DATA, {
      context: authHeader()
    }
  );

  return { SaveProfileDetails, data, error, profileLoading:loading };
};



export const PROFILE_DATA = gql`
mutation SaveProfileDetails($email: String!, $displayName: String!, $firstname: String, $lastname: String, $address: String, $country: String, $city: String, $gender: String, $ibmImage: String) {
  saveProfileDetails(email: $email, displayName: $displayName, firstname: $firstname, lastname: $lastname, address: $address, country: $country, city: $city, gender: $gender, ibm_image: $ibmImage)
}`;

export const useProfileData = () => {
 const [ProfilePictureDetails, { data, error }] = useMutation(
  PROFILE_DATA, {
    context: authHeader() 
  }
 );

 return { ProfilePictureDetails, data, error };
};

