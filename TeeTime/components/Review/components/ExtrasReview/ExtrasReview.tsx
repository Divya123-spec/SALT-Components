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
import * as S from './ExtrasReview.styles';

export const ExtrasReview = ({ teeTime }) => {
  const notes = [
    {
      label: 'Additional Notes',
      text: teeTime?.optionalDetails
    }
  ];
  return (
    <S.ExtrasReviewContainer>
      <S.ContentContainer>
        <S.GolferHeader>
          <ReviewTitle title={'Extras & add ons'} />
          <EditIcon goToStep={2} />
        </S.GolferHeader>
        <ReviewTexts reviews={notes} />
      </S.ContentContainer>
    </S.ExtrasReviewContainer>
  );
};
