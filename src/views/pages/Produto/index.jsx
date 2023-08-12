import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownToggle, FormGroup, UncontrolledButtonDropdown } from 'reactstrap';
import { publicURL, rotas } from '../../../core/Config';
import { formataDataEHora, formataMoeda } from '../../../core/Utils'
import AlertaErro from '../../components/AlertaErro';
import AlertaAtencao from '../../components/AlertaAtencao';
import AlertaSucesso from '../../components/AlertaSucesso';
import BotaoExcluir from '../../components/BotaoExcluir';
import BotaoCadastrar from '../../components/BotaoCadastrar';
import BotaoEditar from '../../components/BotaoEditar';
import BotaoPesquisar from '../../components/BotaoPesquisar';
import ModalApagar from '../../components/ModalApagar';
import ModalCarregando from '../../components/ModalCarregando';
import ProdutoService from '../../../service/ProdutoService';

const Produto = () => {
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [idParaApagar, setIdParaApagar] = useState('');
    const [confirmarExclusao, setConfirmarExclusao] = useState(false);
    const location = useLocation();
    const produdoService = new ProdutoService();

    useEffect(() => {
        if (location && location.state) {
            if (location.state.erro === true)
                setErro({ mensagem: location.state.mensagem });
            else if (location.state.alerta === true)
                setAtencao({ mensagem: location.state.mensagem });
            else
                setSucesso({ mensagem: location.state.mensagem });
        }
        // eslint-disable-next-line
    }, []);

    const pesquisarProdutos = async () => {
        setAguardando(true);
        const listarTodos = await produdoService.listarTodos();
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

    const apagarProduto = async () => {
        setAguardando(true);
        const apagar = await produdoService.apagarPorId(idParaApagar);
        if (apagar.statusCode) {
            if (apagar.statusCode === 500) {
                setAtencao('');
                setSucesso('');
                setErro({ mensagem: apagar.mensagem });
            } else {
                setErro('');
                setSucesso('');
                setAtencao({ mensagem: apagar.descricao });
            }
        } else {
            setSucesso({ mensagem: 'Sucesso!' });
            setConfirmarExclusao(false);
            pesquisarProdutos();
        }
        setAguardando(false);
    }

    const abrirConfirmarExclusao = (id) => {
        setConfirmarExclusao(true);
        setIdParaApagar(id);
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Produtos</h2>
                </div>
                <div className="mr-auto p-2">
                    <AlertaErro erro={erro} />
                    <AlertaAtencao atencao={atencao} />
                    <AlertaSucesso sucesso={sucesso} />
                </div>
            </div>
            <hr />
            <div className="form-group row m-0">
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoPesquisar onClickPesquisar={() => pesquisarProdutos()} />
                    </FormGroup>
                </div>
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoCadastrar uri={`${publicURL}${rotas.cadastroDeProduto}`} descricaoObjeto='Produto' />
                    </FormGroup>
                </div>
            </div>
            <div className="table-responsive">
                <ModalApagar isOpen={confirmarExclusao} toogle={() => setConfirmarExclusao(false)} apagar='Produto' aguardando={aguardando} apagarObjeto={() => apagarProduto()} />
                <ModalCarregando isOpen={produtos && aguardando} pagina='Processando solicitação' />
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th className="d-none d-sm-table-cell">Código</th>
                            <th>Descrição</th>
                            <th>Data Cadastro</th>
                            <th className="d-none d-sm-table-cell">Valor</th>
                            <th className="text-center">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            produtos.map(
                                (produto) => (
                                    <tr key={produto.codigo} >
                                        <th className="d-none d-sm-table-cell">{produto.codigo}</th>
                                        <th>{produto.descricao}</th>
                                        <td>{formataDataEHora(produto.dataCadastro)}</td>
                                        <td className="d-none d-sm-table-cell">{formataMoeda(produto.valor)}</td>
                                        <td className="text-center">
                                            <span className="d-none d-md-block">
                                                <BotaoEditar uri={`${publicURL}${rotas.alteracaoDeProduto}${produto.codigo}`} />
                                                <BotaoExcluir onClick={() => abrirConfirmarExclusao(produto.codigo)} />
                                            </span>
                                            <div className="dropdown d-block d-md-none">
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle outline size="sm">
                                                        Mais
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <BotaoEditar uri={`${publicURL}${rotas.alteracaoDeProduto}${produto.codigo}`} />
                                                        <BotaoExcluir onClick={() => abrirConfirmarExclusao(produto.codigo)} />
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
    );
}

export default Produto;