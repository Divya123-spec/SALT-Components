/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { TrashCan24 } from '@carbon/icons-react';
import { media } from '@exo/frontend-common-style-utils';


export const RemoveIcon = styled(TrashCan24)`
  margin: 0 0.938rem 0 0.688rem;
  overflow: visible;
  ${(props) => media.lessThan(props, 'large').then(css`
    margin: 0;
  `)};
  &:hover {
    cursor: pointer;
  }
`;