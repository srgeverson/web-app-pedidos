import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicURL } from '../Config';
import Container from '../Container';
import Fornecedor from '../../views/pages/Fornecedor';
import Home from '../../views/pages/Home';
import PaginaInexistente from '../../views/pages/PaginaInexistente';
import Pedido from '../../views/pages/Pedido';
import Produto from '../../views/pages/Produto';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path={`${publicURL}/fornecedor`} element={Container(Fornecedor)} />
                    <Route path={`${publicURL}/`} element={Container(Home)} />
                    <Route path={`${publicURL}/pedido`} element={Container(Pedido)} />
                    <Route path={`${publicURL}/produto`} element={Container(Produto)} />
                    <Route path="*" element={<PaginaInexistente />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default Rotas;