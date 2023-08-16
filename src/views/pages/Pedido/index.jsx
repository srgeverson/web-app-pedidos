import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownToggle, FormGroup, UncontrolledButtonDropdown } from 'reactstrap';
import { publicURL, rotas } from '../../../core/Config';
import { formataDataEHora, formataMoeda } from '../../../core/Utils';
import Alerta from '../../components/Alerta';
import BotaoExcluir from '../../components/BotaoExcluir';
import BotaoCadastrar from '../../components/BotaoCadastrar';
import BotaoEditar from '../../components/BotaoEditar';
import BotaoPesquisar from '../../components/BotaoPesquisar';
import ModalApagar from '../../components/ModalApagar';
import ModalCarregando from '../../components/ModalCarregando';
import PedidoService from '../../../service/PedidoService';

const Pedido = () => {
    const [retorno, setRertorno] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [idParaApagar, setIdParaApagar] = useState('');
    const [confirmarExclusao, setConfirmarExclusao] = useState(false);
    const location = useLocation();
    const pedidoService = new PedidoService();

    useEffect(() => {
        if (location && location.state)
            setRertorno(location.state);
        // eslint-disable-next-line
    }, []);

    const pesquisarPedidos = async () => {
        setAguardando(true);
        const listarTodos = await pedidoService.listarTodos();
        const resumo = await pedidoService.montaResumoPedido(listarTodos);
        if (listarTodos.statusCode)
            setRertorno(listarTodos.statusCode);
        else
            setPedidos(resumo);
        setAguardando(false);
    }

    const apagarPedido = async () => {
        setAguardando(true);
        const apagar = await pedidoService.apagarPorId(idParaApagar);
        if (apagar.statusCode)
            setRertorno(apagar);
        else {
            setRertorno({ statusCode: 200, mensagem: 'Pedido apagado com sucesso!' });
            setConfirmarExclusao(false);
            pesquisarPedidos();
        }
        setAguardando(false);
    }

    const abrirConfirmarExclusao = (id) => {
        setConfirmarExclusao(true);
        setIdParaApagar(id);
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Pedidos</h2>
                </div>
                <div className="mr-auto p-2">
                    <Alerta retorno={retorno} />
                </div>
            </div>
            <hr />
            <div className="form-group row m-0">
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoPesquisar onClickPesquisar={() => pesquisarPedidos()} />
                    </FormGroup>
                </div>
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoCadastrar uri={`${publicURL}${rotas.cadastroDePedido}`} quantidadeTotalDeItensObjeto='Pedido' />
                    </FormGroup>
                </div>
            </div>
            <div className="table-responsive">
                <ModalApagar isOpen={confirmarExclusao} toogle={() => setConfirmarExclusao(false)} apagar='Pedido' aguardando={aguardando} apagarObjeto={() => apagarPedido()} />
                <ModalCarregando isOpen={pedidos && aguardando} pagina='Processando solicitação' />
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Quantidade</th>
                            <th>Subtotal</th>
                            <th className="d-none d-sm-table-cell">Data Pedido</th>
                            <th className="text-center">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pedidos.map(
                                (pedido) => (
                                    <tr key={pedido.codigoPedido} >
                                        <th>{pedido.codigoPedido}</th>
                                        <th>{pedido.quantidadeTotalDeItens}</th>
                                        <td>{formataMoeda(pedido.valorTotalPedido)}</td>
                                        <td className="d-none d-sm-table-cell">{formataDataEHora(pedido.dataPedido)}</td>
                                        <td className="text-center">
                                            <span className="d-none d-md-block">
                                                <BotaoEditar uri={`${publicURL}${rotas.alteracaoDePedido}${pedido.codigoPedido}`} />
                                                <BotaoExcluir onClick={() => abrirConfirmarExclusao(pedido.codigoPedido)} />
                                            </span>
                                            <div className="dropdown d-block d-md-none">
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle outline size="sm">
                                                        Mais
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <BotaoEditar uri={`${publicURL}${rotas.alteracaoDePedido}${pedido.codigoPedido}`} />
                                                        <BotaoExcluir onClick={() => abrirConfirmarExclusao(pedido.codigoPedido)} />
                                                    </DropdownMenu>
                                                </UncontrolledButtonDropdown>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Pedido;