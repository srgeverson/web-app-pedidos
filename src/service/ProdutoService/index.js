import { api } from '../../core/Api';
import errorHandler from '../../core/handler/Exception';

class ProdutoService {

    async alterar(id, dados) {
        return await api()
            .put(`/produto/atualizar?cnpj=${id}`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async apagarPorId(id) {
        return await api()
            .delete(`/produto/apagar?id=${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async buscarPorId(id) {
        return await api()
            .get(`/produto/por-cnpj?cnpj=${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async cadastrar(dados) {
        return await api()
            .post(`/produto/cadastrar`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async listarTodos() {
        return await api()
            .get(`/produto/todos`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                console.log(callbackError);
                return errorHandler(callbackError.response);
            });
    }
}

export default ProdutoService;