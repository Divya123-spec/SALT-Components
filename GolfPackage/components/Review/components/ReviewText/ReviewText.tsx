/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './ReviewText.styles';

export const ReviewText = ({ labelText, reviewText, className }: Props) => (
  <S.ReviewTextContainer className={className}>
    {labelText && <S.Label>{labelText}</S.Label>}
    {reviewText && <S.RewiewText>{reviewText}</S.RewiewText>}
  </S.ReviewTextContainer>
);


type Props = {
  labelText?: string;
  reviewText?: string;
  className?: string;
};