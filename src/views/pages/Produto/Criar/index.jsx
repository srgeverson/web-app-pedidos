import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import ProdutoService from '../../../../service/ProdutoService';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import ModalCarregando from '../../../components/ModalCarregando';

const Criar = () => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const produtoService = new ProdutoService();

    const cadastrarProduto = async () => {
        setErro('');

        if (!criticas())
            return;

        setAguardando(true);
        const usuarioCadastrado = await produtoService.cadastrar({ descricao, valor });
        if (usuarioCadastrado.statusCode) {
            if (usuarioCadastrado.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: usuarioCadastrado.descricao });
            } else {
                setErro('');
                setAtencao({ mensagem: usuarioCadastrado.descricao });
            }
        } else {
            setSucesso({ mensagem: usuarioCadastrado.message });
            setFormularioSucesso(true);
        }

        setAguardando(false);
    }

    const criticas = () => {
        return true;
    }

    if (formularioSucesso)
        return <Navigate to={`${publicURL}${rotas.listaDeProdutos}`} state={{ mensagem: 'Produto cadastrado com sucesso!' }} replace />

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
            <AlertaErro erro={erro} />
            <AlertaAtencao atencao={atencao} />
            <AlertaSucesso sucesso={sucesso} />
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