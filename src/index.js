import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';

import { TOKEN_COOKIE } from './constants/constants';
import App from './components/App';
import store from './redux/store';
import { userIsLoggedIn } from './redux/actions/UserActions';

import registerServiceWorker from './registerServiceWorker';

import './sass/index.css';
import { checkServicesStatus } from "./redux/actions/ServicesActions";

//Si el usuario ya inició sesión y la cookie existe,
//ejecutamos el evento de login de forma automágica
let oauth = Cookies.get(TOKEN_COOKIE);

if (oauth) {
    store.dispatch(userIsLoggedIn());
}

store.dispatch(checkServicesStatus());
setInterval(() => {
    store.dispatch(checkServicesStatus());
},60000);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

registerServiceWorker();
