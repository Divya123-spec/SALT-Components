/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './ReviewTitle.theme';

export const ReviewTitle = styled('div')`
  height: 1.5rem;
  width: 30.5rem;
  display: inline-block;
  font-family: ${(props) => theme(props).reviewTitleFontFamily};
  font-size: 1rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${(props) => theme(props).reviewTitleFontColor};

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      width: 16.5rem;
    `)};
`; 