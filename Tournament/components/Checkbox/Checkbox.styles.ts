/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './Checkbox.theme';

export const Checkbox = styled('div')<{ isError: boolean }>`
  ${props => (props.isError ? `border: ${theme(props).errorBorder}` : '')}
`;

export const Error = styled('div')`
  color: ${props => props.theme.colors.information.error};
  font-size: ${props => theme(props).additionalInfoSize};
  line-height: ${props => theme(props).additionalInfoLineHeight};
  margin-top: ${props => theme(props).additionalInfoMarginTop};
`;

export const Help = styled('div')`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => theme(props).additionalInfoSize};
  line-height: ${props => theme(props).additionalInfoLineHeight};
  margin-top: ${props => theme(props).additionalInfoMarginTop};
`;
