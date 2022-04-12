import React, { useContext, useEffect, useState } from "react";
import { DatatableContext } from "./datatableContext";


const TableSizeSelecter=()=>{
    const { setSize,sizes,size } = useContext(DatatableContext);
    return (<>
        <select value={size} onChange={({target})=>{
            setSize(parseInt(target.value));
        }}>
            {
                sizes.map((e)=>{
                    return (
                        <option key={e} value={e}>{e}</option>
                    );
                })
            }
        </select>
    </>);
}


const TableSearch=()=>{
    const { setFilterData,data,setPage ,fieldname } = useContext(DatatableContext);


    const [search,setSeach]=useState('');

    useEffect(()=>{
        let time;
        if(search!==''){
            time=setTimeout(()=>{
                const temp=data.filter((e)=>{

                    return fieldname.filter(ee=>{
                        if(ee.key){
                            return e[ee.key].toUpperCase().indexOf(search.trim().toUpperCase()) > -1
                        }
                        return false;
                        
                    }).length>0
                    
                });
                setFilterData(temp);
                setPage(0);

            },1500);
        }else{
            time=setTimeout(()=>{
               
                setFilterData(data);

            },1500);
        }
        return ()=>{
            clearTimeout(time);
        }
    },[search,setFilterData,data,setPage,fieldname])


    return (<input type='text' value={search} onChange={({target})=>{setSeach(target.value)}} />);
}

export const TableActions = () => {
    

    return (<>
        <div>
            <div >
                <TableSizeSelecter/>
                <TableSearch/>
            </div>
        </div>
    </>);
}