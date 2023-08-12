import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';

const BotaoPesquisar = (props) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <>
            <Button
                onClick={props.onClickPesquisar}
                id="idPesquisar"
                className="btn btn-success btn-sm">
                <span className="text-white"> Pesquisar</span>
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idPesquisar" toggle={toggle}>
                Pesquisar Cadastros!
            </Tooltip>
        </>
    );
};

export default BotaoPesquisar;