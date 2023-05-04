/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// Place for all our custom hooks

import { gql, useMutation } from '@apollo/client';

export const SUBMIT_EMAIL_MUTATION = gql`
    mutation CheckoutTournamentPayment($transactionId: String!, $email: String!, $firstName: String!,$amount: String!, $tournamentName: String!){
        checkoutTournamentPayment(transactionId: $transactionId, email: $email, firstName: $firstName, amount: $amount, tournamentName: $tournamentName)
    }
`;

export const useEmailSend = () => {
    const [submitEmail, { data, loading, error }] = useMutation(SUBMIT_EMAIL_MUTATION);

    return { submitEmail, data, loading, error };
};
