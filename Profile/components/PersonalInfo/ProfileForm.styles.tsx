/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/


import { media } from '@exo/frontend-common-style-utils';
import { CommerceForm, Dropdown, FieldRow, FormFooter } from '@exo/frontend-components-forms';
import styled, { css } from 'styled-components';
import theme from './ProfileForm.theme';

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
export const PersonalContainer = styled('div')`
width: 100%;
height:fit-content;

`;

export const Heading = styled('h1')`
padding-bottom: 0.5rem;
padding-left: 9px;
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

export const Styledlabel = styled('label')`
  width: 200px;
  display: flex;
  height: 26px;
  margin: 10px 100px 5px 10px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.86;
  letter-spacing: normal;
  color: #6E6F70;
`;
export const Styledspan = styled('span')`
  width: 200px;
  float: left;
  margin: 5px 100px 0px 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: normal;
  color: var(--white);
  font-family: Roboto;	
  font-size: 16px;
`;

export const StyledTabs = styled('div')`
  margin-top: -80px;
`;

export const ProfileWrapper = styled('div')`
position:relative;
top: -70px;
`;

export const imagewrapper = styled('div')`
margin-top:9%;
margin-left:5%;


& .Preview{

  height: 200px;
  width: 200px;
  cursor:pointer;
  object-fit: contain;
  image-rendering: smooth;
  image-rendering: high-quality;  
  image-rendering: -webkit-optimize-contrast;
}
`;


export const errormessage = styled('span')`
display: inline-block;
margin-top: 12px;
font-size: small;
width: 65%;
color:#ff8389;
`;
export const StyledLoading = styled('h4')`
  margin: 20px 0 0 5px;
  font-family: Roboto;
  color: #87715a;
  font-weight: bold;
`;
export const DetailsFormFooter = styled(FormFooter)`
  padding-top: 2.5rem;
`;


export const TextInputWrapper = styled('div')`
width: 218px;
height: 48px;
padding-left: 9px;
`;

export const DisplayTextInputWrapper = styled('div')`
width: 218px;
height: 48px;
padding-left: 9px;
& .bx--text-input:disabled {
  background-color: ${props => theme(props).blueLight20} ;
  }
`;

export const StyledButton = styled('div')`
${(props) => media.lessThan(props, 'large').then(css`
   width:144px;
   margin-top: -30px;
`)}
`;

export const DateInputWrapper = styled('div')`
.bx--date-picker-input__wrapper {
  width: 73.3%;
  padding-left: 9px;
}
`;


export const DropdownWrapper = styled('div')`
& .bx--dropdown{
  background-color: ${props => theme(props).blueLight20};
}

`;

export const MyProfile = styled('label')`
  width: 191px;
  height: 26px;
  margin: -50px 0 0 23px;
  font-family: PlayfairDisplay;
  font-size: 42px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.65;
  letter-spacing: normal;
  color:#87715a;

    ${(props) => media.lessThan(props, 'large').then(css`
      margin-left: 10px;
    `)}

`;
export const DisplayName = styled('div')`
margin-bottom: 0.5rem;
`;    
export const EmptySpace = styled('div')`
display:none;
`;

export const StyledDisplaylabel = styled('label')`
  width: 200px;
  display: flex;
  height: 26px;
  margin: 10px 100px 5px 10px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.86;
  letter-spacing: normal;
  color: #6E6F70;
`;
export const StyledDisplayspan = styled('span')`
  width: 200px;
  margin: 5px 100px 0px 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: normal;
  color: var(--white);
  font-family: Roboto;	
  font-size: 16px;
`;

export const DisplayNamedisplay = styled('div')`
margin-bottom: 0.5rem;
`;

export const CheckboxGroupDescription = styled('p')`
  font-family: ${props=>theme(props).descriptionFont};
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch:normal;
  font-style:normal;
  line-height: 1.33;
  letter-spacing: 0.02rem;
 
`;
export const StyledDisplaycheckbox = styled('span')`
display: flex;
height: 26px;
margin: 10px 100px 5px 10px;
font-family: Roboto;
font-size: 14px;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #6E6F70;
${(props) => media.lessThan(props, 'large').then(css`
font-size: 11.5px;
`)}

`;

export const StyleCheck = styled('div')`
margin-left: 9px;
`;
 export const StyledDisplaylabelMarketing = styled('span')`
 display: flex;
 height: 26px;
 margin: 10px 100px 5px 10px;
 font-family: Roboto;
 font-size: 14px;
 font-weight: 500;
 font-stretch: normal;
 font-style: normal;
 line-height: 1.86;
 letter-spacing: normal;
 color: #6E6F70;
 
 `;
 export const ErrorTextStyle=styled('span')`
 height: 16px;
 font-family: Roboto;
 color: #ff8389;
 font-size:12px;
 line-height: 1.33;
 margin: 15px 32px 0 9px;
`;