/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import { CommerceForm, Dropdown, FieldRow } from '@exo/frontend-components-forms';
import styled, { css } from 'styled-components';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import theme from './Extras.theme';

export const Extras = styled(CommerceForm)`
  & .bx--dropdown .bx--list-box__field,
  .bx--list-box__menu {
    background-color: ${(props) => theme(props).blueLight20};
  }
`;

export const Heading = styled('h1')`
  padding-bottom: 2rem;
  font: ${(props) => theme(props).headingFont};
  color: ${(props) => theme(props).headingFontColor};
  ${(props) => media.lessThan(props, 'large').then(css`
    font: ${theme(props).mobileHeadingFont};
`)};
`;

export const DetailsFieldRow = styled(FieldRow)`
  margin-bottom: 2rem;
`;

export const StyledDropdown = styled(Dropdown)`
  margin-top: 2rem;   
`;

export const Intro = styled('p')`
  padding-bottom: 2rem;
`;

export const BackButton = styled(ButtonUI)`
  color: ${(props) => theme(props).linkColor};
  text-decoration: underline;

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      justify-content: end;
      margin-top: 2rem;
    `)};
`;
