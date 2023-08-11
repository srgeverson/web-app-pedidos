import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertaSucesso = (props) => {

    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    return (
        props.sucesso ?
            <Alert color="success" isOpen={visible} toggle={onDismiss}>
                {props.sucesso.mensagem}
            </Alert>
            :
            ""
    )
}

export default AlertaSucesso;