import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ProdutoService from '../../../../service/ProdutoService';
import Alerta from '../../../components/Alerta';
import { publicURL, rotas } from '../../../../core/Config';
import ModalCarregando from '../../../components/ModalCarregando';
import { formataDataEHora, formataMoeda } from '../../../../core/Utils';
import { useAppContext } from '../../../../core/Context';

const Visualizar = () => {
    const [retorno, setRetorno] = useState('');
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const produtoService = new ProdutoService();
    const [aguardando, setAguardando] = useState(false);
    const location = useLocation();
    const { token, handleLogout } = useAppContext();

    useEffect(() => {
        if (location && location.state)
            setRetorno(location.state);
        getProduto(id);
        // eslint-disable-next-line
    }, []);

    const getProduto = async (id) => {
        setAguardando(true);
        const produtoPorId = await produtoService.buscarPorId(token, '/produto/por-codigo', { codigo: id });
        if (produtoPorId.statusCode) {
            if (produtoPorId.statusCode === 401) 
                handleLogout();
            else
                setRetorno(produtoPorId);
        } else
            setProduto(produtoPorId);
        setAguardando(false);
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}/produtos`}>
                        <button className="btn btn-outline-success btn-sm">
                            Listar
                        </button>
                    </Link>
                </div>
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Detalhes do Produto</h2>
                    <Alerta retorno={retorno} />
                </div>
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}${rotas.alteracaoDeProduto}${id}`}>
                        <button className="ml-1 btn btn-outline-warning btn-sm">
                            Editar
                        </button>
                    </Link>
                </div>
            </div>
            <hr />
            {
                produto && !aguardando ?
                    <div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="codigo" placeholder="Código do produto" value={produto.codigo} onChange={() => { }} />
                            <label htmlFor="codigo">Códido do Produto</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="descricao" placeholder="Descrição do produto" value={produto.descricao} onChange={() => { }} />
                            <label htmlFor="descricao">Raxão Social</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="valor" placeholder="E-mail" value={formataMoeda(produto.valor)} onChange={() => { }} />
                            <label htmlFor="valor">Valor do Produto</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="dataCadastro" placeholder="E-mail" value={formataDataEHora(produto.dataCadastro)} onChange={() => { }} />
                            <label htmlFor="dataCadastro">Data de Cadastro</label>
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