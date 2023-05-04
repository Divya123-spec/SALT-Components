/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import { Edit24 } from '@carbon/icons-react';
import theme from './MyProfileHeader.theme';


export const ProfileHeaderContainer = styled('div')`
  width: 100%;
  height: fit-content;
  display:flex;
  margin-top: 30px;
  justify-content: space-between;
  align-items: center;
  ${(props) =>
        media.lessThan(props, 'medium').then(css`
          margin-bottom: 0;
          justify-content: space-between;
        `)};
`;

export const HeaderTitle = styled('h1')`
width:100%;
padding-bottom: 2rem;
padding-left:9px;
margin-top:5px;
font: ${(props) => theme(props).headingFont};
color: ${(props) => theme(props).headingFontColor};
${(props) => media.lessThan(props, 'large').then(css`
  font: ${theme(props).mobileHeadingFont};
`)};
`;

export const EditIcon = styled(Edit24)`
  ${(props) => media.lessThan(props, 'large').then(css`
    margin: 0;
  `)};
  &:hover {
    cursor: pointer;
  }
`;

export const StyledButton = styled('button')`
background-color: transparent;
color:white;
border:none;
`;