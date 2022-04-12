import React, { useContext } from "react";
import { DatatableContext } from './datatableContext';


export const HeaderTable = () => {

    const {fieldname}=useContext(DatatableContext);
     
 


    return (

    <thead>
        <tr>
        {
            fieldname.map(({fieldname})=>{
                return (<th key={fieldname}>
                {fieldname}
                </th>)
            })
        }
        </tr>
    </thead>

    );
}