import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import Alerta from '../../../components/Alerta';
import ProdutoService from '../../../../service/ProdutoService';
import ModalCarregando from '../../../components/ModalCarregando';
import { useAppContext } from '../../../../core/Context';

const Criar = () => {
    const [retorno, setRetorno] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const produtoService = new ProdutoService();
    const [irPara, setIrPara] = useState('');
    const { token, handleLogout } = useAppContext();

    const cadastrarProduto = async () => {
        if (!criticas())
            return;

        setAguardando(true);
        const produtoCadastrado = await produtoService.cadastrar(token, '/produto/cadastrar', { descricao, valor });
        if (produtoCadastrado.statusCode) {
            if (produtoCadastrado.statusCode === 401)
                handleLogout();
            else
                setRetorno(produtoCadastrado);
        } else
            setIrPara({ rota: rotas.listaDeFornecedor, statusCode: 200, mensagem: 'Produto cadastrado com sucesso!' });


        setAguardando(false);
    }

    const criticas = () => {
        return true;
    }

    if (irPara)
        return <Navigate to={`${publicURL}${irPara.rota}`} state={{ statusCode: irPara.statusCode, mensagem: irPara.mensagem }} replace />

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}${rotas.listaDeProdutos}`}>
                        <button className="btn btn-outline-success btn-sm">
                            Listar
                        </button>
                    </Link>
                </div>
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Cadastrar Produto</h2>
                </div>
                <div className="mr-auto p-2" />
            </div>
            <hr />
            <Alerta retorno={retorno} />
            <ModalCarregando isOpen={aguardando} pagina='Processando solicitação' />
            <Form>
                <FormGroup>
                    <Label for="descricao">Descrição do Produto</Label>
                    <Input
                        type="text"
                        value={descricao}
                        name="descricao"
                        id="descricao"
                        className="form-control"
                        autoComplete="descricao"
                        placeholder="Descrição do Produto"
                        onChange={(ev) => setDescricao(ev.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="valor">Valor</Label>
                    <Input
                        type="number"
                        value={valor}
                        name="valor"
                        id="valor"
                        placeholder="Valor do produto"
                        onChange={(ev) => setValor(ev.target.value)} />
                </FormGroup>
                <br />
                <Link onClick={() => cadastrarProduto()} to="#">
                    <BotaoConfirmar aguardando={aguardando} />
                </Link>
            </Form>
        </div>
    )
}

export default Criar;