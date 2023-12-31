import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import BotaoAdicionar from '../../../components/BotaoAdicionar';
import Alerta from '../../../components/Alerta';
import PedidoService from '../../../../service/PedidoService';
import ProdutoService from '../../../../service/ProdutoService';
import FornecedorService from '../../../../service/FornecedorService';
import ModalCarregando from '../../../components/ModalCarregando';
import { formataMoeda } from '../../../../core/Utils';
import { useAppContext } from '../../../../core/Context';

const Criar = () => {
    const [retorno, setRetorno] = useState(undefined);
    const [aguardando, setAguardando] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState(undefined);
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedor, setFornecedor] = useState(undefined);
    const [quantidade, setQuantidade] = useState(undefined);
    const [itens, setItens] = useState([]);
    const pedidoService = new PedidoService();
    const produtoService = new ProdutoService();
    const fornecedorService = new FornecedorService();
    const [irPara, setIrPara] = useState(undefined);
    const { token, handleLogout } = useAppContext();

    useEffect(() => {
        pesquisarProdutos();
        pesquisarFornecedores();
        // eslint-disable-next-line
    }, []);

    const cadastrarPedido = async () => {
        if (!criticas())
            return;

        setAguardando(true);
        const usuarioCadastrado = await pedidoService.cadastrar(token, '/pedido/cadastrar', { pedidoRequests: itens });
        if (usuarioCadastrado.statusCode) {
            if (usuarioCadastrado.statusCode === 401)
                handleLogout();
            else
                setRetorno(usuarioCadastrado);
        } else
            setIrPara({ rota: rotas.listaDePedidos, statusCode: 200, mensagem: 'Pedido cadastrado com sucesso!' });

        setAguardando(false);
    }

    const pesquisarProdutos = async () => {
        setAguardando(true);
        const listarTodos = await produtoService.listarTodos(token, '/produto/todos');
        if (listarTodos.statusCode) {
            if (listarTodos.statusCode === 401)
                handleLogout();
            else
                setRetorno(listarTodos);
        } else
            setProdutos(listarTodos);
        setAguardando(false);
    }

    const pesquisarFornecedores = async () => {
        setAguardando(true);
        const listarTodos = await fornecedorService.listarTodos(token, '/fornecedor/todos');
        if (listarTodos.statusCode) {
            if (listarTodos.statusCode === 401)
                handleLogout();
            else
                setRetorno(listarTodos);
        } else
            setFornecedores(listarTodos);
        setAguardando(false);
    }

    const adicionarItem = async () => {
        setAguardando(true);

        const buscarProduto = await produtoService.buscarPorId(token, '/produto/por-codigo', { codigo: produto });
        if (buscarProduto.statusCode) {
            if (buscarProduto.statusCode === 401) {
                produtoService.limparToken();
                setIrPara({ rota: rotas.login, statusCode: buscarProduto.statusCode, mensagem: 'Não autorizado ou tempo expirado!' });
            } else
                setRetorno(buscarProduto);
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
        if (!itens || itens.length === 0) return setRetorno({ statusCode: 400, mensagem: "Inclua pelo menos um item!" });
        return true;
    }

    if (irPara)
        return <Navigate to={`${publicURL}${irPara.rota}`} state={{ statusCode: irPara.statusCode, mensagem: irPara.mensagem }} replace />

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
            <Alerta retorno={retorno} />
            {/* <AlertaErro erro={erro} /> */}
            {/* <AlertaAtencao atencao={atencao} />
            <AlertaSucesso sucesso={sucesso} /> */}
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
                            <th className="d-none d-sm-table-cell">Código</th>
                            <th>Descrição</th>
                            <th>Valor Uni.</th>
                            <th>Quantidade de Itens</th>
                            <th className="d-none d-sm-table-cell">CNPJ</th>
                            <th>Subtotal</th>
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
                                        <th className="d-none d-sm-table-cell">{item.fornecedor}</th>
                                        <td>{formataMoeda(item.quantidadeProduto * item.valor)}</td>
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