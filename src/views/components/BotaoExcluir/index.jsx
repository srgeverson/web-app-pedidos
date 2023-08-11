import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';

const BotaoExcluir = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <>
            <Button onClick={props.onClick} id="idExcluir" className="btn btn-danger btn-sm m-1">
                Excluir
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idExcluir" toggle={toggle}>
                Excluir Registro
            </Tooltip>
        </>
    );
};

export default BotaoExcluir;