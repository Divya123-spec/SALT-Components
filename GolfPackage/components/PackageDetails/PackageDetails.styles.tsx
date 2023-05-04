/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import { CommerceForm, Dropdown } from '@exo/frontend-components-forms';
import styled, { css } from 'styled-components';
import theme from './PackageDetails.theme';

export const PackageDetails = styled(CommerceForm)`
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

export const Heading = styled('h1')`
  padding-bottom: 2rem;
  font: ${(props) => theme(props).headingFont};
  color: ${(props) => theme(props).headingFontColor};
  ${(props) => media.lessThan(props, 'large').then(css`
    font: ${theme(props).mobileHeadingFont};
`)};
`;
export const HeadlineDescription = styled('p')`
  color: ${props => theme(props).headingFontColor};
  font: ${props => theme(props).headlinedescriptionFont};
  margin-bottom: 2.5rem;
`;
export const Description = styled('p')`
  color: ${props => theme(props).descriptionColor};
  font: ${props => theme(props).descriptionFont};
  letter-spacing: 0.016rem;
  margin-bottom: 1.5rem;
`;
export const StyledDropdown = styled(Dropdown)`
  margin-top: 1.5rem; 
  
`;
