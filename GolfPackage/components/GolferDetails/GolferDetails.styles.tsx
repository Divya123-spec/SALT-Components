/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { FieldRow, Dropdown } from '@exo/frontend-components-forms';
import { Close24 } from '@carbon/icons-react';

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './GolferDetails.theme';

export const GolferContainer = styled('div')`
  margin-bottom: 4rem;

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      margin-bottom: 2.5rem;
  `)};

  .bx--dropdown {
    background-color: ${props => theme(props).blueLight20};
  }


  & input:disabled {
    background-color: ${props => theme(props).blueLight20};
    color: ${props => theme(props).gray70};
  }
`;

export const TitleContainer = styled('div')`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
`;

export const CloseIcon = styled(Close24)`
  color: ${props => theme(props).iconColor};

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled('div')`
  font: ${props => theme(props).golferTitleFont};
  color: ${props => theme(props).fontColor};

  margin-bottom: 1.5rem;
`;

export const CustomFieldRow = styled(FieldRow)`

  ${(props) =>
    media.greaterThan(props, 'medium').then(css`
      margin-bottom: 2rem;
  `)};
`;

export const DetailsFieldRow = styled(FieldRow)`
  margin-bottom: 2rem;
`;
export const StyledDropdown = styled(Dropdown)`
  margin-top: 1.5rem; 
  
`;