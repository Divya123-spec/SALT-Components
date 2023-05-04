/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewTitle } from '../../../ReviewTitle/ReviewTitle';
import { TeeReview } from '../../../TeeReview/TeeReview';
import * as S from './TeeTimeReview.styles';

export const TeeTimeReview = ({ teeTime, setConfirmed, setTeeDetails, setTeeNumber, goToStep, setRemovedTee, setGoToReview }) => (
  <S.TeeTimeReview>
    <S.ContentContainer>
      <ReviewTitle title="Tee Time Details" />
      {teeTime && teeTime.map((teeDetails, id) =>
        <TeeReview
          id={id}
          title={`Tee time ${id + 1}`}
          course={teeDetails?.course.name}
          date={teeDetails?.dateOfPlay}
          teeTime={teeDetails?.timeOfPlay}
          adultGolfers={teeDetails?.adultGolfers?.toString()}
          youngGolfers={teeDetails?.under16Golfers?.toString()}
          otherAvailability={`${teeDetails?.otherAvailabilityStart || ''} - ${teeDetails?.otherAvailabilityEnd || ''
            }`}
          // @ts-ignore
          onClick={() => {
            setConfirmed(({ confirmedTees }) => ({
              confirmedTees: [
                ...confirmedTees.slice(0, id),
                {
                  ...confirmedTees[id],
                  isConfirmed: false
                },
                ...confirmedTees.slice(id + 1)
              ]
            }));
            goToStep(0);
            setGoToReview(true);
          }
          }
          onRemoveTee={() => {
            setTeeDetails(prev => ({ ...prev, teeDetails: prev.teeDetails.filter((_, teeID) => teeID !== id) }));
            setConfirmed(({ confirmedTees }) => ({ confirmedTees: confirmedTees.filter((_, teeID) => teeID !== id) })
            );
            setTeeNumber((prev) => prev - 1);
            setRemovedTee(true);
          }}
          // eslint-disable-next-line react/no-array-index-key
          key={`tee_review_page_${teeDetails?.course.value}_${id}`}
        />
      )}

    </S.ContentContainer>
  </S.TeeTimeReview>
);