import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import ProdutoService from '../../../../service/ProdutoService';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import ModalCarregando from '../../../components/ModalCarregando';

const Alterar = () => {
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const frodutoService = new ProdutoService();
    const { id } = useParams();

    useEffect(() => {
        receberDadosProduto();
        // eslint-disable-next-line
    }, [id]);

    const receberDadosProduto = async () => {
        setAguardando(true);
        const fornecedorPorId = await frodutoService.buscarPorId(id);
        if (fornecedorPorId.statusCode) {
            if (fornecedorPorId.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: fornecedorPorId.message });
            } else {
                setErro('');
                setAtencao({ mensagem: fornecedorPorId.message });
            }
        } else {
            if (fornecedorPorId) {
                setCodigo(fornecedorPorId.codigo);
                setDescricao(fornecedorPorId.descricao);
                setValor(fornecedorPorId.valor);
            }
        }
        setAguardando(false);
    }

    const alterarProduto = async () => {
        setErro('');

        if (!criticas())
            return;

        setAguardando(true);
        const fornecedorAlterado = await frodutoService.alterar(id, {codigo:id, descricao, valor });

        if (fornecedorAlterado.statusCode) {
            if (fornecedorAlterado.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: fornecedorAlterado.mensagem });
            } else {
                setErro('');
                setAtencao({ mensagem: fornecedorAlterado.mensagem });
            }
        } else {
            setSucesso({ mensagem: fornecedorAlterado.mensagem });
            setFormularioSucesso(true);
        }

        setAguardando(false);
    }

    const criticas = () => {
        return true;
    }

    if (formularioSucesso)
        return <Navigate to={`${publicURL}${rotas.listaDeProdutos}`} state={{ mensagem: 'Produto alterado com sucesso!' }} replace />

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
                    <h2 className="display-4 titulo">Atualizar Produto</h2>
                </div>
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}${rotas.visualizacaoDeProduto}${id}`}>
                        <button className="ml-1 btn btn-outline-info btn-sm">
                            Visualisar
                        </button>
                    </Link>
                </div>
            </div>
            <hr />
            <AlertaErro erro={erro} />
            <AlertaAtencao atencao={atencao} />
            <AlertaSucesso sucesso={sucesso} />
            <ModalCarregando isOpen={aguardando} pagina='Processando solicitação' />
            <Form>
                <FormGroup>
                    <Label for="valor">Código</Label>
                    <Input
                        type="number"
                        value={codigo}
                        name="codigo"
                        id="codigo"
                        className="form-control"
                        autoComplete="codigo"
                        placeholder="CNPJ"
                        onChange={(ev) => setCodigo(ev.target.value)}
                        disabled
                    />
                </FormGroup>
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
                    <Label for="valor">Valor do Produto</Label>
                    <Input
                        type="email"
                        value={valor}
                        name="valor"
                        id="valor"
                        placeholder="E-mail de contato"
                        onChange={(ev) => setValor(ev.target.value)} />
                </FormGroup>
                <br />
                <Link onClick={() => alterarProduto()} to="#">
                    <BotaoConfirmar aguardando={aguardando} />
                </Link>
            </Form>
        </div>
    )
}

export default Alterar;