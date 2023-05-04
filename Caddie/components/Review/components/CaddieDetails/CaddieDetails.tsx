/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewHeader } from '../ReviewHeader/ReviewHeader';
import * as S from './CaddieDetails.styles';
import { ReviewDivided } from '../ReviewTexts/ReviewDivided';
import { ReviewTexts } from '../ReviewTexts/ReviewTexts';

export const CaddieDetails = ({ additionalInformation, teeTime }) => {

  const labels = ['Tee time', 'Course', 'Date', 'Caddies Requested'];
  const texts: Array<any> = [];
  teeTime.map((item, idx) => texts.push({
    id: { data: `Tee time ${idx + 1}` },
    tee_time: { data: `Tee time ${idx + 1}` },
    course: { data: item?.course },
    date: { data: item?.date },
    caddies: item?.numberOfCaddies !== Number(0) ? { data: item?.numberOfCaddies } : { data: 'No caddies requested' }
  }));
  const notes = [
    {
      label: 'Additional Notes',
      text: additionalInformation
    }
  ];
  return (
    <S.ExtrasReviewContainer>
      <S.ContentContainer>
        <ReviewHeader title="Caddie details" goToStep={1} />
        <ReviewDivided label={labels} text={texts} key={'caddie_labels'} />
        <ReviewTexts reviews={notes} />

      </S.ContentContainer>
    </S.ExtrasReviewContainer>
  );
};
