/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './TimeOfPlayReview.theme';

export const TimeOfPlayContainer = styled('div')`
  height: fit-content;
  width: 100%;
  padding: 1rem 0;
`;

export const ContentContainer = styled('div')`
  height: 100%;
  width: 100%;
  border-bottom: solid 1px ${(props) => theme(props).contentContainerBorderColor};
`;

export const InformationContainer = styled('div')`
  height: fit-content;
  width: 30.5rem;
  font-family: ${(props) => theme(props).informationFontFamily};;
  font-size: 0.875rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: 0.16px;
  margin-bottom: 0.5rem;

  &.day-container {
    margin-top: 2rem;
  }

  &:last-child {
    margin-bottom: 1rem;
  }
 

  ${(props) =>
      media.lessThan(props, 'medium').then(css`
        width: 100%;
  `)};
`;

export const AdditionalText = styled('span')`
    font-weight: bold;
`;
