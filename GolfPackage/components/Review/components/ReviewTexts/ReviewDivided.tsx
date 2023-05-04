/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Table } from '../../../../../../Table/Table';
import * as S from './ReviewTexts.styles';

export const ReviewDivided = ({ label, text }: Props) => (
    <S.DataContainer>
        <Table
            rows={text}
            headers={label}
        />
    </S.DataContainer>
);

type Props = {
    label: any[];
    text: any[];
};
