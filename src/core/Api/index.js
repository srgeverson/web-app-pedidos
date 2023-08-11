
import axios from 'axios';

const port = 443;//process.env.SERVER_PORT ? process.env.SERVER_PORT : 44370;
const url = 'https://webapipedidos.azurewebsites.net';//process.env.SERVER_URL ? process.env.SERVER_URL : `https://localhost`;
const url_api = process.env.SERVER_URL ? process.env.SERVER_URL : `${url}:${port}/v1`;

const api = () => {
    return axios.create({
        baseURL: url_api,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'http://localhost:1433/',
            'Access-Control-Allow-Credentials': 'true'
        }
    });
}

export { api };