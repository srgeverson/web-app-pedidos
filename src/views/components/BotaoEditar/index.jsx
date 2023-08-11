import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';

const BotaoEditar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
        <>
            <Link to={props.uri}>
                <Button id="idEditar"
                    className="btn btn-secondary btn-sm m-1">
                    {/* <EditIcon /> */}
                </Button>
            </Link>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idEditar" toggle={toggle}>
                Editar Cadastro!
            </Tooltip>
        </>
    );
};

export default BotaoEditar;