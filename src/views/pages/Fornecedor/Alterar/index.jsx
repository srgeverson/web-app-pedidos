import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { publicURL, rotas } from '../../../../core/Config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import Alerta from '../../../components/Alerta';
import FornecedorService from '../../../../service/FornecedorService';
import ModalCarregando from '../../../components/ModalCarregando';

const Alterar = () => {
    const [retorno, setRetorno] = useState(undefined);
    const [cnpj, setCnpj] = useState(undefined);
    const [razaoSocial, setRazaoSocial] = useState(undefined);
    const [emailContato, setEmailContato] = useState(undefined);
    const [uf, setUf] = useState(undefined);
    const [nomeContato, setNomeContato] = useState(undefined);
    const [aguardando, setAguardando] = useState(false);
    const [irPara, setIrPara] = useState(undefined);
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
        if (fornecedorPorId.statusCode)
            setRetorno(fornecedorPorId);
        else {
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
        if (!criticas())
            return;

        setAguardando(true);
        const fornecedorAlterado = await fornecedorService.alterar(id, { cnpj: id, razaoSocial, nomeContato, emailContato, uf });

        if (fornecedorAlterado.statusCode) {
            if (fornecedorAlterado.statusCode === 401){
                fornecedorService.limparToken();
                setIrPara({ rota: rotas.login, statusCode: fornecedorAlterado.statusCode, mensagem: 'Não autorizado ou tempo expirado!' });
            } else
                setRetorno(fornecedorAlterado);
        } else 
            setIrPara({ rota: rotas.listaDeFornecedor, statusCode: 200, mensagem: 'Fornecedor alterado com sucesso!' });


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
                    <Link to={`${publicURL}${rotas.visualizacaoDeFornecedor}${id}`}>
                        <button className="ml-1 btn btn-outline-info btn-sm">
                            Visualisar
                        </button>
                    </Link>
                </div>
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
                        onChange={(ev) => setUf(ev.target.value)}
                        value={uf}>
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