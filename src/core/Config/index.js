export const publicURL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'web-app-pedidos';
export const rotas = {
    alteracaoDeFornecedor:'/fornecedores-alterar/',
    alteracaoDePedido:'/pedidos-alterar/',
    alteracaoDeProduto:'/produtos-alterar/',
    cadastroDeFornecedor: '/fornecedores-cadastrar',
    cadastroDePedido: '/pedidos-cadastrar',
    cadastroDeProduto: '/produtos-cadastrar',
    listaDeFornecedor: '/fornecedores',
    listaDePedidos: '/pedidos',
    listaDeProdutos: '/produtos',
    login: '/',
    paginaInicial: '/',
    paginaDesconhecida: '*',
    visualizacaoDeFornecedor: '/fornecedores-visualizar/',
    visualizacaoDePedidoes: '/pedidos-visualizar/',
    visualizacaoDeProduto: '/produtos-visualizar/',
};