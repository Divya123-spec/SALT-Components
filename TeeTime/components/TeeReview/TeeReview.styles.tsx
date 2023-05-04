/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './TeeReview.theme';

export const GolferDetailsReviewConatiner = styled('div')`
  height: fit-content;
  width: 100%;
  padding: 1rem 0 0 0;
`;

export const SectionContainer = styled('div')`
  height: auto;
  width: 100%;
  border-bottom: solid 1px ${(props) => theme(props).sectionContainerBorderColor};
  padding-top: 1rem;
  margin-bottom: 1rem;
`;

export const GolferTitle = styled('div')`
  width: 30.5rem;
  display: inline-block;
  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      width: 16.5rem;
    `)};
`;

export const GolferDataConatiner = styled('div')`
  height: 100%;
  width: 100%;
  margin: 0;
`;

export const GolferHeader = styled('div')`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CustomTeeTimeTitle = styled('div')`
  height: 1.5rem;
  width: 30.5rem;
  display: inline-block;
  font-family: ${(props) => theme(props).reviewTitleFontFamily};
  font-size: 1rem;
  font-weight: normal;
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
