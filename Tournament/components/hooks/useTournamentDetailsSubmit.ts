/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';
import { authHeader } from '../../../../../../../common/auth-header/authHeader';

export const SUBMIT_TOURNAMENT_DETAILS_MUTATION = gql`
  mutation createTournamentEntrantDetails(
                                $competitionid: String
                                $firstname: String
                                $lastname: String
                                $email: String
                                $dateofbirth: String
                                $phonenumber: String
                                $countrycode: Int
                                $cdhnumber: String
                                $handicap: String
                                $homeclub: String
                                $wagrranking: Int
                                $status: String
                                $plushandicapindex: Boolean
                                $fileUploadPath: String
                                $country: Int
                                $mobilePhone: String
                                $addressTypeCode: Int
                              ) {
  createTournamentEntrantDetails(
                        competitionid: $competitionid,
                        firstname: $firstname,
                        lastname: $lastname,
                        email: $email,
                        dateofbirth: $dateofbirth,
                        phonenumber: $phonenumber,
                        countrycode: $countrycode,
                        cdhnumber: $cdhnumber,
                        handicap: $handicap,
                        homeclub: $homeclub,
                        wagrranking: $wagrranking,
                        status: $status,
                        plushandicapindex: $plushandicapindex,
                        fileUploadPath: $fileUploadPath,
                        country: $country,
                        mobilePhone: $mobilePhone,
                        addressTypeCode: $addressTypeCode
                        )
  }
`;

export const UPDATE_CDH_CERTIFICATE_MUTATION = gql`
  mutation cdhCertificateUpload(
                                $file: Upload!
                               ) {
                                cdhCertificateUpload(
            file: $file
            )
          }
`;

export const useTournamentDataSubmit = () => {
  const [submitTournamentDetails, { data, loading, error }] = useMutation(
    SUBMIT_TOURNAMENT_DETAILS_MUTATION, {
      context:authHeader()
    }
  );

  return { submitTournamentDetails, tournamentSubmittedValues: data, loadingSubmitResult: loading, error };
};

export const useCDHCertificateUpdate = () => {
  const [updateCDHCertificate, { data, loading, error }] = useMutation(
    UPDATE_CDH_CERTIFICATE_MUTATION, {
      context:authHeader()
    }
  );

  return { updateCDHCertificate, cdhUploadData: data, loadingCdhUploadResult: loading, error };
};
