import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownToggle, FormGroup, UncontrolledButtonDropdown } from 'reactstrap';
import { publicURL, rotas } from '../../../core/Config';
import Alerta from '../../components/Alerta';
import BotaoExcluir from '../../components/BotaoExcluir';
import BotaoCadastrar from '../../components/BotaoCadastrar';
import BotaoEditar from '../../components/BotaoEditar';
import BotaoPesquisar from '../../components/BotaoPesquisar';
import ModalApagar from '../../components/ModalApagar';
import ModalCarregando from '../../components/ModalCarregando';
import FornecedorService from '../../../service/FornecedorService';
import { useAppContext } from '../../../core/Context';

const Fornecedor = () => {
    const [retorno, setRetorno] = useState(undefined);
    const [aguardando, setAguardando] = useState(false);
    const [fornecedores, setFornecedores] = useState([]);
    const [idParaApagar, setIdParaApagar] = useState(undefined);
    const [confirmarExclusao, setConfirmarExclusao] = useState(false);
    const location = useLocation();
    const fornecedorService = new FornecedorService();
    const { token, handleLogout } = useAppContext();

    useEffect(() => {
        if (location && location.state)
            setRetorno(location.state);
        // eslint-disable-next-line
    }, []);

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

    const apagarFornecedor = async () => {
        setAguardando(true);
        const apagar = await fornecedorService.apagarPorId(token, '/fornecedor/apagar', { id: idParaApagar });
        if (apagar.statusCode) {
            if (apagar.statusCode === 401)
                handleLogout();
            else
                setRetorno(apagar);
        } else {
            setRetorno({ statusCode: 200, mensagem: 'Fornecedor apagado com sucesso!' });
            setConfirmarExclusao(false);
            pesquisarFornecedores();
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
                    <h2 className="display-4 titulo">Fornecedores</h2>
                </div>
                <div className="mr-auto p-2">
                    <Alerta retorno={retorno} />
                </div>
            </div>
            <hr />
            <div className="form-group row m-0">
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoPesquisar onClickPesquisar={() => pesquisarFornecedores()} />
                    </FormGroup>
                </div>
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoCadastrar uri={`${publicURL}${rotas.cadastroDeFornecedor}`} descricaoObjeto='Fornecedor' />
                    </FormGroup>
                </div>
            </div>
            <div className="table-responsive">
                <ModalApagar isOpen={confirmarExclusao} toogle={() => setConfirmarExclusao(false)} apagar='Fornecedor' aguardando={aguardando} apagarObjeto={() => apagarFornecedor()} />
                <ModalCarregando isOpen={fornecedores && aguardando} pagina='Processando solicitação' />
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>CNPJ</th>
                            <th>Razão Social</th>
                            <th className="d-none d-sm-table-cell">UF</th>
                            <th className="d-none d-sm-table-cell">Nome Contato</th>
                            <th className="d-none d-sm-table-cell">E-mail Contato</th>
                            <th className="text-center">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fornecedores.map(
                                (fornecedor) => (
                                    <tr key={fornecedor.cnpj} >
                                        <th>{fornecedor.cnpj}</th>
                                        <th>{fornecedor.razaoSocial}</th>
                                        <td className="d-none d-sm-table-cell">{fornecedor.uf}</td>
                                        <td className="d-none d-sm-table-cell">{fornecedor.nomeContato}</td>
                                        <td className="d-none d-sm-table-cell">{fornecedor.emailContato}</td>
                                        <td className="text-center">
                                            <span className="d-none d-md-block">
                                                <BotaoEditar uri={`${publicURL}${rotas.alteracaoDeFornecedor}${fornecedor.cnpj}`} />
                                                <BotaoExcluir onClick={() => abrirConfirmarExclusao(fornecedor.cnpj)} />
                                            </span>
                                            <div className="dropdown d-block d-md-none">
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle outline size="sm">
                                                        Mais
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <BotaoEditar uri={`${publicURL}${rotas.alteracaoDeFornecedor}${fornecedor.cnpj}`} />
                                                        <BotaoExcluir onClick={() => abrirConfirmarExclusao(fornecedor.cnpj)} />
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

export default Fornecedor;