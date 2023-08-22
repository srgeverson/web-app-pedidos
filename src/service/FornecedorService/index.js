import { api } from '../../core/Api';
import errorHandler from '../../core/handler/Exception';
import GenericService from '../GenericService';

class FornecedorService extends GenericService {

    async alterar(id, dados) {
        return await api(this.getToken())
            .put(`/fornecedor/atualizar?cnpj=${id}`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async apagarPorId(id) {
        return await api(this.getToken())
            .delete(`/fornecedor/apagar?id=${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async buscarPorId(id) {
        return await api(this.getToken())
            .get(`/fornecedor/por-cnpj?cnpj=${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async cadastrar(dados) {
        return await api(this.getToken())
            .post(`/fornecedor/cadastrar`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async listarTodos() {
        return await api(this.getToken())
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