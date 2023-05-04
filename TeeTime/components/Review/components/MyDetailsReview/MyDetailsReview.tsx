/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewTexts } from '../../../ReviewTexts/ReviewTexts';
import { ReviewTitle } from '../../../ReviewTitle/ReviewTitle';
import { EditIcon } from '../EditIcon/EditIcon';
import * as S from './MyDetailsReview.styles';

export const MyDetailsReview = ({ name, email, phone, country, homeClub }: Props) => {
  const reviews = [
    {
      label: 'Name',
      text: name
    },
    {
      label: 'Email address',
      text: email
    },
    {
      label: 'Phone number',
      text: phone
    },
    {
      label: 'Country of residence',
      text: country
    },
    {
      label: 'Adress',
      text: homeClub || ''
    }
  ];

  return (
    <S.MyDetailsReviewContainer>
      <S.ContentContainer>
        <S.GolferHeader>
          <ReviewTitle title="My Details" />
          <EditIcon goToStep={1} />
        </S.GolferHeader>
        <ReviewTexts reviews={reviews} />
      </S.ContentContainer>
    </S.MyDetailsReviewContainer>
  );
};

type Props = {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  homeClub?: string;
};
