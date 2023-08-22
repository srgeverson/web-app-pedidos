import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownToggle, FormGroup, UncontrolledButtonDropdown } from 'reactstrap';
import { publicURL, rotas } from '../../../core/Config';
import { formataDataEHora, formataMoeda } from '../../../core/Utils'
import Alerta from '../../components/Alerta';
import BotaoExcluir from '../../components/BotaoExcluir';
import BotaoCadastrar from '../../components/BotaoCadastrar';
import BotaoEditar from '../../components/BotaoEditar';
import BotaoPesquisar from '../../components/BotaoPesquisar';
import ModalApagar from '../../components/ModalApagar';
import ModalCarregando from '../../components/ModalCarregando';
import ProdutoService from '../../../service/ProdutoService';

const Produto = () => {
    const [retorno, setRetorno] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [idParaApagar, setIdParaApagar] = useState('');
    const [confirmarExclusao, setConfirmarExclusao] = useState(false);
    const location = useLocation();
    const produdoService = new ProdutoService();
    const [irPara, setIrPara] = useState('');

    useEffect(() => {
        if (location && location.state)
            setRetorno(location.state);
        // eslint-disable-next-line
    }, []);

    const pesquisarProdutos = async () => {
        setAguardando(true);
        const listarTodos = await produdoService.listarTodos();
        if (listarTodos.statusCode) {
            if (listarTodos.statusCode === 401) {
                produdoService.limparToken();
                setIrPara({ rota: rotas.login, statusCode: listarTodos.statusCode, mensagem: 'Não autorizado ou tempo expirado!' });
            } else
                setRetorno(listarTodos);
        } else
            setProdutos(listarTodos);
        setAguardando(false);
    }

    const apagarProduto = async () => {
        setAguardando(true);
        const apagar = await produdoService.apagarPorId(idParaApagar);
        if (apagar.statusCode) {
            if (apagar.statusCode === 401) {
                produdoService.limparToken();
                setIrPara({ rota: rotas.login, statusCode: apagar.statusCode, mensagem: 'Não autorizado ou tempo expirado!' });
            } else
                setRetorno(apagar);
        } else {
            setRetorno({ statusCode: 200, mensagem: 'Produto apagado com sucesso!' });
            setConfirmarExclusao(false);
            pesquisarProdutos();
        }
        setAguardando(false);
    }

    const abrirConfirmarExclusao = (id) => {
        setConfirmarExclusao(true);
        setIdParaApagar(id);
    }

    if (irPara)
        return <Navigate to={`${publicURL}${irPara.rota}`} state={{ statusCode: irPara.statusCode, mensagem: irPara.mensagem }} replace />

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Produtos</h2>
                </div>
                <div className="mr-auto p-2">
                    <Alerta retorno={retorno} />
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
                            <th>Código</th>
                            <th>Descrição</th>
                            <th className="d-none d-sm-table-cell">Data Cadastro</th>
                            <th className="d-none d-sm-table-cell">Valor</th>
                            <th className="text-center">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            produtos.map(
                                (produto) => (
                                    <tr key={produto.codigo} >
                                        <th>{produto.codigo}</th>
                                        <th>{produto.descricao}</th>
                                        <td className="d-none d-sm-table-cell">{formataDataEHora(produto.dataCadastro)}</td>
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