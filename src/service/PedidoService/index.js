import { api } from '../../core/Api';
import errorHandler from '../../core/handler/Exception';

class PedidoService {

    async alterar(id, dados) {
        return await api()
            .put(`/pedido/atualizar?codigoPedido=${id}`, { pedidoRequests: dados })
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async apagarPorId(id) {
        return await api()
            .delete(`/pedido/apagar?codigoPedido=${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async apagarPorIdPedido(codigoPedido, fornecedor, produto) {
        return await api()
            .delete(`/pedido/apagar?codigoPedido=${codigoPedido}&fornecedor=${fornecedor}&produto=${produto}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async buscarPorId(id) {
        return await api()
            .get(`/pedido/por-id?codigoPedido=${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async cadastrar(dados) {
        return await api()
            .post(`/pedido/cadastrar`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async listarTodos() {
        return await api()
            .get(`/pedido/todos`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async montaResumoPedido(pedido = []) {
        return pedido.map(p => {
            let quantidadeTotalDeItensInicial = 0;
            let valorTotalPedidoInicial = 0;
            return {
                codigoPedido: p.codigoPedido,
                quantidadeTotalDeItens: p.itens.reduce(
                    (acumulador, valorAtual) => acumulador + valorAtual.quantidadeProduto,
                    quantidadeTotalDeItensInicial,
                ),
                dataPedido: p.itens[0].dataPedido,
                valorTotalPedido: p.itens.reduce(
                    (acumulador, valorAtual) => acumulador + valorAtual.valorPedido,
                    valorTotalPedidoInicial,
                )
            }
        });
    }

    async montaResumoDeUmPedido(pedido = []) {
        let quantidadeTotalDeItensInicial = 0;
        let valorTotalPedidoInicial = 0;
        return {
            codigoPedido: pedido.codigoPedido,
            quantidadeTotalDeItens: pedido.itens.reduce(
                (acumulador, valorAtual) => acumulador + valorAtual.quantidadeProduto,
                quantidadeTotalDeItensInicial,
            ),
            dataPedido: pedido.itens.lenght > 0 ? pedido.itens[0].dataPedido : null,
            valorTotalPedido: pedido.itens.reduce(
                (acumulador, valorAtual) => acumulador + valorAtual.valorPedido,
                valorTotalPedidoInicial,
            )
        }
    }

}

export default PedidoService;