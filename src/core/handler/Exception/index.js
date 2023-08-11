const errorHandler = (erro) => {
    if (erro && erro.data && erro.data.statusCode)
        return erro.data;
    else
        return { statusCode: 500, message: "Ocorreu um erro interno no servidor, contate o administrador do sistema!" }
}
export default errorHandler;