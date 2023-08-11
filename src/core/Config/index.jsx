export const publicURL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'web-app-pedidos';
export const rotas = {
    alteracaoDeFornecedor:'/fornecedores-alterar/',
    visualizacaoDeFornecedores: '/fornecedores-visualizar/',
    cadastroDeFornecedor: '/fornecedores-cadastrar',
    listaDeFornecedores: '/fornecedores',
    listaDePedidos: '/pedidos',
    listaDeProdutos: '/produtos',
    paginaInicial: '/',
    paginaDesconhecida: '*',
    remocaoDeFornecedor: '/fornecedores-apagar',//verificar necessidade
};