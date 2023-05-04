/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/


import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';
import theme from './PurchaseHistory.theme';




export const Heading = styled('h1')`
margin-top: 35px;
padding-bottom: 2rem;
font: ${(props) => theme(props).headingFont};
color: ${(props) => theme(props).headingFontColor};
${(props) => media.lessThan(props, 'large').then(css`
  font: ${theme(props).mobileHeadingFont};
`)};
`;

export const StyledLoading = styled('h4')`
  margin: 20px 0 0 5px;
  font-family: Roboto;
  color: #87715a;
  font-weight: bold;
`;