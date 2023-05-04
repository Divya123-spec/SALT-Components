/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { EditIcon } from '../EditIcon/EditIcon';
import { ReviewText } from '../ReviewText/ReviewText';
import { ReviewTexts } from '../ReviewTexts/ReviewTexts';
import { ReviewTitle } from '../ReviewTitle/ReviewTitle';
import * as S from './ExtrasReview.styles';

export const ExtrasReview = ({
  title,
  name,
  emailAddress,
  phoneNumber,
  country,
  homeclub,
  onClick
}: Props) => {
  const leadGolferData = [
    {
      label: 'Name',
      text: name
    },
    {
      label: 'Email Address',
      text: emailAddress
    },
    {
      label: 'Phone Number',
      text: phoneNumber
    },
    {
      label: 'Country of Residence',
      text: country
    },
    {
      label: 'Homeclub',
      text: homeclub
    }
  ];

  return (
    <S.GolferDetailsReviewConatiner>
      <ReviewTitle title={title} />
      <S.SectionContainer>
        <S.GolferHeader>
          <S.GolferTitle>
            <ReviewText reviewText="Lead Golfer" />
          </S.GolferTitle>
          {onClick && <EditIcon onClick={onClick} />}
        </S.GolferHeader>
        <S.GolferDataConatiner>
          <ReviewTexts reviews={leadGolferData} />
        </S.GolferDataConatiner>
      </S.SectionContainer>
    </S.GolferDetailsReviewConatiner>
  );
};

type Props = {
  title: string;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  homeclub: string;
  onClick?: (e: any) => void;
};
