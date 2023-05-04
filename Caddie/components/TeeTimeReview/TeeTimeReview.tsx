/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewTexts } from '../ReviewTexts/ReviewTexts';
import { ReviewTitle } from '../ReviewTitle/ReviewTitle';
import * as S from './TeeTimeReview.styles';

export const TeeTimeReview = ({ course, date, tee_time, golfers, id }) => {
  const reviews = [
    {
      label: 'Course',
      text: course
    },
    {
      label: 'Date',
      text: date
    },
    {
      label: 'Tee Time',
      text: tee_time
    },
    {
      label: 'Golfers',
      text: golfers
    }
  ];

  return (
    <S.MyDetailsReviewContainer>
      <S.ContentContainer>
        <S.GolferHeader>
          <ReviewTitle title={`Tee Time ${id + 1}`} />
        </S.GolferHeader>
        <ReviewTexts reviews={reviews} />
      </S.ContentContainer>
    </S.MyDetailsReviewContainer>
  );
};

