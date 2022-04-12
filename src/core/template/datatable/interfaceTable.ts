import { Dispatch, SetStateAction } from "react";


export interface ItemplateHtml{
    (obj:object)
}

export interface IFieldname{
    fieldname:string,
    key?:string,
    html?:ItemplateHtml
}

export interface IDatatableContext {
    data:object[];
    filterData: object[]
    setFilterData: Dispatch<SetStateAction<object[]>>
    sizes: number[]
    setSizes: Dispatch<SetStateAction<number[]>>
    page: number
    setPage:  Dispatch<SetStateAction<number>>
    fieldname:IFieldname[],
    size:number,
    setSize:Dispatch<SetStateAction<number>>

}