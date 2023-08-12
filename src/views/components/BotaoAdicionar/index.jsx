import React, { useState } from 'react';
import { Button, Spinner, Tooltip } from 'reactstrap';

const BotaoAdicionar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (props.aguardando) {
        return (
            <div>
                <Button
                    id="idAdicionar"
                    className="btn btn-info btn-sm" disabled>
                    Aguarde
                    <Spinner className="mx-1" size="sm" color="light" />
                </Button>
                <Tooltip placement="top" isOpen={tooltipOpen} target="idAdicionar" toggle={toggle}>
                    Processando a confirmação...
                </Tooltip>
            </div>
        );
    }

    return (
        <div>
            <Button id="idAdicionar"
                className="btn btn-info btn-sm">
                <span className="text-white"
                onClick={()=>props.adicionar()}
                >Adicionar</span>
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idAdicionar" toggle={toggle}>
                Adicionar item
            </Tooltip>
        </div>
    );

};

export default BotaoAdicionar;