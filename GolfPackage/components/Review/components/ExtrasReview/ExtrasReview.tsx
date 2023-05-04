/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewHeader } from '../ReviewHeader/ReviewHeader';
import * as S from './ExtrasReview.styles';
import { ReviewDivided } from '../ReviewTexts/ReviewDivided';
import { ReviewTexts } from '../ReviewTexts/ReviewTexts';

export const ExtrasReview = ({ extras, teeTime }) => {

  const labels = ['Tee time', 'Course', 'Date', 'Caddies Requested'];
  const texts: Array<any> = [];
  teeTime.map((item, idx) => texts.push({
    id: { data: `Tee time ${idx + 1}` },
    tee_time: { data: `Tee time ${idx + 1}` },
    course: { data: item?.courseRequested },
    date: { data: item?.dateOfPlay },
    caddies: extras.nrOfCaddies[idx].nrOfCaddies !== 0 ? { data: extras.nrOfCaddies[idx].nrOfCaddies } : { data: 'No caddies requested' }
  }));
  const notes = [
    {
      label: 'Additional Notes',
      text: extras?.specificCaddieRequest
    }
  ];
  return (
    <S.ExtrasReviewContainer>
      <S.ContentContainer>
        <ReviewHeader title="Extras & add ons" goToStep={3} />
        <ReviewDivided label={labels} text={texts} key={'extra_labels'} />
        <ReviewTexts reviews={notes} />

      </S.ContentContainer>
    </S.ExtrasReviewContainer>
  );
};
