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
import * as S from './GolferDetailsReview.styles';

export const GolferDetailsReview = ({ leadGolfer, golfers }: Props) => {
  const leadGolferData = [
    {
      label: 'Name',
      text: `${leadGolfer?.firstName} ${leadGolfer?.lastName}`
    },
    {
      label: 'Email address',
      text: leadGolfer.email
    },
    {
      label: 'Homeclub',
      text: leadGolfer.homeGolfClub || ''
    },
    {
      label: 'Handicap',
      text: leadGolfer.handicap || ''
    }
  ];
  return (
    <S.GolferDetailsReviewConatiner>
      <ReviewTitle title="Golfer details" />
      <S.SectionContainer>
        <S.GolferHeader>
          <S.GolferTitle>
            <ReviewText reviewText="Lead Golfer" />
          </S.GolferTitle>
          <S.CustomIconWrapper>
            <EditIcon goToStep={2} />
          </S.CustomIconWrapper>
        </S.GolferHeader>
        <S.GolferDataConatiner>
          <ReviewTexts reviews={leadGolferData} />
        </S.GolferDataConatiner>
      </S.SectionContainer>
      {golfers[0]?.firstName &&
        golfers.map((golfer, index) => {
          const reviews = [
            {
              label: 'Name',
              text: `${golfer?.firstName} ${golfer?.lastName}`
            },
            {
              label: 'Email address',
              text: golfer.email
            },
            {
              label: 'Homeclub',
              text: golfer.homeGolfClub || ''
            },
            {
              label: 'Handicap',
              text: golfer.handicap || ''
            }
          ];
          return (
            <S.SectionContainer key={`${golfer.firstName}_${index.toString()}`}>
              <S.GolferHeader>
                <S.GolferTitle>
                  <ReviewText reviewText={`Golfer ${index + 1}`} />
                </S.GolferTitle>
                <S.CustomIconWrapper>
                  <EditIcon goToStep={2} />
                </S.CustomIconWrapper>
              </S.GolferHeader>
              <S.GolferDataConatiner>
                <ReviewTexts reviews={reviews} />
              </S.GolferDataConatiner>
            </S.SectionContainer>
          );
        })}
    </S.GolferDetailsReviewConatiner>
  );
};

type GolferDetails = {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  homeGolfClub?: string;
  handicap?: string;
};

type Props = {
  leadGolfer: GolferDetails;
  golfers: GolferDetails[];
};
