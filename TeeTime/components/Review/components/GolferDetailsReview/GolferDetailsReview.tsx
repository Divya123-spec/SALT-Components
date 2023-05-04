/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewText } from '../../../ReviewText/ReviewText';
import { ReviewTexts } from '../../../ReviewTexts/ReviewTexts';
import { ReviewTitle } from '../../../ReviewTitle/ReviewTitle';
import { EditIcon } from '../EditIcon/EditIcon';
import * as S from './GolferDetailsReview.styles';

export const GolferDetailsReview = ({ leadGolfer }: Props) => {
  const leadGolferData = [
    {
      label: 'Name',
      text: `${leadGolfer.firstName} ${leadGolfer.lastName}`
    },
    {
      label: 'Email address',
      text: leadGolfer.email
    }
  ];
  return (
    <S.GolferDetailsReviewConatiner>
      <ReviewTitle title="Golfer details" />
      <S.SectionContainer>
        <S.GolferHeader>
          <ReviewText reviewText="Lead Golfer" />
          <S.CustomIconWrapper>
            <EditIcon goToStep={1} />
          </S.CustomIconWrapper>
        </S.GolferHeader>
        <S.GolferDataConatiner>
          <ReviewTexts reviews={leadGolferData} />
        </S.GolferDataConatiner>
      </S.SectionContainer>
    </S.GolferDetailsReviewConatiner>
  );
};

type GolferDetails = {
  firstName: string;
  lastName: string;
  email: string;
};

type Props = {
  leadGolfer: GolferDetails;
};
