const errorHandler = (erro) => {
    if (erro && erro.data && erro.data.codigo){
        return {
            statusCode: erro.data.codigo, mensagem:erro.data.mensagem, descricao: erro.data.descricao
        };
    } else {
        return { 
            statusCode: 500, 
            mensagem: "Ocorreu um erro interno no servidor, contate o administrador do sistema!", 
            descricao: "Falha na operação" }
    }
}
export default errorHandler;