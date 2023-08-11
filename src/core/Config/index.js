export const publicURL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'web-app-pedidos';
export const rotas = {
    alteracaoDeFornecedor:'/fornecedores-alterar/',
    alteracaoDeProduto:'/produtos-alterar/',
    cadastroDeFornecedor: '/fornecedores-cadastrar',
    cadastroDeProduto: '/produtos-cadastrar',
    listaDeFornecedor: '/fornecedores',
    listaDePedidos: '/pedidos',
    listaDeProdutos: '/produtos',
    paginaInicial: '/',
    paginaDesconhecida: '*',
    visualizacaoDeFornecedores: '/fornecedores-visualizar/',
    visualizacaoDeProduto: '/produtos-visualizar/',
};