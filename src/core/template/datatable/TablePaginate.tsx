import React, { useContext, useEffect, useState } from "react";
import {
    selectWidthTheme
} from "core/store/theme/selectors/selector";
import { DatatableContext } from "./datatableContext";
import { useSelector } from 'react-redux';





export const TablePaginate = () => {

    const { size, filterData, page, setPage,data } = useContext(DatatableContext);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState<number[]>([]);

    const widthTheme = useSelector(selectWidthTheme);

    useEffect(() => {
        const reciduo = filterData.length % size > 0 ? 1 : 0;
        const t = ((filterData.length / size) + reciduo);
        setTotal(parseInt(t + ''));
    }, [setTotal, filterData, size]);

    useEffect(() => {
        let t: number[] = [];
        const pt: number = page;
        let maxCont = 5;
        let maxLado = 2;
        if (widthTheme <= 490) {
            maxCont = 3;
            maxLado = 1;
        }
        if (total <= maxCont) {
            for (let i = 0; i < total; i++) {
                t.push(i);
            }
        } else if (pt < maxLado + 1) {
            for (let i = 0; i < maxCont; i++) {
                t.push(i);
            }
        } else if (pt > total - (maxLado + 1)) {
            for (let i = total - (maxCont - 1); i < total; i++) {
                t.push(i);
            }
        } else {
            for (let i = pt - maxLado; i < pt + (maxLado + 1); i++) {
                let index = i;
                if (i < 0) {
                    index = (total + 1) + i;
                } else if (i > total) {
                    index = i % total + 1;
                }
                t.push(index);
            }
        }
        setPages(t);
    }, [page, total, setPages,widthTheme]);

    const nextPage = () => {
        if (total > page + 1) {
            setPage(page + 1);
        }
    }
    const backPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    return (<>
        <div className="contenPagi">
            <div>
                <h4>
                    Pokemones {((page+1)*size)-size+1} a {((page+1)*size)>filterData.length ?filterData.length:((page+1)*size)} de  {filterData.length}  {data.length!==filterData.length && 'Filtrado de '+data.length}
                </h4>
                <ul className="pagination" >
                    <li onClick={() => { setPage(0) }}><i className="fa fa-fast-backward" aria-hidden="true"></i></li>
                    <li onClick={backPage}><i className="fa fa-backward" aria-hidden="true"></i></li>
                    {pages.map((e, index) => {
                        return (<li className={page === e ? 'active' : ''} key={index} onClick={() => { setPage(e) }} >{e + 1}</li>);
                    })}
                    <li onClick={nextPage}><i className="fa fa-forward" aria-hidden="true"></i></li>
                    <li onClick={() => { setPage(total - 1) }}><i className="fa fa-fast-forward" aria-hidden="true"></i></li>
                </ul>
            </div>
        </div>
    </>);
}