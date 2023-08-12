import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import PedidoService from '../../../../service/PedidoService';
import ModalCarregando from '../../../components/ModalCarregando';
import { formataDataEHora, formataMoeda } from '../../../../core/Utils';

const Alterar = () => {
    const [dataPedido, setDataPedido] = useState('');
    const [valorTotalPedido, setValorTotalPedido] = useState('');
    const [atencao, setAtencao] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [quantidadeTotalProdutos, setQuantidadeTotalProdutos] = useState('');
    const [itens, setItens] = useState([]);
    const pedidoService = new PedidoService();
    const { id } = useParams();

    useEffect(() => {
        receberDadosPedido();
        // eslint-disable-next-line
    }, [id]);

    const receberDadosPedido = async () => {
        setAguardando(true);
        const fornecedorPorId = await pedidoService.buscarPorId(id);
        if (fornecedorPorId.statusCode) {
            if (fornecedorPorId.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: fornecedorPorId.message });
            } else {
                setErro('');
                setAtencao({ mensagem: fornecedorPorId.message });
            }
        } else {
            if (fornecedorPorId) {
                const resumo = await pedidoService.montaResumoDeUmPedido(fornecedorPorId);
                setItens(fornecedorPorId.itens)
                setDataPedido(resumo.dataPedido);
                setValorTotalPedido(resumo.valorTotalPedido);
                setQuantidadeTotalProdutos(resumo.quantidadeTotalDeItens);
            }
        }
        setAguardando(false);
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}${rotas.listaDePedidos}`}>
                        <button className="btn btn-outline-success btn-sm">
                            Listar
                        </button>
                    </Link>
                </div>
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Detalhes do Pedido</h2>
                </div>
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}${rotas.alteracaoDePedido}${id}`}>
                        <button className="ml-1 btn btn-outline-warning btn-sm">
                            Editar
                        </button>
                    </Link>
                </div>
            </div>
            <hr />
            <AlertaErro erro={erro} />
            <AlertaAtencao atencao={atencao} />
            <ModalCarregando isOpen={aguardando} pagina='Processando solicitação' />
            <div className="form-group row m-0">
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <FormGroup>
                            <Label for="codigoPedido">Código Pedido</Label>
                            <Input
                                type="number"
                                value={id}
                                name="codigoPedido"
                                id="codigoPedido"
                                placeholder="Valor do produto"
                                onChange={() => { }} disabled />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="codigoPedido">Quantidade Produtos</Label>
                            <Input
                                type="number"
                                value={quantidadeTotalProdutos}
                                name="codigoPedido"
                                id="codigoPedido"
                                placeholder="Valor do produto"
                                onChange={() => { }} disabled />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="dataPedido">Data do Pedido</Label>
                            <Input
                                type="text"
                                value={formataDataEHora(dataPedido)}
                                name="dataPedido"
                                id="dataPedido"
                                placeholder="Valor do produto"
                                onChange={(ev) => setDataPedido(ev.target.value)} disabled />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="valorTotalPrdido">Valor Total Pedido</Label>
                            <Input
                                type="text"
                                value={formataMoeda(valorTotalPedido)}
                                name="valorTotalPrdido"
                                id="valorTotalPrdido"
                                placeholder="Valor do produto"
                                onChange={(ev) => setValorTotalPedido(ev.target.value)} disabled />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Valor Uni.</th>
                            <th className="d-none d-sm-table-cell">Quantidade de Itens</th>
                            <th className="d-none d-sm-table-cell">CNPJ</th>
                            <th>Valor Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itens.map(
                                (item) => (
                                    <tr key={item.produto} >
                                        <th>{item.produto}</th>
                                        <th>{formataMoeda(item.valorPedido / item.quantidadeProduto)}</th>
                                        <th className="d-none d-sm-table-cell">{item.quantidadeProduto}</th>
                                        <th className="d-none d-sm-table-cell">{item.fornecedor}</th>
                                        <td >{formataMoeda(item.valorPedido)}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Alterar;