/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { GolfPackageContext } from '../../../../context/GolfPackageContext';
import * as S from './EditIcon.styles';

export const EditIcon = ({ goToStep, golferId }: Props) =>{ 
  const { onAnyStepBack, setGoToReview, setGolferId } = useContext(GolfPackageContext);
  return (
      <S.EditIcon onClick={() => {if(golferId !== undefined) setGolferId(golferId); setGoToReview(true); onAnyStepBack(goToStep);}}/>
  );};


type Props = {
  goToStep: number;
  golferId?: number;
};