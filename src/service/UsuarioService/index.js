import { authorizationServerLoginClient } from '../../core/Api';
import errorHandler from '../../core/handler/Exception';
import GenericService from '../GenericService';

class UsuarioService extends GenericService{

    async token() {
        return await authorizationServerLoginClient()
            .post('/connect/token', `grant_type=client_credentials`)
            .then((response) => {
                return response.data;
            })
            .catch((callbackError) => {
                return errorHandler(callbackError.response);
            });
    }
}

export default UsuarioService;