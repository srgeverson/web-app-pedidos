class GenericService {

    getToken(){
        return localStorage.getItem('token');
    }    
    
    limparToken() {
        localStorage.removeItem('token');
    }

    salvarToken(accessToken) {
        localStorage.setItem('token', JSON.stringify(accessToken));
    }
}

export default GenericService;