import React, { useContext, useEffect, useState } from "react";
import { DatatableContext } from './datatableContext';





type Props = {
    obj:object
}


const TableTd: React.FC<Props> =({obj})=>{

    const {fieldname}=useContext(DatatableContext);

    return (<tr>
        {
            fieldname.map(({fieldname,key,html})=>{
                if(html){
                    return <td key={fieldname}>  {html(obj)}</td>
                }
                if(key){
                    return (<td key={fieldname}>
                        {obj[key]}
                        </td>)
                }
                return null;
            })
        }
    </tr>);
}



export const TableBody=()=>{

    const {filterData,size,page,fieldname}=useContext(DatatableContext);

    const [showData,setShowData]=useState<object[]>([]);


    useEffect(()=>{


        const desde = page === 0 ? 0 : page * size;
        const hasta = (page + 1) * size;

        const temporal = filterData.slice(desde, hasta);

        setShowData(temporal);

    },[setShowData,filterData,size,page]);

    return (<tbody>

        {
            showData.length===0?
            <tr>
                <td colSpan={fieldname.length}>Item No encontrado</td>
            </tr>:
            showData.map((e:any)=>{


                return (<TableTd obj={e} key={e.id}/>);
            })
        }
    </tbody>);
}