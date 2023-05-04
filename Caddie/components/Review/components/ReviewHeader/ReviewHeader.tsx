/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { EditIcon } from '../EditIcon/EditIcon';
import { ReviewTitle } from '../ReviewTitle/ReviewTitle';
import * as S from './ReviewHeader.styles';


export const ReviewHeader = ({ title, goToStep }: Props) => (
  <S.ReviewHeaderContainer>
    <ReviewTitle title={title} />
    {goToStep !== undefined && <EditIcon goToStep={goToStep} />}
  </S.ReviewHeaderContainer>
);

type Props = {
  title: string;
  goToStep?: number;
};