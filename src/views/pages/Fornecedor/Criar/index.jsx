import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import FornecedorService from '../../../../service/FornecedorService';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import ModalCarregando from '../../../components/ModalCarregando';

const Criar = () => {
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [emailContato, setEmailContato] = useState('');
    const [uf, setUf] = useState('');
    const [nomeContato, setNomeContato] = useState('');
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const ufs = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];
    const fornecedorService = new FornecedorService();

    const cadastrarFornecedor = async () => {
        setErro('');

        if (!criticas())
            return;

        setAguardando(true);
        const usuarioCadastrado = await fornecedorService.cadastrar({ cnpj, razaoSocial, nomeContato, emailContato, uf });
        if (usuarioCadastrado.codigo) {
            if (usuarioCadastrado.codigo === 500) {
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
        if (!cnpj) return setAtencao({ mensagem: "Preencha o CNPJ!" });
        return true;
    }

    if (formularioSucesso)
        return <Navigate to={`${publicURL}${rotas.listaDeFornecedores}`} state={{ mensagem: 'Fornecedor cadastrado com sucesso!' }} replace />

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}${rotas.listaDeFornecedores}`}>
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
            <AlertaErro erro={erro} />
            <AlertaAtencao atencao={atencao} />
            <AlertaSucesso sucesso={sucesso} />
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
                        <option></option>
                        {ufs.map(
                            (uf) => (
                                <option value={uf}>{uf}</option>
                            )
                        )}
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