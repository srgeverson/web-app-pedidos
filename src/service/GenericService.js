import { api } from "../core/Api";
import errorHandler from "../core/handler/Exception";

class GenericService {
    
    async alterar(token, endpoint, id, dados) {
        return await api(token)
            .put(`${endpoint}?${this.retornaId(id)}`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async apagarPorId(token, endpoint, id) {
        return await api(token)
            .delete(`${endpoint}?${this.retornaId(id)}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async buscarPorId(token, endpoint, id) {
        return await api(token)
            .get(`${endpoint}?${this.retornaId(id)}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async cadastrar(token, endpoint, dados) {
        return await api(token)
            .post(endpoint, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    async listarTodos(token, endpoint) {
        return await api(token)
            .get(endpoint)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }

    getToken() {
        return localStorage.getItem('token');
    }

    limparToken() {
        localStorage.removeItem('token');
    }

    salvarToken(accessToken) {
        localStorage.setItem('token', JSON.stringify(accessToken));
    }

    retornaId(id) {
        let resultado = [];
        if (typeof yourVariable === 'object') {
            for (let i in id) {
                if (id.hasOwnProperty(i))
                    resultado.push(`${i}=${id[i]}`);
            }
        } else
            resultado.push(`id=${id}`);
        return resultado.join('&');
    }
}

export default GenericService;