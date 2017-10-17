import Cookies from 'js-cookie';
import { TOKEN_COOKIE } from './constants';

const getHeaders = () => {
    let myHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': '*',
    };

    let oauth = Cookies.get(TOKEN_COOKIE);
    if (oauth) {
        myHeaders['Authorization'] = `Bearer ${oauth}`;
    }

    return myHeaders;
};

const init = (method, data) => {
    let init = {
        method: method,
        mode: 'cors',
        cache: 'default',
        headers: getHeaders()
    };
    if (data) {
        init.body = data;
    }
    return init;
};

const processResponse = (response) => new Promise((resolve, reject) => {
    if (response.ok) {
        response.json()
            .then(json => resolve(json))
            .catch(() => resolve()); //Respuestas vacias dan error de parse de json
                                     //mandamos a resolve sin ningun argumento
    } else {
        reject(response);
    }
});

const getFromServer = (url) => {
    return fetch(url, init('GET'))
        .then(processResponse)
};

const sendToServer = (url, method, data) => {
    return fetch(url, init(method, JSON.stringify(data)))
        .then(processResponse);
};

const Network = {
    GET: (url) => getFromServer(url),
    POST: (url, data) => sendToServer(url, 'POST', data),
    PUT: (url, data) => sendToServer(url, 'PUT', data),
    DELETE: (url) => sendToServer(url, 'DELETE', {}),
};

export default Network;