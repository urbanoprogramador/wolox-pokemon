import { Modal } from "components/portal/Modal";
import React from "react";

type Props = {
    Body?: any
    title?: string
    ActionComponent?: any
}

export const Message: React.FC<Props> = ({
    title,
    Body,
    ActionComponent
}) => {





    return (<Modal>

        <div className="contentModal">
            <div className="titelModal">
                <h1>{title} </h1>
            </div>
            {
                Body &&
                <div className="bodyModal">
                    <Body />
                </div>
            }

            <div className="footerModal">
                <div className="bottonera">
                    {ActionComponent && <ActionComponent />}
                    {/* <button className="btn black" onClick={() => { navigate('/') }}>Accept</button> */}
                </div>
            </div>
        </div>
    </Modal>);
}