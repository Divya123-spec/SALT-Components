/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './MyProfileHeader.styles';


export const MyProfileHeader = ({ title, handleEdit }: Props) =>
(
  <S.ProfileHeaderContainer>
    <S.HeaderTitle>{title}</S.HeaderTitle>
    <S.StyledButton onClick={handleEdit}>
      <S.EditIcon />
    </S.StyledButton>
  </S.ProfileHeaderContainer>
);

type Props = {
  title: string;
  handleEdit: any;
};