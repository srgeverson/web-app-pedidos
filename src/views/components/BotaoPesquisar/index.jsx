import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';
// import SearchIcon from '@mui/icons-material/Search';

const BotaoPesquisar = (props) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <>
            <Button
                onClick={props.onClickPesquisar}
                id="idPesquisar"
                className="btn btn-success btn-sm">
                {/* <SearchIcon /> */}
                <span className="text-white"> Pesquisar</span>
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idPesquisar" toggle={toggle}>
                Pesquisar Cadastros!
            </Tooltip>
        </>
    );
};

export default BotaoPesquisar;