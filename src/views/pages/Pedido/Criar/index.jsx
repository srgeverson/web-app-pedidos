import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import BotaoAdicionar from '../../../components/BotaoAdicionar';
import AlertaErro from '../../../components/AlertaErro';
import PedidoService from '../../../../service/PedidoService';
import ProdutoService from '../../../../service/ProdutoService';
import FornecedorService from '../../../../service/FornecedorService';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import ModalCarregando from '../../../components/ModalCarregando';
import { formataMoeda } from '../../../../core/Utils';

const Criar = () => {
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedor, setFornecedor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [itens, setItens] = useState([]);
    const pedidoService = new PedidoService();
    const produtoService = new ProdutoService();
    const fornecedorService = new FornecedorService();

    const cadastrarPedido = async () => {
        setErro('');

        if (!criticas())
            return;

        setAguardando(true);
        const usuarioCadastrado = await pedidoService.cadastrar({pedidoRequests:itens});
        console.log(usuarioCadastrado);
        if (usuarioCadastrado.statusCode) {
            if (usuarioCadastrado.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: usuarioCadastrado.descricao });
            } else {
                setErro('');
                setAtencao({ mensagem: usuarioCadastrado.descricao });
            }
        } else {
            setSucesso({ mensagem: usuarioCadastrado.message });
            setFormularioSucesso(true);
        }

        setAguardando(false);
    }

    useEffect(() => {
        pesquisarProdutos();
        pesquisarFornecedores();
        // eslint-disable-next-line
    }, []);

    const pesquisarProdutos = async () => {
        setAguardando(true);
        const listarTodos = await produtoService.listarTodos();
        if (listarTodos.statusCode) {
            if (listarTodos.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: listarTodos.mensagem });
            } else {
                setErro('');
                setAtencao({ mensagem: listarTodos.descricao });
            }
        } else
            setProdutos(listarTodos);
        setAguardando(false);
    }

    const pesquisarFornecedores = async () => {
        setAguardando(true);
        const listarTodos = await fornecedorService.listarTodos();
        if (listarTodos.statusCode) {
            if (listarTodos.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: listarTodos.mensagem });
            } else {
                setErro('');
                setAtencao({ mensagem: listarTodos.descricao });
            }
        } else
            setFornecedores(listarTodos);
        setAguardando(false);
    }

    const adicionarItem = async () => {
        setAguardando(true);

        const buscarProduto = await produtoService.buscarPorId(produto);
        if (buscarProduto.statusCode) {
            if (buscarProduto.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: buscarProduto.mensagem });
            } else {
                setErro('');
                setAtencao({ mensagem: buscarProduto.descricao });
            }
        } else {
            let listaAtual = itens;
            listaAtual.push(
                {
                    produto: buscarProduto.codigo,
                    descricao: buscarProduto.descricao,
                    quantidadeProduto: quantidade,
                    valor: buscarProduto.valor,
                    fornecedor: fornecedor
                }
            );
            setItens(listaAtual);
            setProduto('');
            setFornecedor('');
            setQuantidade('');
        }
        setAguardando(false);

    }

    const criticas = () => {
        if(!itens || itens.length === 0 ) return setAtencao({ mensagem: "Inclua pelo menos um item!" });
        return true;
    }

    if (formularioSucesso)
        return <Navigate to={`${publicURL}${rotas.listaDePedidos}`} state={{ mensagem: 'Pedido cadastrado com sucesso!' }} replace />

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
                    <h2 className="display-4 titulo">Cadastrar Pedido</h2>
                </div>
                <div className="mr-auto p-2" />
            </div>
            <hr />
            <AlertaErro erro={erro} />
            <AlertaAtencao atencao={atencao} />
            <AlertaSucesso sucesso={sucesso} />
            <ModalCarregando isOpen={aguardando} pagina='Processando solicitação' />
            <div className="form-group row m-0">
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <FormGroup>
                            <Label for="produto">Produto</Label>
                            <select
                                className="form-select form-select mb-3"
                                aria-label="Large select example"
                                placeholder="Selecione um produto"
                                onChange={(ev) => setProduto(ev.target.value)}
                                value={produto}
                            >
                                <option key=''></option>
                                {produtos.map(
                                    (produto) => (
                                        <option value={produto.codigo} key={produto.codigo}>{`${produto.descricao} - ${formataMoeda(produto.valor)}`}</option>
                                    )
                                )}
                            </select>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="quantidade">Quantidade</Label>
                            <Input
                                type="number"
                                value={quantidade}
                                name="quantidade"
                                id="quantidade"
                                placeholder="Valor do produto"
                                onChange={(ev) => setQuantidade(ev.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="fornecedor">Fornecedor</Label>
                            <select
                                className="form-select form-select mb-3"
                                aria-label="Large select example"
                                placeholder="Selecione um produto"
                                onChange={(ev) => setFornecedor(ev.target.value)}
                                value={fornecedor}>
                                <option key=''></option>
                                {fornecedores.map(
                                    (fornecedor) => (
                                        <option value={fornecedor.cnpj} key={fornecedor.cnpj}>{`${fornecedor.razaoSocial}`}</option>
                                    )
                                )}
                            </select>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="fornecedor"></Label>
                            <BotaoAdicionar aguardando={!fornecedor || !produto || !quantidade} adicionar={() => adicionarItem()} />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <div className="form-group row m-0">
                <div className="col-sm-2">
                    <FormGroup>
                        <Link onClick={() => cadastrarPedido()} to="#">
                            <BotaoConfirmar aguardando={aguardando} />
                        </Link>
                    </FormGroup>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th className="d-none d-sm-table-cell">Descrição</th>
                            <th className="d-none d-sm-table-cell">Valor Uni.</th>
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
                                        <th className="d-none d-sm-table-cell">{item.produto}</th>
                                        <th>{item.descricao}</th>
                                        <th>{formataMoeda(item.valor)}</th>
                                        <th>{item.quantidadeProduto}</th>
                                        <th>{item.fornecedor}</th>
                                        <td className="d-none d-sm-table-cell">{formataMoeda(item.quantidadeProduto * item.valor)}</td>
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

export default Criar;