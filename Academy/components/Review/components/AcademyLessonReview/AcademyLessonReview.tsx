/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewHeader } from '../ReviewHeader/ReviewHeader';
import * as S from './AcademyLessonReview.styles';
import { ReviewTexts } from '../ReviewTexts/ReviewTexts';

export const AcademyLessonReview = ({ date, instructor, handicap, experience, goals, other }) => {

  const reviews = [
    {
      label: 'Date of lesson',
      text: date
    },
    {
      label: 'Requested Instructor',
      text: instructor || '-'
    },
    {
      label: 'Handicap',
      text: handicap
    },
    {
      label: 'Experience',
      text: experience || '-'
    },
    {
      label: 'Lesson Goals',
      text: goals
    },
    {
      label: 'Other information',
      text: other || '-'
    }
  ];

  return (
    <S.MyDetailsReviewContainer>
      <S.ContentContainer>
        <ReviewHeader title="Academy lesson details" goToStep={0} />
        <ReviewTexts reviews={reviews} />
      </S.ContentContainer>
    </S.MyDetailsReviewContainer>
  );
};

