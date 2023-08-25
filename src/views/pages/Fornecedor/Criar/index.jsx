import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import Alerta from '../../../components/Alerta';
import FornecedorService from '../../../../service/FornecedorService';
import ModalCarregando from '../../../components/ModalCarregando';
import EstadoService from '../../../../service/EstadoService';
import { useAppContext } from '../../../../core/Context';

const Criar = () => {
    const [retorno, setRetorno] = useState(undefined);
    const [cnpj, setCnpj] = useState(undefined);
    const [razaoSocial, setRazaoSocial] = useState(undefined);
    const [emailContato, setEmailContato] = useState(undefined);
    const [uf, setUf] = useState(undefined);
    const [nomeContato, setNomeContato] = useState(undefined);
    const [aguardando, setAguardando] = useState(false);
    const fornecedorService = new FornecedorService();
    const estadoService = new EstadoService();
    const [irPara, setIrPara] = useState(undefined);
    const { token, handleLogout } = useAppContext();

    const cadastrarFornecedor = async () => {
        if (!criticas())
            return;

        setAguardando(true);
        const fornecedorCadastrado = await fornecedorService.cadastrar(token, '/fornecedor/cadastrar', { cnpj, razaoSocial, nomeContato, emailContato, uf });
        if (fornecedorCadastrado.statusCode) {
            if (fornecedorCadastrado.statusCode === 401)
                handleLogout();
            else
                setRetorno(fornecedorCadastrado);
        } else
            setIrPara({ rota: rotas.listaDeFornecedor, statusCode: 200, mensagem: 'Fornecedor cadastrado com sucesso!' });

        setAguardando(false);
    }

    const criticas = () => {
        if (!cnpj) return setRetorno({ statusCode: 400, mensagem: "Preencha o CNPJ!" });
        return true;
    }

    if (irPara)
        return <Navigate to={`${publicURL}${irPara.rota}`} state={{ statusCode: irPara.statusCode, mensagem: irPara.mensagem }} replace />

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
                    <h2 className="display-4 titulo">Cadastrar Fornecedor</h2>
                </div>
                <div className="mr-auto p-2" />
            </div>
            <hr />
            <Alerta retorno={retorno} />
            <ModalCarregando isOpen={aguardando} pagina='Processando solicitação' />
            <Form>
                <FormGroup>
                    <Label for="emailContato">CNPJ</Label>
                    <Input
                        type="number"
                        value={cnpj}
                        name="cnpj"
                        id="cnpj"
                        className="form-control"
                        autoComplete="cnpj"
                        placeholder="CNPJ"
                        onChange={(ev) => setCnpj(ev.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="razaoSocial">Razão Social</Label>
                    <Input
                        type="text"
                        value={razaoSocial}
                        name="razaoSocial"
                        id="razaoSocial"
                        className="form-control"
                        autoComplete="razaoSocial"
                        placeholder="Razão social"
                        onChange={(ev) => setRazaoSocial(ev.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="uf">UF</Label>
                    <select
                        className="form-select form-select-lg mb-3"
                        aria-label="Large select example"
                        placeholder="Selecione uma UF"
                        onChange={(ev) => setUf(ev.target.value)}>
                        <option key=''></option>
                        {estadoService.listarUFs().map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Label for="emailContato">E-mail Contato</Label>
                    <Input
                        type="email"
                        value={emailContato}
                        name="emailContato"
                        id="emailContato"
                        placeholder="E-mail de contato"
                        onChange={(ev) => setEmailContato(ev.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="nomeContato">Nome Contato</Label>
                    <Input
                        type="text"
                        value={nomeContato}
                        name="nomeContato"
                        id="nomeContato"
                        placeholder="Nome do contato"
                        onChange={(ev) => setNomeContato(ev.target.value)} />
                </FormGroup>
                <br />
                <Link onClick={() => cadastrarFornecedor()} to="#">
                    <BotaoConfirmar aguardando={aguardando} />
                </Link>
            </Form>
        </div>
    )
}

export default Criar;