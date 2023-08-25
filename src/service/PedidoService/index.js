import GenericService from '../GenericService';

class PedidoService extends GenericService {

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