/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './ExtrasReview.theme';

export const ExtrasReviewContainer = styled('div')`
  height: auto;
  width: 100%;
  padding: 1rem 0;
  border-bottom: solid 1px ${(props) => theme(props).contentContainerBorderColor};

`;

export const ContentContainer = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
