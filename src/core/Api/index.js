
import axios from 'axios';
import { encode } from 'base-64';

const port = 443;
const url = 'https://webapipedidos.azurewebsites.net';
const url_api = process.env.SERVER_URL ? process.env.SERVER_URL : `${url}:${port}/v1`;
const client_id = process.env.CLIENT_ID ? process.env.CLIENT_ID : 'web-app-pedidos';
const client_secret = process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '7cf8096a9f73781153694fbb7f834eaa';

const api = (token) => {
    return axios.create({
        baseURL: url_api,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'http://localhost:1433/',
            'Access-Control-Allow-Credentials': 'true',
            'Authorization': `Bearer ${JSON.parse(token)}`,
        }
    });
}

const authorizationServerLoginClient = () => {
    return axios.create({
        baseURL: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${encode(`${client_id}:${client_secret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
}

export { api, authorizationServerLoginClient };