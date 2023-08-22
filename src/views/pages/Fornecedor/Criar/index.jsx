import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import Alerta from '../../../components/Alerta';
import FornecedorService from '../../../../service/FornecedorService';
import ModalCarregando from '../../../components/ModalCarregando';

const Criar = () => {
    const [retorno, setRetorno] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [emailContato, setEmailContato] = useState('');
    const [uf, setUf] = useState('');
    const [nomeContato, setNomeContato] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const ufs = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];
    const fornecedorService = new FornecedorService();
    const [irPara, setIrPara] = useState('');

    const cadastrarFornecedor = async () => {
        if (!criticas())
            return;

        setAguardando(true);
        const fornecedorCadastrado = await fornecedorService.cadastrar({ cnpj, razaoSocial, nomeContato, emailContato, uf });
        if (fornecedorCadastrado.statusCode) {
            if (fornecedorCadastrado.statusCode === 401){
                fornecedorService.limparToken();
                setIrPara({ rota: rotas.paginaInicial, statusCode: fornecedorCadastrado.statusCode, mensagem: 'Não autorizado ou tempo expirado!' });
            } else
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