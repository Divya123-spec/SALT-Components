/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import { CommerceForm } from '@exo/frontend-components-forms';
import styled, { css } from 'styled-components';
import theme from './CompetitionForm.theme';

export const PressAreaForm = styled(CommerceForm)`
  margin-top: 1rem;
  max-width: 37rem;
  margin: 0 auto;
  padding: 1rem;
  & .bx--dropdown .bx--list-box__field,
  .bx--list-box__menu {
    background-color: ${(props) => theme(props).blueLight20};
  }
  & .bx--date-picker__icon {
    fill: #f4f4f4;
  }
  & .bx--date-picker__input:disabled {
    background-color: ${(props) => theme(props).blueLight20};
    color: ${(props) => theme(props).blueLight20};
  }
`;

export const Headline = styled('h1')`
  font-family: ${(props) => theme(props).headingFont};
  font-size: 1.5rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.92;
  letter-spacing: normal;
  color: ${(props) => theme(props).textColor};

  margin-bottom: 2rem;
`;

export const Description = styled('p')`
  font-family: ${(props) => theme(props).descriptionFont};
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.011rem;
  color: ${(props) => theme(props).textColor};

  margin-bottom: 2rem;
`;

export const DateOfPlayContainer = styled('div')`
  margin-top: 2rem;
  margin-bottom: 2.5rem;

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      margin-top: 2.5rem;
    `)};
`;

export const DateOfPlayInfo = styled('label')`
  font: ${(props) => theme(props).labelFont};
  color: ${(props) => theme(props).activeTertiary};

  margin-bottom: 0.5rem;
`;
