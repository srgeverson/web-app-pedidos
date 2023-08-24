import GenericService from '../GenericService';

class EstadoService extends GenericService {
    listarUFs() {
        const ufs = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];
        return ufs.sort();
    }
}

export default EstadoService;