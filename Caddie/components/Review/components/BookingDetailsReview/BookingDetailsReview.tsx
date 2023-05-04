/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewHeader } from '../ReviewHeader/ReviewHeader';
import * as S from './BookingDetailsReview.styles';
import { ReviewTexts } from '../ReviewTexts/ReviewTexts';

export const BookingDetailsReview = ({ bookingRef }) => {
  const reviews = [
    {
      label: 'Itinerary / Booking confirmation',
      text: bookingRef
    }
  ];

  return (
    <S.MyDetailsReviewContainer>
      <S.ContentContainer>
        <ReviewHeader title="Booking details" />
        <ReviewTexts reviews={reviews} />
      </S.ContentContainer>
    </S.MyDetailsReviewContainer>
  );
};

