import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import FornecedorService from '../../../../service/FornecedorService';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import ModalCarregando from '../../../components/ModalCarregando';

const Alterar = () => {
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
    const fornecedorService = new FornecedorService();
    const { id } = useParams();
    const ufs = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];

    useEffect(() => {
        receberDadosFornecedor();
        // eslint-disable-next-line
    }, [id]);

    const receberDadosFornecedor = async () => {
        setAguardando(true);
        const fornecedorPorId = await fornecedorService.buscarPorId(id);
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
                setCnpj(fornecedorPorId.cnpj);
                setRazaoSocial(fornecedorPorId.razaoSocial);
                setUf(fornecedorPorId.uf);
                setNomeContato(fornecedorPorId.nomeContato);
                setEmailContato(fornecedorPorId.emailContato);
            }
        }
        setAguardando(false);
    }

    const alterarFornecedor = async () => {
        setErro('');

        if (!criticas())
            return;

        setAguardando(true);
        const fornecedorAlterado = await fornecedorService.alterar(id, {cnpj:id, razaoSocial, nomeContato, emailContato, uf });

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
        return <Navigate to={`${publicURL}${rotas.listaDeFornecedor}`} state={{ mensagem: 'Fornecedor alterado com sucesso!' }} replace />

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
                    <h2 className="display-4 titulo">Atualizar Fornecedor</h2>
                </div>
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}${rotas.visualizacaoDeFornecedores}${id}`}>
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
                        disabled
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
                        <option key={''}></option>
                        {ufs.map(
                            (uf) => (
                                <option key={uf} value={uf}>{uf}</option>
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
                <Link onClick={() => alterarFornecedor()} to="#">
                    <BotaoConfirmar aguardando={aguardando} />
                </Link>
            </Form>
        </div>
    )
}

export default Alterar;