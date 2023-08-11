import React, { useState } from 'react';
import { Button, Spinner, Tooltip } from 'reactstrap';

const BotaoConfirmar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (props.aguardando) {
        return (
            <div>
                <Button
                    id="idConfirmar"
                    className="btn btn-success btn-sm" disabled>
                    Aguarde
                    <Spinner className="mx-1" size="sm" color="light" />
                </Button>
                <Tooltip placement="top" isOpen={tooltipOpen} target="idConfirmar" toggle={toggle}>
                    Processando a confirmação...
                </Tooltip>
            </div>
        );
    }

    return (
        <div>
            <Button id="idConfirmar"
                className="btn btn-success btn-sm">
                <span className="text-white">Confirmar</span>
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idConfirmar" toggle={toggle}>
                Confirmar Operação
            </Tooltip>
        </div>
    );

};

export default BotaoConfirmar;