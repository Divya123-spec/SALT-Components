/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { CommerceForm, Dropdown } from '@exo/frontend-components-forms';


import { media } from '@exo/frontend-common-style-utils';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import theme from './BillingAddress.theme';

// export const StyledLoading = styled('h5')`
// height:200px;
// background-color: #f4f5f5;
// padding-left: 39px;
// margin-bottom: -65px;
// color: var(--primary-blue-01-base-primary);
// `;
export const Heading = styled('h1')`
padding-bottom: 2rem;
font: ${(props) => theme(props).headingFont};
color: ${(props) => theme(props).headingFontColor};
${(props) => media.lessThan(props, 'large').then(css`
  font: ${theme(props).mobileHeadingFont};
`)};
`;

export const FormWrapper = styled('div')`
  width: 60%;
  height: auto;
  margin: auto;
  padding-bottom: 40px;
  ${props => media.lessThan(props, 'large').then(css`
  width: 80%;
  `)}
  ${props => media.lessThan(props, 'medium').then(css`
  width:100%;
  `)}
`;



export const FormHeading = styled('h1')`
height: 24px;
margin-top: 50px;
padding-bottom:15px;
padding-left: 32px;
font-family: Roboto;
font-size: 21px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.14;
letter-spacing: 0.33px;
color: var(--primary-blue-01-base-primary);
  ${(props) => media.lessThan(props, 'medium').then(css`
    padding-left: 28px;
  `)}
`;

export const MyDetailsForm = styled(CommerceForm)`
width: 100%;
padding-left: 32px;
margin-top: 20px;
& .golf_dropdown{
    & .bx--dropdown {
      background-color: #1f3038;
    }
    & .bx--list-box__menu{
      background-color: #1f3038;
    }
  
    & .bx--date-picker__icon {
      fill: #f4f4f4;
    }
    & .bx--date-picker__input:disabled{
      background-color: #1f3038;
      color:#525252;
      
    }
  }
  ${(props) => media.lessThan(props, 'medium').then(css`
    width:100%
    margin:20px 0px;
    padding-right:20px;
    padding-left:20px;
    padding-bottom: 50px;
  `)}
`;

export const FormContainer = styled('div')`
height:auto;
display:block;
`;

export const StyledInputWrapper = styled('div')`
width: 600px;
height: 68px;
margin: 20px 0 30px 0;
display:flex;
  ${props => media.lessThan(props, 'medium').then(css`
    width: 100%;
    display:block;
    margin: 20px 0 85px 0;
  `)}

`;

export const TextWrapper = styled('div')`
width: 256px;
height: 68px;
margin: 20px 32px 20px 0;
  ${(props) => media.lessThan(props, 'medium').then(css`
  width: 100%;
  margin:20px 0px 20px 10px;
  padding-right:20px;
  `)}
`;

export const BigTextWrapper = styled('div')`
width: 544px;
height: 68px;
margin: 40px 32px 20px 0;
  ${(props) => media.lessThan(props, 'medium').then(css`
    width: 100%;
    margin:20px 0px 20px 10px;
    padding-right:20px;
    padding-top:20px;
  `)}
  ${(props) => media.lessThan(props, 'small').then(css`
  width: 265px;
  `)}
`;

export const PhoneWrapper = styled('div')`
width: 600px;
height: 68px;
margin: 20px 0 30px 0;
display:flex;

  & .bx--dropdown {
    background-color: #1f3038;
  }

  ${props => media.lessThan(props, 'medium').then(css`
    width: 100%;
    display:block;
    margin: 20px 0 85px 0;
    padding-bottom: 20px;
  `)}

`;

export const FirstTextWrapper = styled('div')`
width: 214px;
height: 68px;
margin: 0px 32px 20px 0;
${(props) => media.lessThan(props, 'medium').then(css`
width: 100%;
margin:20px 0px 20px 10px;
padding-right:20px;
padding-top:20px;
`)}
  ${(props) => media.lessThan(props, 'small').then(css`
  width: 265px;
  `)}
`;

export const SecondTextWrapper = styled('div')`
width: 297px;
height: 68px;
margin-top: 3px;
    ${(props) => media.lessThan(props, 'medium').then(css`
    width: 100%;
    margin:20px 0px 40px 10px;
    padding-right:20px;
    padding-top:30px;
    `)}
`;

export const AllAddressWrapper = styled('div')`
margin-top: 0px;
  ${(props) => media.lessThan(props, 'medium').then(css`
  padding-top:10px;
  `)}
  ${(props) => media.lessThan(props, 'small').then(css`
  padding-top:10px;
  `)}
`;

export const AddressInputWrapper = styled('div')`
width: 544px;
height: 68px;
margin: 0px 32px 20px 0;
  ${(props) => media.lessThan(props, 'medium').then(css`
    width: 100%;
    margin:30px 0px 10px 10px;
    padding-right:20px;
    padding-top:20px;
  `)}
  ${(props) => media.lessThan(props, 'small').then(css`
  width: 265px;
  `)}
`;

export const CountryWrapper = styled('div')`
width: 600px;
height: auto;
margin: 0px 0 25px 0;
display:flex;
  ${props => media.lessThan(props, 'medium').then(css`
    width: 100%;
    display:block;
    margin: 20px 0 0px 0;
    padding-top:10px;
  `)}

`;

export const CountryCityWrapper = styled('div')`
width: 256px;
height: 68px;
margin: 3px 32px 0px 0px;
  ${(props) => media.lessThan(props, 'medium').then(css`
  width: 100%;
  margin:20px 0px 20px 10px;
  padding-right:20px;
  `)}
`;

export const CountryCountryWrapper = styled('div')`
width: 256px;
height: 68px;
margin: 0px 32px 0px 0;
& .bx--dropdown {
  background-color: #1f3038;
}
  ${(props) => media.lessThan(props, 'medium').then(css`
  width: 100%;
  margin:20px 0px 20px 10px;
  padding-right:20px;
  `)}
`;

export const PostCodeWrapper = styled('div')`
width: 256px;
height: auto;
margin: 0px 0 30px 0;
  ${props => media.lessThan(props, 'medium').then(css`
    width: 100%;
    margin: 30px 0px 20px 10px;
    padding-right:20px;
  `)}

`;


export const ConditionSpan = styled('span')`
display: block;
width: 100%;
margin: 40px 0px 20px 0px;
height: auto;
font-family: Roboto;
font-size: 16px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.5;
letter-spacing: 0.25px;
color: var(--primary-blue-01-base-primary);
  ${props => media.lessThan(props, 'large').then(css`
  width: 90%;
  `)}
  ${props => media.lessThan(props, 'medium').then(css`
  width: 100%;
  margin: 30px 0px 20px 10px;
  padding-right:20px;
  `)}
  ${props => media.lessThan(props, 'small').then(css`
  width: 265px;
  font-size: 15px;
  `)}
`;

export const CheckboxWrapper = styled('div')`
// width: 288px;
// height: 68px;
// margin: 20px 0;
// padding-top: 20px;
font-family:Roboto;
  ${props => media.lessThan(props, 'medium').then(css`
  width: 100%;
  margin: 30px 0px 20px 10px;
  padding-right:20px;
  `)}
`;

export const ButtonWrapper = styled('div')`
width: 289px;
height: 48px;
margin-top: 25px;
margin-bottom: 40px;

  ${props => media.lessThan(props, 'medium').then(css`
  width: 100%;
  margin: 30px 0px 20px 10px;
  padding-right:20px;
  padding-bottom:40px;
  `)}
`;

export const styledButton = styled(ButtonUI)`
height: 48px;
font-family: Roboto;
`;

export const StyledDropdown = styled(Dropdown)`
  margin-top: 1.5rem; 
  background-color: #1f3038;
  & .golf_dropdown{
    & .bx--dropdown {
      background-color: #1f3038;
    }
  }
`;