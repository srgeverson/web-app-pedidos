import { api } from '../../core/Api';
import errorHandler from '../../core/handler/Exception';

class FornecedorService {

    async alterar(id, dados) {
        return await api()
            .put(`/fornecedor/atualizar?cnpj=${id}`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async apagarPorId(id) {
        return await api()
            .delete(`/fornecedor/apagar?id=${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async buscarPorId(id) {
        return await api()
            .get(`/fornecedor/por-cnpj?cnpj=${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async cadastrar(dados) {
        return await api()
            .post(`/fornecedor/cadastrar`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async listarTodos() {
        console.log(process.env.URL_DB_WebAPIPedidos_Azure);
// const data = await response.json();
        return await api()
            .get(`/fornecedor/todos`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }
}

export default FornecedorService;