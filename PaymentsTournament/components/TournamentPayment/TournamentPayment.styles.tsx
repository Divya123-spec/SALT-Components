/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';

export const PaymentPanelWrapper = styled('div')`
width:100%;
height:auto;
padding:40px;
${props => media.lessThan(props, 'medium').then(css`
    padding:5px 5px 15px 5px;
    margin:10px 0px -60px 0px;
  `)}
`;


export const PaymentWrapper = styled('div')`
height:auto;
width:60%;
margin:auto;
padding:20px;
background-color: #fff;
border:1px solid #dedede;
${props => media.lessThan(props, 'large').then(css`
    width:350px;
    margin:auto;
    padding:10px;
  `)}
  ${props => media.lessThan(props, 'medium').then(css`
    width:350px;
    margin:auto;
    padding:10px;
  `)}
  ${props => media.lessThan(props, 'small').then(css`
    width:320px;
    margin-left:1px;
  `)}
`;

export const Heading = styled('h2')`
padding-left:5px;
padding-bottom:10px;
color:#161616;
font-family: Roboto;
${props => media.lessThan(props, 'medium').then(css`
padding-left:2px;
  `)}
`;


export const PaymentMethodHeader = styled('div') <{ selected?: boolean }>`
  background-color: ${props => props.theme.colors.backgrounds.panels.primary.base};
  cursor: pointer;
  padding: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 1rem;
  margin-left:2px;
  &:hover {
    background-color: ${props => props.theme.colors.backgrounds.panels.primary.hover};
  }
 
  ${props => media.lessThan(props, 'small').then(css`
    margin-left:0px;
  `)}
`;

export const PaymentName = styled.label`
  font-weight: 600;
`;

export const Widget = styled('div')`
  margin-top: 1.5rem;
  padding-top:15px;
  padding-bottom:20px;
  margin-left:2px;
  margin-bottom:-20px;
  ${props => media.lessThan(props, 'medium').then(css`
    margin-bottom:-20px;
  `)}
`;

export const ConfirmationPageHead = styled('div')`
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
  height:auto;
  width:100%;
  padding-left: 40px;
  padding-bottom: 20px;
  margin-top:30px;
  ${props => media.lessThan(props, 'medium').then(css`
    width: 100%;
    height: auto;
    padding-left:30px;
  `)}
`;

export const ConfirmationHeading = styled('h2')`
width: 528px;
height: 40px;
margin: 0 496px 11px 0px;
font-family: PlayfairDisplay;
font-size: 28px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.29;
letter-spacing: normal;
color: #87715a;
  ${props => media.lessThan(props, 'medium').then(css`
    width: 304px;
    height: 82px;
    margin: 0 0 10px 0px;
  `)}
`;

export const MessageWrapper = styled.div`
display:flex;
${props => media.lessThan(props, 'medium').then(css`
    padding-right:25px;
  `)}
`;

export const TransactionDetails = styled.p`
  display:block;
  padding-bottom:10px;
  // padding-left:10px;
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.71;
  letter-spacing: 0.26px;
  color: var(--primary-blue-01-base-primary);;
`;

export const Span = styled('span')`
  width: 620px;
  height: 72px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: 0.26px;
  color: var(--primary-blue-01-base-primary);;
  ${props => media.lessThan(props, 'medium').then(css`
     line-height: 0.5;
     margin-bottom:5px;
    `)}
`;

export const ShowOnMobile = styled.span`
  display: inline;
  ${props => media.greaterThan(props, 'medium').then(css`
    display: none;
  `)}
`;

export const SvgWrapper = styled.div`
height:24px;
width:24px;

svg.my-custom-class {
  fill: #23bf58;
}
`;

export const FailureHeading = styled('h2')`
width: 528px;
height: 40px;
margin: 0 496px 11px 0px;
font-family: PlayfairDisplay;
font-size: 28px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.29;
letter-spacing: normal;
color: var(--primary-blue-01-base-primary);;
  ${props => media.lessThan(props, 'medium').then(css`
    width: 304px;
    height: 50px;
    margin: 0 0 5px 2px;
  `)}
`; 

export const FailureMessage = styled('div')`
  display:block;
  padding-bottom:10px;
  padding-left:8px;
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.71;
  letter-spacing: 0.26px;
  color: var(--primary-blue-01-base-primary);;
`;