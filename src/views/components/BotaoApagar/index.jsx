import React, { useState } from 'react';
import { Button, Spinner, Tooltip } from 'reactstrap';

const BotaoApagar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (props.aguardando) {
        return (
            <>
                <Button id="idApagar" className="btn btn-danger btn-sm mr-1" disabled>
                    <Spinner className="ml-1" size="sm" color="light" />
                    Apagando...
                </Button>
                <Tooltip placement="top" isOpen={tooltipOpen} target="idApagar" toggle={toggle}>
                    Processando a remoção...
                </Tooltip>
            </>
        )
    }

    return (
        <>
            <Button id="idApagar" className="btn btn-danger btn-sm mr-1">
                Apagar
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idApagar" toggle={toggle}>
                Apagar Cadastro!
            </Tooltip>
        </>
    );
};

export default BotaoApagar;