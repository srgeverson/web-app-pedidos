import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertaAtencao = (props) => {

    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    return (
        props.atencao ?
            <Alert color="warning" isOpen={visible} toggle={onDismiss}>
                {props.atencao.mensagem}
            </Alert>
            :
            ""
    );
}

export default AlertaAtencao;