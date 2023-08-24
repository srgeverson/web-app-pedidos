// import { api } from '../../core/Api';
// import errorHandler from '../../core/handler/Exception';
import GenericService from '../GenericService';

class ProdutoService extends GenericService{

    // async alterar(id, dados) {
    //     return await api(this.getToken())
    //         .put(`/produto/atualizar?codigo=${id}`, dados)
    //         .then((callbackSuccess) => {
    //             return callbackSuccess.data;
    //         })
    //         .catch((callbackError) => {
    //             return errorHandler(callbackError.response);
    //         });
    // }

    // async apagarPorId(id) {
    //     return await api(this.getToken())
    //         .delete(`/produto/apagar?codigo=${id}`)
    //         .then((callbackSuccess) => {
    //             return callbackSuccess.data;
    //         })
    //         .catch((callbackError) => {
    //             return errorHandler(callbackError.response);
    //         });
    // }

    // async buscarPorId(id) {
    //     return await api(this.getToken())
    //         .get(`/produto/por-codigo?codigo=${id}`)
    //         .then((callbackSuccess) => {
    //             return callbackSuccess.data;
    //         })
    //         .catch((callbackError) => {
    //             return errorHandler(callbackError.response);
    //         });
    // }

    // async cadastrar(dados) {
    //     return await api(this.getToken())
    //         .post(`/produto/cadastrar`, dados)
    //         .then((callbackSuccess) => {
    //             return callbackSuccess.data;
    //         })
    //         .catch((callbackError) => {
    //             return errorHandler(callbackError.response);
    //         });
    // }

    // async listarTodos() {
    //     return await api(this.getToken())
    //         .get(`/produto/todos`)
    //         .then((callbackSuccess) => {
    //             return callbackSuccess.data;
    //         })
    //         .catch((callbackError) => {
    //             return errorHandler(callbackError.response);
    //         });
    // }
}

export default ProdutoService;