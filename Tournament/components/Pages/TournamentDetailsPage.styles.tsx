/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/


import { media } from '@exo/frontend-common-style-utils';
import { CommerceForm, FieldRow, FormFooter, Dropdown } from '@exo/frontend-components-forms';
import styled, { css } from 'styled-components';
import { Close24 } from '@carbon/icons-react';
import { ButtonUI } from '../../../../index';
import theme from '../PlayerDetails/PlayerDetails.theme';




export const Heading = styled('h1')`
padding-bottom: 2rem;
margin-top: 30px;
`;

export const DetailsFieldRow = styled(FieldRow)`
  margin-bottom: 2rem;
`;

export const StyledDropdown = styled(Dropdown)`
  margin-top: 1.5rem; 
  
`;

export const TournamentNameLabel = styled('label')`
  width: 800px;
  height: 26px;
  font-family: PlayfairDisplay;
  font-size: 42px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.62;
  letter-spacing: normal;
  color: #87715a;

    ${(props) => media.lessThan(props, 'large').then(css`
      width:100%;
      margin-bottom:50px;
      line-height:1.1;
    `)}
`;

export const TournamentInfo = styled('span')`
  width: 1079px;
  padding: 0 664px 14px 0;
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 6rem;
  letter-spacing: normal;
  color: #fff;
  ${(props) => media.lessThan(props, 'large').then(css`
      width:95%;
      padding:0;
      line-height: 1.5rem;
      margin-top:20px;
    `)}
 `;

export const TournamentDetailsLabel = styled('label')`
  width: 191px;
  height: 26px;
  margin: -50px 0 0 100px;
  font-family: PlayfairDisplay;
  font-size: 28px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.65;
  letter-spacing: normal;
  color:#87715a;

    ${(props) => media.lessThan(props, 'large').then(css`
    width:90%;
    margin-left:20px;
    `)}

`;

export const PlayerDetailsLabel = styled('label')`
  width: 191px;
  height: 26px;
  margin: -50px 0 0 100px;
  font-family: PlayfairDisplay;
  font-size: 28px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.65;
  letter-spacing: normal;
  color:#87715a;

    ${(props) => media.lessThan(props, 'large').then(css`
    width:90%;
    margin-left:20px;
    
    `)}

`;
export const GolferDetailsLabel = styled('label')`
  width: 191px;
  height: 26px;
  margin: -50px 0 0 23px;
  font-family: PlayfairDisplay;
  font-size: 28px;
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
export const TournamentDetailsContainer = styled('div')`
  width: 600px;
  height:fit-content;
  margin-left: 100px;
  ${(props) => media.lessThan(props, 'large').then(css`
  width:90%;
  margin-left:20px;
`)}
`;

export const PlayerDetailsContainer = styled('div')`
  width: 600px;
  height:fit-content;
  margin-left: 100px;
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
  ${(props) => media.lessThan(props, 'large').then(css`
  width:90%;
  margin:0 20px 0 20px;`)}
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
  ${(props) => media.lessThan(props, 'large').then(css`
  margin-left:0px;
  width:100%;
`)}
`;

export const Styledspan = styled('span')`
  width: 200px;
  height: 26px;
  margin: 5px 0px 0px 0px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: normal;
  color: var(--white);
  white-space: nowrap;
  ${(props) => media.lessThan(props, 'large').then(css`
  white-space: normal;
`)}
`;

export const Button = styled(ButtonUI)``;

export const StyledLoading = styled('h4')`
  margin: 20px 0 0 5px;
  font-family: Roboto;
  color: #87715a;
  font-weight: bold;
`;
export const MyDetailsForm = styled(CommerceForm)`
& .golf_dropdown{
  
  & .bx--list-box__menu{
    background-color: inherit;
  }

  & .bx--date-picker__icon {
    fill: #f4f4f4;
  }
}
${(props) => media.lessThan(props, 'large').then(css`
  width:100%;
`)}
`;

export const FormContainer = styled('div')`
width:100%;
`;

export const DetailsFormFooter = styled(FormFooter)`
  padding-top: 0rem;
  display: flex;
  flex-direction: column;
  width:1087px;
  ${(props) => media.lessThan(props, 'large').then(css`
  width:100%;
`)}
`;

export const TextInputWrapper = styled('div')`
width: 218px;
height: 48px;
`;

export const StyledButton = styled('div')`
${(props) => media.lessThan(props, 'large').then(css`
   width:100%;
   margin-top: 30px;
`)}
.bx--btn.bx--btn--disabled {
  background: transparent;
}

`;

export const GolferContainer = styled('div')`
  margin-bottom: 4rem;

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      margin-bottom: 2.5rem;
  `)};

`;
export const DisplayTextInputWrapper = styled('div')`
width: 218px;
height: 48px;
`;

export const TournamentFormContainer = styled('div')`
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

  margin-bottom: .1rem;
`;

export const CustomFieldRow = styled(FieldRow)`

  ${(props) =>
    media.greaterThan(props, 'medium').then(css`
      margin-bottom: 2rem;
  `)};
`;

export const DisplayHandicapIndex = styled('div')`
    display: block;
`;

export const BrowseContainer = styled('div')`
    .display-browse {
      display: block;
    }
    & .file-item-label {
      margin-top: 5px;
      font: 0.75rem/1rem Roboto, Arial, sans-serif;
      letter-spacing: 0.02rem;
      color: #C6C6C6;
    }

    & .file-uploader {
      margin-top: -20px;
    }
`;
export const ContainerOne = styled('div')`
    display: block;
    width: 100%;
    margin-bottom: 15px;
`;

export const ContainerTwo = styled('div')`
    display: none;
    ${(props) => media.lessThan(props, 'large').then(css`
    margin-bottom:10px;
 `)}
`;

export const WAGRRankingContainer = styled('div')`
    display: flex;
    flex-direction: row;
    margin-bottom: -10px;
    .tootip-info {
      display:flex;
    }
    ${(props) => media.lessThan(props, 'large').then(css`
   flex-direction: column;
`)}
`;

export const HandicapIndexContainer = styled('div')`
    display: block;
`;

export const TournamentInfoContainer = styled('div')`
  width: 100%;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  ${(props) => media.lessThan(props, 'large').then(css`
  margin-bottom:20px;
  margin-left:20px;
`)}
`;


  export const StyledlabelForDob = styled('div')`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  font: 0.75rem/1rem Roboto, Arial, sans-serif;
  letter-spacing: 0.02rem;
  color: #C6C6C6;
`;

export const DateInputWrapper = styled('div')`
.bx--date-picker-input__wrapper {
  width: 100%;
}
  display: flex;
  flex-direction: column;
`;
export const ErrorTextStyle=styled('span')`
  height: 16px;
  font-family: Roboto;
  color: #ff8389;
  font-size:12px;
  line-height: 1.33;
  margin: 15px 32px 0 0;
`;

export const FileUploadErrorMsg=styled('span')`
  display: flex;
  flex-direction: row;
  height: 16px;
  font-family: Roboto;
  color: #ff8389;
  font-size:12px;
  line-height: 1.33;
  margin: 15px 32px 0 0;
  display: none;
`;

export const FileUploadSuccessrMsg=styled('span')`
  display: flex;
  flex-direction: row;
  height: 16px;
  font-family: Roboto;
  color: #24a148;
  font-size:12px;
  line-height: 1.33;
  margin: 15px 32px 0 0;
  display: none;
`;


