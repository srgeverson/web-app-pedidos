import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';

const BotaoCancelar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <>
            <Button
                onClick={props.onClickCancelar}
                id="idCancelar"
                className="btn btn-secondary m-1 btn-sm">
                <span className="text-white m-1">Cancelar</span>
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idCancelar" toggle={toggle}>
                Cancelar Operação!
            </Tooltip>
        </>
    );
};

export default BotaoCancelar;