/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewText } from '../ReviewText/ReviewText';
import * as S from './ReviewTexts.styles';

export const ReviewTexts = ({ reviews }: Props) => (
  <S.DataContainer>
    {reviews?.map((review, index) => (
      <ReviewText key={`${review?.text ? review?.text + index : index}`} labelText={review.label} reviewText={review.text} />
    ))}
  </S.DataContainer>
);

type Props = {
  reviews: ReviewsProp[];
};

type ReviewsProp = {
  label?: string;
  text?: string;
};
