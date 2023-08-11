import { api } from '../../core/Api';
import errorHandler from '../../core/handler/Exception';
const axios = require('axios');
class UsuarioService {

    constructor() {
        this.token = localStorage.getItem('token');
    }
    
    async alterar(id, dados) {
        return await api(this.token)
            .put(`/fornecedores/id/${id}`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }

    async buscarPorId(id) {
        return await api(this.token)
            .get(`/fornecedores/${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }

    async cadastrar(dados) {
        return await api(this.token)
            .post(`/fornecedores/com-senha`, dados)
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
    async teste(){
       

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://webapipedidos.azurewebsites.net/v1/fornecedor/todos',
  headers: { 
    'Cookie': 'ARRAffinity=a6e48b9e9d2653435be7b61998d8624b44115214104213d6c8b8c526cc56dc70; ARRAffinitySameSite=a6e48b9e9d2653435be7b61998d8624b44115214104213d6c8b8c526cc56dc70'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
    }
}

export default UsuarioService;