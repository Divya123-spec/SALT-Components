/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from '../ReviewText/ReviewText.theme';


export const DataContainer = styled('div')`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;

  background: ${(props) => theme(props).reviewTextBackgroundColor};
  font-family: ${(props) => theme(props).reviewTextFontFamily};
  font-size: 0.875rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: 0.26px;

  & thead>tr>th , tbody>tr>td{
    font-family: ${(props) => theme(props).reviewTextFontFamily};
    font-size: 0.875rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: 0.26px;
    width: auto;
  }
  & thead>tr>th:first-child,tbody>tr>td:first-child{
    padding-left: 0;
    
  }
  & thead>tr>th:last-child{
    padding-right: 0;
  }
  & tbody>tr{
    height: 1.5rem;
    padding-bottom: 0.5rem;
  }

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
        flex-direction: column;
        margin-top: 0;
        height: fit-content;
      `)};
`;
