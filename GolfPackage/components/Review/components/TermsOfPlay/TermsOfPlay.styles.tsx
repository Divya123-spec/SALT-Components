/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './TermsOfPlay.theme';

export const TermsOfPlayContainer = styled('div')`
  height: fit-content;
  width: 100%;
  padding: 1rem 0;

  & svg {
    display: none;
  }
`;

export const ContentContainer = styled('div')`
  height: 100%;
  width: 100%;
`;

export const Subtitle = styled('div')`
  font-family: ${(props) => theme(props).subtitleFontFamily};
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.32px;
  color: ${(props) => theme(props).subtitleFontColor};
  margin-bottom: 0.5rem;

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      margin-top: 1rem;
    `)};
`;