/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './StepsComponent.theme';

export const StepsComponent = styled('div')`
  width: auto;
  height: 100%;

  
  & .bx--assistive-text {
    display: none;
  }
  & .bx--progress-step--current .bx--progress-line {
    background-color: ${(props) => theme(props).progressLineActive};
  }
  & .bx--progress-step--incomplete .bx--progress-line {
    background-color: ${(props) => theme(props).progressLineInactive};
  }
  & .bx--progress-step svg{
    fill: ${(props) => theme(props).progressLineActive}
  }

  & .bx--progress-label{
    color: ${(props) => theme(props).progressLabelColor};
    font: ${(props) => theme(props).progressLabelFont};
    letter-spacing: 0.016rem;
  }
`;
export const PreviousStep = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & svg {
    fill: ${(props) => theme(props).backButton};
  }
`;
export const Text = styled('p')`
  padding-left: 1rem;
  font: ${(props) => theme(props).buttonFont};
  color: ${(props) => theme(props).backButton};
  text-decoration: underline;
`;
