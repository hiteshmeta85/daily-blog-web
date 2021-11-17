import cookie from 'react-cookies';
import axios from 'axios';
require('dotenv').config();

const httpClient = ({ method, url, data, responseType }) => {
    return axios({
        method,
        url,
        data,
        headers: { 'X-Session-Cookie':  cookie.load(process.env.REACT_APP_SESSION_COOKIE_NAME)},
        responseType,
    })
}

export default httpClient
