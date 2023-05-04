/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const ReviewHeaderContainer = styled('div')`
  width: 100%;
  height: fit-content;
  display: flex;
  margin-bottom: 1rem;
  
  justify-content: space-between;
  align-items: center;
  ${(props) =>
      media.lessThan(props, 'medium').then(css`
        margin-bottom: 0;
        justify-content: space-between;
      `)};
`;