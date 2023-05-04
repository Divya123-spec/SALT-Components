/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewHeader } from '../ReviewHeader/ReviewHeader';
import * as S from './TeeTimeReview.styles';
import { ReviewDivided } from '../ReviewTexts/ReviewDivided';

export const TeeTimeReview = ({ teeTime }: Props) => {
  const labels = ['Tee number', 'Tee time', 'Date of play', 'Other availability'];
  const texts: Array<any> = [];
  teeTime.map((item, idx) =>
    texts.push({
      id: { data: `Tee time ${idx + 1}` },
      teeNr: { data: `Tee time ${idx + 1}` },
      tee_time: { data: item?.timeOfPlay },
      date: { data: item?.dateOfPlay },
      other: { data: `${item?.otherAvailabilityStart}-${item?.otherAvailabilityEnd}` }
    })
  );

  return (
    <S.TeeTimeReview>
      <S.ContentContainer>
        <ReviewHeader title="Tee time details" goToStep={1} />
        {texts.length > 0 && <ReviewDivided label={labels} text={texts} key={'tee_time_review_header'} />}
      </S.ContentContainer>
    </S.TeeTimeReview>
  );
};

type Props = {
  teeTime: any[];
};
