/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CommerceForm, FormFooter } from '@exo/frontend-components-forms';
import styled from 'styled-components';
import theme from './EmailPreferences.theme';

export const EmailPrefFrom = styled(CommerceForm)`
  margin-top: 1rem;
  max-width: 37rem;
  margin: 0 auto;
`;

export const Headline = styled('h1')`
  font-family: ${(props) => theme(props).headingFont};
  font-size: 1.5rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.92;
  letter-spacing: normal;
  color: ${(props) => theme(props).textColor};
  margin-bottom: 2rem;
`;

export const Description = styled('p')`
  font-family: ${(props) => theme(props).descriptionFont};
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.018rem;
  color: ${(props) => theme(props).textColor};
  margin-bottom: 2rem;
`;

export const CheckboxGroupDescription = styled('p')`
  font-family: ${props=>theme(props).descriptionFont};
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch:normal;
  font-style:normal;
  line-height: 1.33;
  letter-spacing: 0.02rem;
  color: ${props=>theme(props).labelColor};
`;

export const EmailPrefFormFooter = styled(FormFooter)`
  padding-top: 3.5rem;
`;
