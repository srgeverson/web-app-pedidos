import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FormGroup, Label, Input, Row, Col, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoAdicionar from '../../../components/BotaoAdicionar';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import BotaoExcluir from '../../../components/BotaoExcluir';
import Alerta from '../../../components/Alerta';
import PedidoService from '../../../../service/PedidoService';
import ProdutoService from '../../../../service/ProdutoService';
import FornecedorService from '../../../../service/FornecedorService';
import ModalApagar from '../../../components/ModalApagar';
import ModalCarregando from '../../../components/ModalCarregando';
import { formataMoeda } from '../../../../core/Utils';

const Alterar = () => {
    const [retorno, setRertorno] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const [confirmarExclusao, setConfirmarExclusao] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedor, setFornecedor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [codigoPedido, setCodigoPedido] = useState('');
    const [codigoProduto, setCodigoProduto] = useState('');
    const [itens, setItens] = useState([]);
    const pedidoService = new PedidoService();
    const produtoService = new ProdutoService();
    const fornecedorService = new FornecedorService();
    const { id } = useParams();

    useEffect(() => {
        receberDadosPedido();
        pesquisarProdutos();
        pesquisarFornecedores();
        // eslint-disable-next-line
    }, [id]);

    const receberDadosPedido = async () => {
        setAguardando(true);
        const pedidoPorId = await pedidoService.buscarPorId(id);
        if (pedidoPorId.statusCode) 
            setRertorno(pedidoPorId);
        else {
            if (pedidoPorId) {
                let itens = pedidoPorId.itens.map(i => {
                    return {
                        codigoPedido: id,
                        produto: i.produto,
                        descricao: i.descricao,
                        quantidadeProduto: i.quantidadeProduto,
                        valor: i.valorPedido / i.quantidadeProduto,
                        fornecedor: i.fornecedor
                    }
                });
                setItens(itens)
            }
        }
        setAguardando(false);
    }

    const alterarPedido = async () => {
        if (!criticas())
            return;

        setAguardando(true);
        const pedidoAlterado = await pedidoService.alterar(id, itens);
        if (pedidoAlterado.statusCode) 
            setRertorno(pedidoAlterado);
        else 
            setFormularioSucesso(true);

        setAguardando(false);
    }

    const criticas = () => {
        return true;
    }

    const pesquisarProdutos = async () => {
        setAguardando(true);
        const listarTodos = await produtoService.listarTodos();
        if (listarTodos.statusCode) 
            setRertorno(listarTodos);
        else
            setProdutos(listarTodos);
        setAguardando(false);
    }

    const pesquisarFornecedores = async () => {
        setAguardando(true);
        const listarTodos = await fornecedorService.listarTodos();
        if (listarTodos.statusCode)
            setRertorno(listarTodos);
        else
            setFornecedores(listarTodos);
        setAguardando(false);
    }

    const apagarPedido = async () => {
        setAguardando(true);
        const apagar = await pedidoService.apagarPorIdPedido(codigoPedido, fornecedor, codigoProduto);
        if (apagar.statusCode) 
            setRertorno(apagar);
        else {
            setRertorno({statusCode:200, mensagem: 'Item removido com sucesso!' });
            setConfirmarExclusao(false);
            receberDadosPedido();
        }
        setAguardando(false);
    }

    const adicionarItem = async () => {
        setAguardando(true);

        const buscarProduto = await produtoService.buscarPorId(produto);
        if (buscarProduto.statusCode) 
            setRertorno(buscarProduto);
        else {
            let listaAtual = itens;
            listaAtual.push(
                {
                    codigoPedido: id,
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

    const abrirConfirmarExclusao = (codigoPedido, fornecedor, produto) => {
        setConfirmarExclusao(true);
        setCodigoPedido(codigoPedido);
        setFornecedor(fornecedor);
        setCodigoProduto(produto);
    }

    if (formularioSucesso)
        return <Navigate to={`${publicURL}${rotas.listaDePedidos}`} state={{ statusCode: 200, mensagem: 'Pedido alterado com sucesso!' }} replace />

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
                    <h2 className="display-4 titulo">Atualizar Pedido</h2>
                </div>
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}${rotas.visualizacaoDePedidoes}${id}`}>
                        <button className="ml-1 btn btn-outline-info btn-sm">
                            Visualisar
                        </button>
                    </Link>
                </div>
            </div>
            <hr />
            <Alerta retorno={retorno} />
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
                                onChange={(ev) => { }} disabled />
                        </FormGroup>
                    </Col>
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
                        <Link onClick={() => alterarPedido()} to="#">
                            <BotaoConfirmar aguardando={aguardando} />
                        </Link>
                    </FormGroup>
                </div>
            </div>
            <div className="table-responsive">
                <ModalApagar isOpen={confirmarExclusao} toogle={() => setConfirmarExclusao(false)} apagar='Pedido' aguardando={aguardando} apagarObjeto={() => apagarPedido()} />
                <ModalCarregando isOpen={aguardando} pagina='Processando solicitação' />
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th className="d-none d-sm-table-cell">Valor Uni.</th>
                            <th>Quantidade de Itens</th>
                            <th className="d-none d-sm-table-cell">CNPJ</th>
                            <th>Subtotal</th>
                            <th>Operações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itens.map(
                                (item) => (
                                    <tr key={item.produto} >
                                        <th>{item.produto}</th>
                                        <th className="d-none d-sm-table-cell">{formataMoeda(item.valor)}</th>
                                        <th>{item.quantidadeProduto}</th>
                                        <th className="d-none d-sm-table-cell">{item.fornecedor}</th>
                                        <td>{formataMoeda(item.quantidadeProduto * item.valor)}</td>
                                        <td className="text-center">
                                            <span className="d-none d-md-block">
                                                <BotaoExcluir onClick={() => abrirConfirmarExclusao(item.codigoPedido, item.fornecedor, item.produto)} />
                                            </span>
                                            <div className="dropdown d-block d-md-none">
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle outline size="sm">
                                                        Mais
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <BotaoExcluir onClick={() => abrirConfirmarExclusao(item.codigoPedido, item.fornecedor, item.produto)} />
                                                    </DropdownMenu>
                                                </UncontrolledButtonDropdown>
                                            </div>
                                        </td>
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