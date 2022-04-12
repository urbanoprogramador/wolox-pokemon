import React, { useEffect, useRef } from 'react'
import { Breadcrumbs } from './Breadcrumbs';
import { Sidebar } from './Sidebar';



type Props = {
    children: React.ReactNode,
}

export const Layout: React.FC<Props> = ({
    children
}) => {






    return (<>
        <Sidebar />
        <div >
            <Breadcrumbs />
            <div className='container boxShadow'>
                <div className='row'>
                    {children}
                </div>
            </div>

        </div>
    </>);
}