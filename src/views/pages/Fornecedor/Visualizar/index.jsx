import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import FornecedorService from '../../../../service/FornecedorService';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaErro from '../../../components/AlertaErro';
import { publicURL, rotas } from '../../../../core/Config';
import ModalCarregando from '../../../components/ModalCarregando';

const Visualizar = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [atencao, setAtencao] = useState('');
    const [erro, setErro] = useState('');
    const fornecedorService = new FornecedorService();
    const [aguardando, setAguardando] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location && location.state) {
            if (location.state.erro === true)
                setErro({ mensagem: location.state.mensagem });
            else if (location.state.alerta === true)
                setAtencao({ mensagem: location.state.mensagem });
        }
        getUsuario(id);
        // eslint-disable-next-line
    }, []);

    const getUsuario = async (id) => {
        setAguardando(true);
        const usuarioPorId = await fornecedorService.buscarPorId(id);
        if (usuarioPorId.codigo) {
            if (usuarioPorId.codigo === 500) {
                setAtencao('');
                setErro({ mensagem: usuarioPorId.message });
            } else {
                setErro('');
                setAtencao({ mensagem: usuarioPorId.message });
            }
        } else 
            setUsuario(usuarioPorId);
        setAguardando(false);
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}/usuarios`}>
                        <button className="btn btn-outline-success btn-sm">
                            Listar
                        </button>
                    </Link>
                </div>
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Detalhes do Fornecedor</h2>
                    <AlertaErro erro={erro} />
                    <AlertaAtencao atencao={atencao} />
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
                usuario && !aguardando ?
                    <div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="cnpj" placeholder="CNPJ" value={usuario.cnpj} onChange={() => { }} />
                            <label htmlFor="cnpj">CNPJ</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="razaoSocial" placeholder="Nome" value={usuario.razaoSocial} onChange={() => { }} />
                            <label htmlFor="razaoSocial">Raxão Social</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="uf" placeholder="E-mail" value={usuario.uf} onChange={() => { }} />
                            <label htmlFor="uf">UF</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="nomeContato" placeholder="E-mail" value={usuario.nomeContato} onChange={() => { }} />
                            <label htmlFor="nomeContato">Nome Contato</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="nomeContato" placeholder="E-mail" value={usuario.nomeContato} onChange={() => { }} />
                            <label htmlFor="nomeContato">E-mail Contato</label>
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