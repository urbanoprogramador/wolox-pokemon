
import React from 'react';
import { DatatableContext } from './datatableContext';
import { useState } from 'react';
import { IFieldname } from './interfaceTable';
import { HeaderTable } from './HeaderTable';
import { TableBody } from './TableBody';
import { TableActions } from './TableActions';
import { TablePaginate } from './TablePaginate';

type Props<T> = {
    data: T[],
    fieldname: IFieldname[],
    sizes?: number[]
}


export const Datatable: React.FC<Props<{}>> = ({ data, fieldname, sizes: sizesT = [5, 10, 20, 50, 100] }) => {

    const [filterData, setFilterData] = useState<object[]>([...data]);
    const [sizes, setSizes] = useState<number[]>(sizesT);
    const [page, setPage] = useState<number>(0);

    const [size, setSize] = useState(20);

    return (<DatatableContext.Provider value={{
        data,
        filterData,
        setFilterData,
        sizes,
        setSizes,
        page,
        setPage,
        fieldname,
        size,
        setSize
    }}>
        <div className='dataTableContent'>
            <TablePaginate />
            <TableActions />
            <table className='dataTable'>
                <HeaderTable />
                <TableBody />
            </table>

            <TablePaginate />
        </div>

    </DatatableContext.Provider>);
}