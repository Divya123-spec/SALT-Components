/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/


import { media } from '@exo/frontend-common-style-utils';
import { Dropdown, FieldRow } from '@exo/frontend-components-forms';
import styled, { css } from 'styled-components';
import { ButtonUI } from '../../../../index';
import theme from './GolferInformation.theme';

export const Heading = styled('h1')`
padding-bottom: 2rem;
margin-top: 30px;
font: ${(props) => theme(props).headingFont};
color: ${(props) => theme(props).headingFontColor};
${(props) => media.lessThan(props, 'large').then(css`
  font: ${theme(props).mobileHeadingFont};
`)};
`;

export const DetailsFieldRow = styled(FieldRow)`
  margin-bottom: 0.5rem;
`;

export const StyledDropdown = styled(Dropdown)`
  margin-top: 1.5rem; 
  
`;

export const GolferContainer = styled('div')`
width: 100%;
height:fit-content;

`;

export const Styledlabel = styled('label')`
  width: 200px;
  display: flex;
  height: 26px;
  margin: 10px 100px 5px 0px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.86;
  letter-spacing: normal;
  color: #6e6f70;
`;

export const Styledspan = styled('span')`
  width: 200px;
  height: 26px;
  margin: 5px 100px 0px 0px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: normal;
  color: var(--white);
`;

export const Button = styled(ButtonUI)``;

export const StyledLoading = styled('h4')`
  margin: 20px 0 0 5px;
  font-family: Roboto;
  color: #87715a;
  font-weight: bold;
`;

