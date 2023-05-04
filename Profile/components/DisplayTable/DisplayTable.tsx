/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import {
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableContainer,
    DataTable

} from 'carbon-components-react';
import { Pagination } from '../Pagination/Pagination';
import * as S from './DisplayTable.styles';

export const DisplayTable = ({ tableRows, tableHeaders, pageTopRef }) => {

    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const totalItems = Math.ceil(tableRows.length / 10);


    const handleChange = (page: number) => {
        pageTopRef.current.scrollIntoView();

        if (currentPageSize !== 10) {
            setCurrentPageSize(10);
        }
        setFirstRowIndex(currentPageSize * (page));
    };

    return (
        <S.WrapperTable >
            <DataTable rows={tableRows.slice(firstRowIndex, firstRowIndex + currentPageSize)} headers={tableHeaders}>
                {({ rows, headers, getTableProps, getRowProps, sortBy, getHeaderProps }) => (
                    <TableContainer>
                        <S.InnerTable {...getTableProps()}>
                            <TableHead >
                                <TableRow >
                                    {headers.map((header) => {
                                        if (header.key === 'paymentGatewayAmount' || header.key === 'purchaseDate' || header.key === 'dateOfPlay') {
                                            return (
                                                <TableHeader className={'selectedHeader'} onClick={() => sortBy(header.key)} {...getHeaderProps({ header, isSortable: true })}>
                                                    {header.header}
                                                </TableHeader>
                                            );
                                        }
                                        else {
                                            return (
                                                <TableHeader>
                                                    {header.header}
                                                </TableHeader>
                                            );
                                        }
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {rows.map((row) => (
                                    <TableRow {...getRowProps({ row })}>
                                        {row.cells.map((cell) => (
                                            <TableCell key={cell.id}>{cell.value !== null ? cell.value : '---'}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </S.InnerTable>
                        {totalItems !== 1 && <Pagination
                            itemsShown={10}
                            page={0}
                            totalItems={totalItems}
                            onChange={handleChange}
                        />}
                    </TableContainer>
                )}
            </DataTable>

        </S.WrapperTable>




    );
};

