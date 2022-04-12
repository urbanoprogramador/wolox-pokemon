import React from 'react';
import { Portal } from "./Portal";

type Props={
    children
}

export const Modal:React.FC<Props> = ({ children }) => {


    return (<Portal>
        <div className="modal background">
            {children}
        </div>
    </Portal>);
}