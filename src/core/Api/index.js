
import axios from 'axios';
import { encode } from 'base-64';
import { clientId, clientSecret, url, urlAPI } from '../Config';

const api = (token) => {
    return axios.create({
        baseURL: urlAPI,
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
            'Authorization': `Basic ${encode(`${clientId}:${clientSecret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
}

export { api, authorizationServerLoginClient };