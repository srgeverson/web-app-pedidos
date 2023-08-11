import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertaErro = (props) => {

    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    return (
        props.erro ?
            <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                {props.erro.mensagem}
            </Alert>
            :
            null
    )
}

export default AlertaErro;