import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownToggle, FormGroup, UncontrolledButtonDropdown } from 'reactstrap';
import { publicURL } from '../../../core/Config';
import AlertaErro from '../../components/AlertaErro';
import AlertaAtencao from '../../components/AlertaAtencao';
import AlertaSucesso from '../../components/AlertaSucesso';
import BotaoCadastrar from '../../components/BotaoCadastrar';
import BotaoEditar from '../../components/BotaoEditar';
import BotaoPesquisar from '../../components/BotaoPesquisar';
import ModalCarregando from '../../components/ModalCarregando';
import FornecedorService from '../../../service/FornecedorService';

const Fornecedor = () => {
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [usuarios, setFornecedores] = useState([]);
    const location = useLocation();
    const fornecedorService = new FornecedorService();

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

    //Início da rotina de pesquisa
    const pesquisarFornecedores = async () => {
        setAguardando(true);
        const listarTodos = await fornecedorService.listarTodos();
        if (listarTodos.statusCode) {
            if (listarTodos.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: listarTodos.message });
            } else {
                setErro('');
                setAtencao({ mensagem: listarTodos.message });
            }
        } else
            setFornecedores(listarTodos);
        setAguardando(false);
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Fornecedores</h2>
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
                        <BotaoPesquisar onClickPesquisar={() => pesquisarFornecedores()} />
                    </FormGroup>
                </div>
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoCadastrar uri={`${publicURL}/usuarios-cadastrar`} descricaoObjeto='Fornecedor' />
                    </FormGroup>
                </div>
            </div>
            <div className="table-responsive">
                <ModalCarregando isOpen={usuarios && aguardando} pagina='Processando solicitação' />
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th className="d-none d-sm-table-cell">CNPJ</th>
                            <th>Razão Social</th>
                            <th className="d-none d-sm-table-cell">E-mail Contato</th>
                            <th className="d-none d-sm-table-cell">Nome Contato</th>
                            <th className="text-center">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map(
                                (usuario) => (
                                    <tr key={usuario.id} >
                                        <th className="d-none d-sm-table-cell">{usuario.id}</th>
                                        <th>{usuario.nome}</th>
                                        <td className="d-none d-sm-table-cell">{usuario.email}</td>
                                        <td className="text-center">
                                            <span className="d-none d-md-block">
                                                <BotaoEditar uri={`${publicURL}/usuarios-alterar/${usuario.id}`} />
                                            </span>
                                            <div className="dropdown d-block d-md-none">
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle outline size="sm">
                                                        {/* <MoreVertIcon /> */}
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <BotaoEditar uri={`${publicURL}/usuarios-alterar/${usuario.id}`} />
                                                    </DropdownMenu>
                                                </UncontrolledButtonDropdown>

                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="acoesListar">

                                                </div>
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