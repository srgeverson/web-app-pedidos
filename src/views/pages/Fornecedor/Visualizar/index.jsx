import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import FornecedorService from '../../../../service/FornecedorService';
import Alerta from '../../../components/Alerta';
import { publicURL, rotas } from '../../../../core/Config';
import ModalCarregando from '../../../components/ModalCarregando';
import { useAppContext } from '../../../../core/Context';

const Visualizar = () => {
    const [retorno, setRetorno] = useState(undefined);
    const { id } = useParams();
    const [fornecedor, setFornecedor] = useState(null);
    const fornecedorService = new FornecedorService();
    const [aguardando, setAguardando] = useState(false);
    const location = useLocation();
    const { token, handleLogout } = useAppContext();

    useEffect(() => {
        if (location && location.state)
            setRetorno(location.state);
        getUsuario(id);
        // eslint-disable-next-line
    }, []);

    const getUsuario = async (id) => {
        setAguardando(true);
        const fornecedorPorId = await fornecedorService.buscarPorId(token, '/fornecedor/por-cnpj', { cnpj: id });
        if (fornecedorPorId.statusCode) {
            if (fornecedorPorId.statusCode === 401)
                handleLogout();
            else
                setRetorno(fornecedorPorId);
        } else
            setFornecedor(fornecedorPorId);
        setAguardando(false);
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}${rotas.listaDeFornecedor}`}>
                        <button className="btn btn-outline-success btn-sm">
                            Listar
                        </button>
                    </Link>
                </div>
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Detalhes do Fornecedor</h2>
                    <Alerta retorno={retorno} />
                </div>
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}${rotas.alteracaoDeFornecedor}${id}`}>
                        <button className="ml-1 btn btn-outline-warning btn-sm">
                            Editar
                        </button>
                    </Link>
                </div>
            </div>
            <hr />
            {
                fornecedor && !aguardando ?
                    <div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="cnpj" placeholder="CNPJ" value={fornecedor.cnpj} onChange={() => { }} />
                            <label htmlFor="cnpj">CNPJ</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="razaoSocial" placeholder="Nome" value={fornecedor.razaoSocial} onChange={() => { }} />
                            <label htmlFor="razaoSocial">Raxão Social</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="uf" placeholder="UF" value={fornecedor.uf} onChange={() => { }} />
                            <label htmlFor="uf">UF</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="nomeContato" placeholder="Nome do contato" value={fornecedor.nomeContato} onChange={() => { }} />
                            <label htmlFor="nomeContato">Nome Contato</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="emailContato" placeholder="E-mail do contato" value={fornecedor.emailContato} onChange={() => { }} />
                            <label htmlFor="emailContato">E-mail Contato</label>
                        </div>
                        <br />
                    </div>
                    :
                    <ModalCarregando isOpen={aguardando} pagina='Processando solicitação' />
            }
        </div>
    );
}

export default Visualizar;