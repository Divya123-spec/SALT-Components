/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';
import theme from './Review.theme';

export const Review = styled('div')`
`;

export const Heading = styled('h1')`
  padding-bottom: 2rem;
  font: ${(props) => theme(props).headingFont};
  color: ${(props) => theme(props).headingFontColor};
  ${(props) =>
    media.lessThan(props, 'large').then(css`
      font: ${theme(props).mobileHeadingFont};
    `)};
`;

export const NotificationSpacer = styled('div')`
  padding-bottom: 4rem;
  ${props=>media.lessThan(props, 'medium').then(css`
    padding-bottom: 1.5rem;
  `)}
`;
