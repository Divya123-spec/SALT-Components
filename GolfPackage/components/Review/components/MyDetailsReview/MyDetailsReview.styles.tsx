/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './MyDetailsReview.theme';

export const MyDetailsReviewContainer = styled('div')`
  height: fit-content;
  width: 100%;
  padding: 0 0 1rem;

  ${(props) =>
      media.lessThan(props, 'medium').then(css`
        height: fit-content;
      `)};
`;

export const ContentContainer = styled('div')`
  height: 100%;
  width: 100%;
  border-bottom: solid 1px ${(props) => theme(props).contentContainerBorderColor};
`;

