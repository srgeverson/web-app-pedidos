import { api } from '../../core/Api';
import errorHandler from '../../core/handler/Exception';

class UsuarioService {

    async alterar(id, dados) {
        return await api()
            .put(`/fornecedores/atualizar?cnpj=${id}`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async apagarPorId(id) {
        return await api()
            .delete(`/fornecedor/por-cnpj?cnpj=${id}`)
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
        return await api()
            .get(`/fornecedor/todos`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                console.log(callbackError);
                return errorHandler(callbackError.response);
            });
    }
}

export default UsuarioService;