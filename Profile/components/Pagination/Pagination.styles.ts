/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './Pagination.theme';

export const Pagination = styled('div')`
  margin-top:10px;
  margin-left: 60%;
  max-width: 100%;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  & ul,ol {
    list-style-type: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }

  & li:nth-child(2) {
    margin-left: auto;
  }

  & li:nth-child(19) {
    margin-right: auto;
  }

  & .bx--pagination {
    display: flex;
  }

  & .bx--pagination-nav__page {
    font-family: ${(props) => theme(props).font};
    font-size: 0.875rem;
    color: ${(props) => theme(props).textColor};

    &--active {
      font-weight: normal;
    }
  }

  & .bx--pagination-nav__page:focus {
    outline: none;
    outline-offset: 0rem;
    animation: fadingFrame 1.5s linear;
  }

  & .bx--select__arrow {
    color:red;
  }

  @keyframes fadingFrame {
    0% {
      outline: 0.125rem solid ${(props) => theme(props).frameColor};
      outline-offset: -0.125rem;
    }
    100% {
      outline: none;
      outline-offset: -0.125rem;
    }
  }

  ${(props) =>
    media.lessThan(props, 'large').then(css`
      margin: 2rem auto;
      overflow-x: scroll;
      scrollbar-width: 20px;
      float:left;
      & li:first-child {
        display: block;
        margin-left: auto;
      }
      & li:last-child {
        display: block;
        margin-right: auto;
      }
      & li:nth-child(2){
        margin-left: 0;
      }
    `)}

`;
