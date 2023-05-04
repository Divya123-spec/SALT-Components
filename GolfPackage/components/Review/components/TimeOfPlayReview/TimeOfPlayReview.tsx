/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewHeader } from '../ReviewHeader/ReviewHeader';
import * as S from './TimeOfPlayReview.styles';

export const TimeOfPlayReview = ({
  playDay,
  playStartingHour,
  playEndingHour,
  darkTimesAvailability,
  isAnytime
}: Props) => (
  <S.TimeOfPlayContainer>
    <S.ContentContainer>
      <ReviewHeader title="Time Of Play" goToStep={1} />
      <S.InformationContainer className="day-container">
        I am entering the 48 hour ballot to play the Old Course on{' '}
        <S.AdditionalText>{playDay}</S.AdditionalText>
      </S.InformationContainer>
      {!isAnytime && (
        <S.InformationContainer>
          I am willing to play between <S.AdditionalText>{playStartingHour}</S.AdditionalText> and{' '}
          <S.AdditionalText>{playEndingHour}</S.AdditionalText>
        </S.InformationContainer>
      )}
      <S.InformationContainer>
        {darkTimesAvailability && (
          <>
            I <S.AdditionalText>{darkTimesAvailability}</S.AdditionalText> like to be considered for
            the Dark Times ballot
          </>
        )}
      </S.InformationContainer>
    </S.ContentContainer>
  </S.TimeOfPlayContainer>
);

type Props = {
  playDay: string;
  playStartingHour?: string;
  playEndingHour?: string;
  darkTimesAvailability: string;
  isAnytime: boolean;
};
