/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/


import React from 'react';
import { DisplayTable } from '../DisplayTable/DisplayTable';
import * as S from './GolferHistory.styles';

export const GolferHistory = ({ golferDetails, loading, error, courseDetails, pageTopRef }) => {

    let golferHistoryData: any = [];

    let noData: boolean = false;

    const golferHeaders = [
        {
            key: 'dateOfPlay',
            header: 'Date of Play'
        },
        {
            key: 'coursePlayed',
            header: 'Course Played'
        },
        {
            key: 'bookingReference',
            header: 'Booking Reference'
        }
    ];

    let index = 1;
    if (!loading && golferDetails) {
        golferHistoryData = JSON.parse(JSON.stringify(golferDetails.playingHistory)) as typeof golferDetails.playingHistory;

        if (golferHistoryData[0] !== undefined) {
            golferHistoryData.forEach((item: any) => {
                item.id = index;  // eslint-disable-line no-param-reassign
                index += 1;
                const date: Date = new Date(parseInt(item.dateOfPlay)); // eslint-disable-line radix
                item.dateOfPlay = `${date.getFullYear()  }-${  (`0${  date.getMonth() + 1}`).slice(-2)  }-${  (`0${  date.getDate()}`).slice(-2)}`;  // eslint-disable-line no-param-reassign
                const filteredCourse = courseDetails?.filter((course) => course?.id === item?.coursePlayed);
                item.coursePlayed = (filteredCourse?.[0] === undefined) ? '' : filteredCourse?.[0]?.courseName; // eslint-disable-line no-param-reassign
            });
        }
        else {
            noData = true;
        }

    }

    if (!loading && error || noData) {
        return (
            <>
                <S.Heading>Golfer History</S.Heading>
                <h4>Golfer Playing History not available</h4>
            </>
        );
    }

    return (
        <>
            {loading && <S.StyledLoading>Loading...</S.StyledLoading>}
            {!loading &&
                <>
                    <S.Heading>Golf History</S.Heading>
                    <DisplayTable tableRows={golferHistoryData} tableHeaders={golferHeaders} pageTopRef={pageTopRef}/>
                </>}
        </>
    );

};


