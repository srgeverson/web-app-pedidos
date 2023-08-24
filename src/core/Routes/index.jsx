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
import { AuthorizeContext } from '../Context';
import AuthorizeProvider from '../Provider';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <AuthorizeContext>
                    <Routes>
                        {/* Rotas não autenticadas */}
                        {/* Rotas autenticadas */}
                        <Route path={`${publicURL}${rotas.alteracaoDeFornecedor}:id`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.alteracaoDeFornecedor}:id`} element={Container(AlterarFornecedor)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.alteracaoDePedido}:id`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.alteracaoDePedido}:id`} element={Container(AlterarPedido)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.alteracaoDeProduto}:id`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.alteracaoDeProduto}:id`} element={Container(AlterarProduto)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.cadastroDeFornecedor}`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.cadastroDeFornecedor}`} element={Container(CriarFornecedor)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.cadastroDePedido}`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.cadastroDePedido}`} element={Container(CriarPedido)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.cadastroDeProduto}`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.cadastroDeProduto}`} element={Container(CriarProduto)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.listaDeFornecedor}`} element={Container(Fornecedor)} >
                            <Route path={`${publicURL}${rotas.listaDeFornecedor}`} element={Container(Fornecedor)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.listaDePedidos}`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.listaDePedidos}`} element={Container(Pedido)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.listaDeProdutos}`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.listaDeProdutos}`} element={Container(Produto)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.paginaInicial}`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.paginaInicial}`} element={Container(Home)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.visualizacaoDeFornecedor}:id`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.visualizacaoDeFornecedor}:id`} element={Container(VisualizarFornecedor)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.visualizacaoDePedidoes}:id`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.visualizacaoDePedidoes}:id`} element={Container(VisualizarPedido)} />
                        </Route>
                        <Route path={`${publicURL}${rotas.visualizacaoDeProduto}:id`} element={<AuthorizeProvider />} >
                            <Route path={`${publicURL}${rotas.visualizacaoDeProduto}:id`} element={Container(VisualizarProduto)} />
                        </Route>
                        <Route path={rotas.paginaDesconhecida} element={<PaginaInexistente />} />
                    </Routes>
                </AuthorizeContext>
            </Fragment>
        </BrowserRouter>
    );
}

export default Rotas;