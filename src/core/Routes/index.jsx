import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicURL, rotas } from '../Config';
import Container from '../Container';
import Fornecedor from '../../views/pages/Fornecedor';
import AlterarFornecedor from '../../views/pages/Fornecedor/Alterar';
import CriarFornecedor from '../../views/pages/Fornecedor/Criar';
import Home from '../../views/pages/Home';
import PaginaInexistente from '../../views/pages/PaginaInexistente';
import Pedido from '../../views/pages/Pedido';
import Produto from '../../views/pages/Produto';
import VisualizarFornecedor from '../../views/pages/Fornecedor/Visualizar';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path={`${publicURL}${rotas.alteracaoDeFornecedor}:id`} element={Container(AlterarFornecedor)} />
                    <Route path={`${publicURL}${rotas.cadastroDeFornecedor}`} element={Container(CriarFornecedor)} />
                    <Route path={`${publicURL}${rotas.listaDeFornecedores}`} element={Container(Fornecedor)} />
                    <Route path={`${publicURL}${rotas.paginaInicial}`} element={Container(Home)} />
                    <Route path={`${publicURL}${rotas.listaDePedidos}`} element={Container(Pedido)} />
                    <Route path={`${publicURL}${rotas.listaDeProdutos}`} element={Container(Produto)} />
                    <Route path={`${publicURL}${rotas.visualizacaoDeFornecedores}:id`} element={Container(VisualizarFornecedor)} />
                    <Route path={rotas.paginaDesconhecida} element={<PaginaInexistente />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default Rotas;