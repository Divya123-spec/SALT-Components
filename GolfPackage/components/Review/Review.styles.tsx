/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import { ButtonUI } from '../../../../index';
import theme from './Review.theme';

export const ReviewAndSubmitContainer = styled('div')`
  height: fit-content;
  max-width: 37rem;

  & .backButton {
    ${(props) =>
      media.lessThan(props, 'large').then(css`
        margin-top: 1.5rem;
      `)};
    justify-content: flex-end;
  }
  & .bx--btn--ghost {
    color: ${(props) => theme(props).linkColor};
    text-decoration: underline;
    justify-content: flex-end;
  }
`;

export const Header = styled('div')`
  height: 1.375rem;
  max-width: 37rem;
  font-family: ${(props) => theme(props).headerFontFamily};
  font-size: 1.5rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.92;
  letter-spacing: normal;
  color: ${(props) => theme(props).headerFontColor};
  margin-bottom: 3.5rem;

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      margin-bottom: 2.5rem;
      font-size: 1.25rem;
    `)};
`;

export const PageContentContainer = styled('div')`
  height: fit-content;
  width: 100%;
  margin-bottom: 5rem;
  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      margin-bottom: 2.5rem;
    `)};
`;

export const Button = styled(ButtonUI)``;

export const CustomSpacer = styled('div')`
  padding-bottom: 0.5rem;
`;
