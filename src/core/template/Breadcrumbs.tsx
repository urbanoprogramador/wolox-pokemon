
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Breadcrumbs = () => {
    const { pathname }: { pathname: string } = useLocation();

    const [ruta, setRuta] = useState<string[]>([]);



    useEffect(() => {

        setRuta(decodeURI(pathname).split('/').slice(1));

    }, [pathname, setRuta]);

    return (<div className='breadcrumbs'>


        {
            ruta.length > 1 && ruta.map((link, index) => {
                return <React.Fragment key={index}>
                    {index > 0 && <span >{'>'}</span>}
                    <span  >

                        {link}
                    </span>
                </React.Fragment>
            })
        }




    </div>);
}
