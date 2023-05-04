/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { CommerceForm, FieldRow, FormFooter, Dropdown } from '@exo/frontend-components-forms';
import { media } from '@exo/frontend-common-style-utils';
import theme from './EditGolferDetails.theme';

export const MyDetailsForm = styled(CommerceForm)`
& .golf_dropdown{
  & .bx--dropdown {
    background-color: ${props => theme(props).blueLight20};
  }
  & .bx--list-box__menu{
    background-color: inherit;
  }

  & .bx--date-picker__icon {
    fill: #f4f4f4;
  }
  & .bx--date-picker__input:disabled{
    background-color: ${props => theme(props).blueLight20};
    color:${props => theme(props).gray70};
    
  }
}
`;

export const FormContainer = styled('div')`
width:100%;
`;

export const Heading = styled('h1')`
margin-top: 35px;
padding-bottom: 2rem;
font: ${(props) => theme(props).headingFont};
color: ${(props) => theme(props).headingFontColor};
${(props) => media.lessThan(props, 'large').then(css`
  font: ${theme(props).mobileHeadingFont};
`)};
`;

export const Styledlabel = styled('label')`
  width: 200px;
  display: flex;
  height: 26px;
  margin: 0px 100px 5px 0px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.86;
  letter-spacing: normal;
  color: #6e6f70;
`;

export const DetailsFieldRow = styled(FieldRow)`
  margin-bottom: 2rem;
`;


export const DetailsFormFooter = styled(FormFooter)`
  padding-top: 2.5rem;
`;

export const StyledDropdown = styled(Dropdown)`
  margin-top: 1.5rem; 
`;

export const TextInputWrapper = styled('div')`
width: 218px;
height: 48px;
`;

export const StyledButton = styled('div')`
${(props) => media.lessThan(props, 'large').then(css`
   width:144px;
   margin-top: -30px;
`)}
`;
