/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewHeader } from '../ReviewHeader/ReviewHeader';
import * as S from './PackageDetailsReview.styles';
import { ReviewTexts } from '../ReviewTexts/ReviewTexts';

export const PackageDetailsReview = ({ name, adults, minors }: Props) => {
  const reviews = [
    {
      label: 'Golf Package',
      text: name
    },
    {
      label: 'Adult golfers',
      text: adults
    },
    {
      label: 'Golfers under 16 ',
      text: minors
    }
  ];

  return (
    <S.MyDetailsReviewContainer>
      <S.ContentContainer>
        <ReviewHeader title="Package details" goToStep={0} />
        <ReviewTexts reviews={reviews} />
      </S.ContentContainer>
    </S.MyDetailsReviewContainer>
  );
};

type Props = {
  name: string;
  adults: string;
  minors: string;
};
