import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const Alerta = (props) => {

    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    if (props.retorno && props.retorno.statusCode >= 500)
        return (
            <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                {props.retorno.mensagem}
            </Alert>
        );
    else if (props.retorno && props.retorno.statusCode >= 300 && props.retorno.statusCode < 500)
        return (
            <Alert color="warning" isOpen={visible} toggle={onDismiss}>
                {props.retorno.mensagem}
            </Alert>
        );
    else if (props.retorno && props.retorno.statusCode >= 200 && props.retorno.statusCode < 300)
        return (
            <Alert color="success" isOpen={visible} toggle={onDismiss}>
                {props.retorno.mensagem}
            </Alert>
        );
    else
        return null;
}

export default Alerta;