/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { EditIcon } from '../EditIcon/EditIcon';
import { RemoveIcon } from '../RemoveIcon/RemoveIcon';
import { ReviewTexts } from '../ReviewTexts/ReviewTexts';
import * as S from './TeeReview.styles';

export const TeeReview = ({
  id,
  title,
  course,
  date,
  teeTime,
  adultGolfers,
  youngGolfers,
  otherAvailability,
  onClick,
  onRemoveTee
}: Props) => {
  const leadGolferData = [
    {
      label: 'Course',
      text: course
    },
    {
      label: 'Date',
      text: date
    },
    {
      label: 'Tee Time',
      text: teeTime
    },
    {
      label: 'Adult Golfers',
      text: adultGolfers
    },
    {
      label: 'Golfers under 16',
      text: youngGolfers
    },
    {
      label: 'Other Availability',
      text: otherAvailability
    }
  ];

  return (
    <S.GolferDetailsReviewConatiner key={`${teeTime}_${course}`}>
      <S.GolferHeader>
        <S.CustomTeeTimeTitle>{title}</S.CustomTeeTimeTitle>
        {onClick && <EditIcon onClick={onClick} />}
        {id !== Number(0) && <RemoveIcon onClick={onRemoveTee} />}
      </S.GolferHeader>
      <S.SectionContainer>
        <S.GolferDataConatiner>
          <ReviewTexts reviews={leadGolferData} />
        </S.GolferDataConatiner>
      </S.SectionContainer>
    </S.GolferDetailsReviewConatiner>
  );
};

type Props = {
  id: any;
  title: string;
  course: string;
  date: string;
  teeTime: string;
  adultGolfers: string;
  youngGolfers: string;
  otherAvailability: string;
  onClick?: (e: any) => void;
  onRemoveTee?: (e: any) => void;
};
