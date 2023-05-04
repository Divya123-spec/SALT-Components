/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './ReviewText.theme';

export const ReviewTextContainer = styled('div')`
  width: auto;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  margin-right: 2rem;
  margin-bottom: 1rem;

  background: ${(props) => theme(props).reviewTextBackgroundColor};
  font-family: ${(props) => theme(props).reviewTextFontFamily};
  font-size: 0.875rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: 0.26px;

  &:nth-child(3n) {
    margin-right: 0;
  }

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      /* margin-top: 1rem; */
    `)};
`;

export const Label = styled('div')`
  width: 100%;
  margin-bottom: 0.5rem;
  color: ${(props) => theme(props).labelColor};

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      margin-bottom: 0.25rem;
    `)};
`;

export const RewiewText = styled('div')`
  width: 100%;
  height: auto;
  word-wrap: break-word;
  color: ${(props) => theme(props).reviewTextColor};
`;
