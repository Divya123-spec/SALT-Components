/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const DataContainer = styled('div')`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      flex-direction: column;
      margin-top: 0;
      height: fit-content;
    `)};
`;
