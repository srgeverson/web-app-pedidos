import { api } from '../../core/Api';
import errorHandler from '../../core/handler/Exception';

class PedidoService {

    async alterar(id, dados) {
        return await api()
            .put(`/pedido/atualizar?codigo=${id}`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async apagarPorId(id) {
        return await api()
            .delete(`/pedido/apagar?codigo=${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async buscarPorId(id) {
        return await api()
            .get(`/pedido/por-codigo?codigo=${id}`)
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
                console.log(callbackError);
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
}

export default PedidoService;