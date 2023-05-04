/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';


export const TeeTimeWrapper = styled('div')`
  padding: 5rem 0 5rem 0;

 

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
       padding: 2.5rem 0 2.5rem 0;
    `)};
`;
export const ProgressContainer = styled('div')`
  padding: 5rem 0 5rem 0;

${(props) =>
    media.lessThan(props, 'medium').then(css`
        padding: 2.5rem 0 0 0;

    `)};
`;

export const GridWrapper = styled('div')`
  width:100%;
  height:100%;
  position: relative;

  & .bx--grid {
      max-width:81rem;
  }
`;
