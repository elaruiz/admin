const MODE = 'debug';

export const TOKEN_COOKIE = 'user_token_cookie';

export const BASE_URL = (MODE !== 'debug') ? 'http://uda-api.globalonlineweb.com' : 'http://192.168.0.13:8000';

export const API_URL = `${BASE_URL}/api`;

export const SCRAPPER_API_URL = '';

export const API_PROCESSOR = 'http://uda-data-proccesor.us-east-2.elasticbeanstalk.com/api';
export const API_SCRAPPER = 'http://uda-scrapper.us-east-2.elasticbeanstalk.com/api';
export const API_CATASTRO = 'https://uda-catastro-client.globalonlineweb.com/api/v1';

export const MENUS = [
    { url: '/users', text: 'Usuarios', icon: 'users' },
    { url: '/plans', text: 'Planes', },
    { url: '/payments', text: 'Pagos', icon: 'money' },
    { url: '/catastro', text: 'Consulta Catastro', icon: 'building' },
    { url: '/messages', text: 'Mensajes', icon: 'comments-o' }
];