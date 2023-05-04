/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { useEffect, useRef, useState } from 'react';
import { RadioButton } from '@exo/frontend-components-base';
// import { LayoutSpacing } from '@exo/frontend-components-core';
import { PaymentHandle } from '@exo/frontend-features-payments-logic';
import { AccountPayment } from '@exo/frontend-features-payments-provider-account';
import { GlobalPaymentReservation } from '@exo/frontend-features-payments-provider-global-payments';
import * as S from './TournamentPayment.styles';
import { useEmailSend } from '../../hooks/useEmailSend';

type Details = {
    paymentDone: false;
    authorizedAmount: string;
    orderId: string;
    transactionId: string;
};

let amountPaid:string;

export const TournamentPayment = ({ tournamentEntrantId, amount, currency, addressDetails, tournamentName }) => {
    const ref = useRef<PaymentHandle>(null);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<string>();
    const [transactionDetails, setTransactionDetails] = useState<Details | any>({});

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (transactionDetails?.paymentDone !== undefined && transactionDetails?.paymentDone === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [transactionDetails]);

    const { submitEmail } = useEmailSend();

    useEffect(() => {
        if (transactionDetails?.paymentDone !== undefined && transactionDetails?.paymentDone === true) {
            amountPaid = transactionDetails?.authorizedAmount.slice(0, -2);
            submitEmail({
                variables: {
                    transactionId: transactionDetails.transactionId,
                    email: addressDetails.email,
                    firstName: addressDetails.firstName,
                    amount:amountPaid,
                    tournamentName
                },
                errorPolicy: 'all'
            });
        }
    }, [transactionDetails]);


    // const tournamentEntrantId: string = "14b2cfa8-5157-ed11-9560-000d3ab22fc7";
    // const amount: string = "233";
    // const currency: string = "GBP";

    // const addressDetails = {
    //     firstName: 'FirstName',
    //     lastName: 'LastName',
    //     email: 'test@test.com',
    //     phone: '+44 8888878666',
    //     address1: 'Street1',
    //     address2: 'Street2',
    //     address3: 'Street3',
    //     country: 'GB',
    //     city: 'Leads',
    //     province: 'Aberdeen',
    //     zip: 'MW255',
    //     countryCode: 'GB',
    //     countryName: 'United Kingdom'
    // };

    const availablePaymentMethods = [
        {
            'id': 'CREDIT_CARD',
            'identifier': 'Credit Card',
            'description': 'Credit Card, VISA , AMERICAN EXPRESS',
            'type': 'CREDIT_CARD',
            '__typename': 'CrtPaymentMethod'
        }
    ];

    useEffect(() => {
        setSelectedPaymentOption(availablePaymentMethods[0].id);
    }, [availablePaymentMethods]);

    const isCardPayment = paymentMethod => ['VISA', 'AMEX', 'CREDIT_CARD', 'Master Card'].includes(paymentMethod);

    if (transactionDetails?.paymentDone !== undefined) {
        return (
            transactionDetails?.paymentDone ?
                (<S.ConfirmationPageHead>
                    <S.ConfirmationHeading>Tournament Payment Completed!</S.ConfirmationHeading>
                    <S.MessageWrapper>
                        {/* <S.SvgWrapper>
                            <TaskComplete size={24} className="my-custom-class" />
                        </S.SvgWrapper> */}
                        <S.TransactionDetails>
                            <S.Span>Thank you for your payment.  You should now receive an email with your Tournament details and payment confirmation.</S.Span><br />
                            <div><strong>Transaction ID : </strong><S.Span> {transactionDetails?.transactionId}</S.Span></div>
                            <div><strong>Transaction Amount : </strong><S.Span>£{amountPaid}</S.Span></div>
                        </S.TransactionDetails>
                    </S.MessageWrapper>

                </S.ConfirmationPageHead >)
                :
                (<S.ConfirmationPageHead>
                    <S.FailureHeading>Transaction Failed!</S.FailureHeading>
                    <S.FailureMessage>
                        <S.Span>Please try after some time!!!</S.Span><br />
                        <strong>Transaction ID : </strong><S.Span> {transactionDetails?.transactionId}</S.Span>
                    </S.FailureMessage>
                </S.ConfirmationPageHead >)
        );
    }

    return (<>
        {transactionDetails?.paymentDone === undefined &&
            <S.PaymentPanelWrapper>

                <S.PaymentWrapper>
                    <S.Heading>Mode of Payment</S.Heading>
                    {/* <LayoutSpacing size="sm" /> */}

                    {availablePaymentMethods.map(pm => (
                        <React.Fragment key={pm.id}>
                            <S.PaymentMethodHeader
                                onClick={() => setSelectedPaymentOption(pm.id)}
                                selected={selectedPaymentOption === pm.id}
                            >
                                <RadioButton
                                    id={`pm_${pm.id}`}
                                    name="payment-method"
                                    checked={selectedPaymentOption === pm.id}
                                />
                                <S.PaymentName htmlFor={`pm_${pm.id}`}>{pm.description}</S.PaymentName>
                            </S.PaymentMethodHeader>
                        </React.Fragment>
                    ))}

                    {availablePaymentMethods.map(pm => (
                        <>
                            {selectedPaymentOption === pm.id && (
                                <S.Widget>
                                    {isCardPayment(selectedPaymentOption) && (

                                        <GlobalPaymentReservation
                                            tournamentEntrantId={tournamentEntrantId}
                                            amount={amount}
                                            currency={currency}
                                            ref={ref}
                                            setTransactionDetails={setTransactionDetails}
                                            addressDetails={addressDetails}
                                        />
                                    )}
                                    {selectedPaymentOption === 'account-payment' && <AccountPayment ref={ref} />}
                                </S.Widget>
                            )}
                        </>
                    ))}
                    {/* <LayoutSpacing size="sm" /> */}
                </S.PaymentWrapper>
            </S.PaymentPanelWrapper>
        }

    </>);
};

// type Props = {
//     refNum: string;
//     amount: string;
//     currency: string;
//     setTransactionDetails: (action: any) => void;
//     addressDetails: addresDetails;
// };

// export type addresDetails = {
//     firstName: string;
//     lastName: string;
//     email: string;
//     address1: string;
//     address2: string;
//     address3: string;
//     city: string;
//     country: string;
//     zip: string;
// }


