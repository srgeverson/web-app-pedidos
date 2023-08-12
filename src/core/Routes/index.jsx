import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicURL, rotas } from '../Config';
import Container from '../Container';
import Fornecedor from '../../views/pages/Fornecedor';
import AlterarFornecedor from '../../views/pages/Fornecedor/Alterar';
import AlterarPedido from '../../views/pages/Pedido/Alterar';
import AlterarProduto from '../../views/pages/Produto/Alterar';
import CriarFornecedor from '../../views/pages/Fornecedor/Criar';
import CriarPedido from '../../views/pages/Pedido/Criar';
import CriarProduto from '../../views/pages/Produto/Criar';
import Home from '../../views/pages/Home';
import PaginaInexistente from '../../views/pages/PaginaInexistente';
import Pedido from '../../views/pages/Pedido';
import Produto from '../../views/pages/Produto';
import VisualizarFornecedor from '../../views/pages/Fornecedor/Visualizar';
import VisualizarPedido from '../../views/pages/Pedido/Visualizar';
import VisualizarProduto from '../../views/pages/Produto/Visualizar';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path={`${publicURL}${rotas.alteracaoDeFornecedor}:id`} element={Container(AlterarFornecedor)} />
                    <Route path={`${publicURL}${rotas.alteracaoDePedido}:id`} element={Container(AlterarPedido)} />
                    <Route path={`${publicURL}${rotas.alteracaoDeProduto}:id`} element={Container(AlterarProduto)} />
                    <Route path={`${publicURL}${rotas.cadastroDeFornecedor}`} element={Container(CriarFornecedor)} />
                    <Route path={`${publicURL}${rotas.cadastroDePedido}`} element={Container(CriarPedido)} />
                    <Route path={`${publicURL}${rotas.cadastroDeProduto}`} element={Container(CriarProduto)} />
                    <Route path={`${publicURL}${rotas.listaDeFornecedor}`} element={Container(Fornecedor)} />
                    <Route path={`${publicURL}${rotas.listaDePedidos}`} element={Container(Pedido)} />
                    <Route path={`${publicURL}${rotas.listaDeProdutos}`} element={Container(Produto)} />
                    <Route path={`${publicURL}${rotas.paginaInicial}`} element={Container(Home)} />
                    <Route path={`${publicURL}${rotas.visualizacaoDeFornecedor}:id`} element={Container(VisualizarFornecedor)} />
                    <Route path={`${publicURL}${rotas.visualizacaoDePedidoes}:id`} element={Container(VisualizarPedido)} />
                    <Route path={`${publicURL}${rotas.visualizacaoDeProduto}:id`} element={Container(VisualizarProduto)} />
                    <Route path={rotas.paginaDesconhecida} element={<PaginaInexistente />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default Rotas;