import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const BotaoCadastrar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
        <>
            <Link id="idCadastrar" to={props.uri} className="btn btn-primary btn-sm">
                <span className="text-white"> Cadastrar</span>
            </Link>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idCadastrar" toggle={toggle}>
                {props.descricaoObjeto ? `Cadastrar Novo ${props.descricaoObjeto}` : 'Cadastrar'}
            </Tooltip>
        </>
    );
};

export default BotaoCadastrar;