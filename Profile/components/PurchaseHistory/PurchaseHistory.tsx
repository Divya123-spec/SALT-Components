/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/


import React from 'react';
import { DisplayTable } from '../DisplayTable/DisplayTable';
import * as S from './PurchaseHistory.style';

export const PurchaseHistory = ({ golferDetails, loading, error, pageTopRef }) => {

    let golferPurchaseData: any = [];

    let noData: boolean = false;

    const purchaseHeaders = [
        {
            key: 'purchaseDate',
            header: 'Date'
        },
        {
            key: 'store',
            header: 'Store'
        },
        {
            key: 'paymentGatewayAmount',
            header: 'Total Amount (£)'
        }
    ];

    let index = 1;
    if (!loading && golferDetails) {
        golferPurchaseData = JSON.parse(JSON.stringify(golferDetails.purchaseHistory)) as typeof golferDetails.purchaseHistory;
        if (golferPurchaseData[0] !== undefined) {
            golferPurchaseData.forEach((item: any) => {
                item.id = index;  // eslint-disable-line no-param-reassign
                index += 1;
                const date = new Date(parseInt(item.purchaseDate)); // eslint-disable-line radix
                item.purchaseDate = `${date.getFullYear()  }-${  (`0${  date.getMonth() + 1}`).slice(-2)  }-${  (`0${  date.getDate()}`).slice(-2)}`;  // eslint-disable-line no-param-reassign

            });
        }
        else {
            noData = true;
        }
    }

    if (!loading && error || noData) {
        return (
            <>
                <S.Heading>Purchase History</S.Heading>
                <h4>Golfer Purchase History not available</h4>
            </>
        );
    }

    return (
        <>
            {loading && <S.StyledLoading>Loading...</S.StyledLoading>}
            {!loading &&
                <>
                    <S.Heading>Purchase History</S.Heading>
                    <DisplayTable tableRows={golferPurchaseData} tableHeaders={purchaseHeaders} pageTopRef={pageTopRef}/>
                </>}
        </>
    );
};


