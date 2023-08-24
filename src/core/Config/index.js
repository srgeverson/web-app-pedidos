export const publicURL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'web-app-pedidos';
export const rotas = {
    alteracaoDeFornecedor: '/fornecedores-alterar/',
    alteracaoDePedido: '/pedidos-alterar/',
    alteracaoDeProduto: '/produtos-alterar/',
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
export const port = 443;
export const url = 'https://webapipedidos.azurewebsites.net';
export const urlAPI = process.env.SERVER_URL ? process.env.SERVER_URL : `${url}:${port}/v1`;
export const clientId = process.env.CLIENT_ID ? process.env.CLIENT_ID : 'web-app-pedidos';
export const clientSecret = process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '7cf8096a9f73781153694fbb7f834eaa';
export const nomeVariaveis = {
    token: 'f980965495fe4677dd89a7fc6170d4f8'
};