/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';
import { Table } from 'carbon-components-react';

export const WrapperTable = styled('div')`
  font-family: roboto;
  height: auto;
  overflow: auto;
  width: 100%;
  margin-left: 3%;
  

  & tbody, thead{
    border: none;
    margin: 0 10px;
  }

  & th, td, thead {
    background-color: transparent;
  }

  & tr {
   height: 50px;
   border:none;
  }

  & th{
    line-height:1.625 rem;
    padding-left:50px;
    color: #515e64;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.63 rem;
    letter-spacing: normal;
    border:none;
  }

  & td {
    height: 18px;
    padding-left:50px;
    color: #faf9f8;
    font-family: Roboto;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.13;
    letter-spacing: 0.18px;
    border:none;
  }

  & tbody{
      background-color: transparent;
    }
  }

  & .bx--table-sort{
    background-color:transparent;
    color: #515e64;
  }

 & .bx--table-sort__icon {
    fill:#6e6f70;
    opacity: unset; 
  
}
& .bx--table-sort__icon-unsorted {
  fill:#6e6f70;
  opacity: unset;

}
  // & .th {
  //   & .bx--table-sort__flex {
  //   width: 37%;
  //   }
  // }

 & th .bx--table-sort__flex {
    width: 45%;
    ${(props) => media.lessThan(props, 'large').then(css`
    width: 85%;
    `)}
}
  & .bx--data-table tbody tr:hover th {
    background-color:transparent;
  }
  
  & .selectedHeader{
    & .bx--table-header-label{
      margin-left :34px;
    }
  }

`;

export const InnerTable = styled(Table)`
  ${(props) => media.lessThan(props, 'large').then(css`
    width:650px;
    height:auto;
    overflow-x: scroll;
    scrollbal-width:thin;
    &::-webkit-scrollbar {
      width: 1em;
    }
     
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
     
    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }

  `)}
`;

