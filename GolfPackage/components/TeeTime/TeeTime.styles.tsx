/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import ReactLink from '@exo/frontend-common-link';
import { media } from '@exo/frontend-common-style-utils';
import { CommerceForm, Dropdown } from '@exo/frontend-components-forms';
import styled, { css } from 'styled-components';
import theme from './TeeTime.theme';

export const TeeTime = styled(CommerceForm)`

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
      color:${props => theme(props).blueLight20};
      
    }
  & .formButtons {
    padding-top: 5rem;
    justify-content: space-between;
  }
  & .backButton {
    ${(props) => media.lessThan(props, 'large').then(css`
            margin-top:1.5rem`
)};
    justify-content: flex-end;
  }
  & .bx--btn--ghost {
    color: ${(props) => theme(props).linkColor};
    text-decoration: underline;
    justify-content: flex-end;
  }
`;
export const HeadlineDescription = styled('p')`
  color: ${props => theme(props).headingFontColor};
  font: ${props => theme(props).headlinedescriptionFont};
  margin-bottom: 2.5rem;
`;
export const Heading = styled('h1')`
  padding-bottom: 2rem;

  font: ${(props) => theme(props).font};
  ${(props) => media.lessThan(props, 'large').then(css`
    font: ${theme(props).mobileHeadingFont};
`)};
`;
export const Title = styled('h3')`
  padding: 2.5rem 0 1.5rem 0;
  font: ${(props) => theme(props).titleFont};
  letter-spacing: 0.01rem;
`;
export const Description = styled('div')`
  color: ${(props) => theme(props).goldLight80};
  font: ${(props) => theme(props).descriptionFont};
  
  line-height: 1.5rem;
  letter-spacing: 0.01rem;
`;
export const Link = styled(ReactLink)`
  color: ${(props) => theme(props).linkColor};
  text-decoration: underline;
`;
export const FormItem = styled('div')`
  font: ${(props) => theme(props).descriptionFont};
  color: ${(props) => theme(props).goldLight80};
  padding-top: 1rem;

  & .bx--fieldset {
    margin-bottom: 2.5rem;
  }
`;

export const StyledDropdown = styled(Dropdown)`
  margin-top: 1.5rem; 
  
`;
export const TeeTitle = styled('h3')`
  font: ${props => theme(props).golferTitleFont};
  color: ${props => theme(props).fontColor};

  margin-bottom: 1.5rem;
`;