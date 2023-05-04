/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewHeader } from '../ReviewHeader/ReviewHeader';
import * as S from './MyDetailsReview.styles';
import { ReviewTexts } from '../ReviewTexts/ReviewTexts';

export const MyDetailsReview = ({ name, email, phone, address }: Props) => {
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
      label: 'Address',
      text: address || ''
    }
  ];

  return (
    <S.MyDetailsReviewContainer>
      <S.ContentContainer>
        <ReviewHeader title="My Details" goToStep={1} />
        <ReviewTexts reviews={reviews} />
      </S.ContentContainer>
    </S.MyDetailsReviewContainer>
  );
};

type Props = {
  name: string;
  email?: string;
  phone?: string;
  country?: string;
  address?: string;
};
