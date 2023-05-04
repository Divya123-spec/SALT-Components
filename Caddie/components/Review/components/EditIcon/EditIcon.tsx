/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { CaddieContext } from '../../../../context/CaddieContext';
import * as S from './EditIcon.styles';

export const EditIcon = ({ goToStep }: Props) => {
  const { onAnyStepBack, setGoToReview } = useContext(CaddieContext);
  return (
    <S.EditIcon onClick={() => { setGoToReview(true); onAnyStepBack(goToStep); }} />
  );
};


type Props = {
  goToStep: number;
  golferId?: number;
};