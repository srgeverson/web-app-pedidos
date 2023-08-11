const errorHandler = (erro) => {
    if (erro && erro.data && erro.data.codigo)
        return erro.data;
    else
        return { codigo: 500, mensagem: "Ocorreu um erro interno no servidor, contate o administrador do sistema!", descricao: "Falha na operação" }
}
export default errorHandler;