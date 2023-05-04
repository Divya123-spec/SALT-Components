/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { PaginationNav as PaginationComp } from 'carbon-components-react';
import * as S from './Pagination.styles';

export const Pagination = ({
  itemsShown,
  infiniteScroll = false,
  onChange,
  page = 0,
  totalItems
}: Props) => (
    <S.Pagination>
      <PaginationComp
        itemsShown={itemsShown}
        loop={infiniteScroll}
        page={page}
        totalItems={totalItems}
        onChange={onChange}
      />
    </S.Pagination>
  );

type Props = {
  className?: string;
  itemsShown?: number;
  // eslint-disable-next-line react/boolean-prop-naming
  infiniteScroll?: boolean;
  onChange?: any;
  page?: number;
  totalItems?: number;
};
