import Network from '../../constants/network';
import Cookies from 'js-cookie'
import { API_URL, TOKEN_COOKIE } from '../../constants/constants';

export const getLoggedUserInfo = () => {
    return {
        type: 'LOGGED_USER_INFO',
        payload: Network.GET(`${API_URL}/users/me`)
    }
};

export const doLogout = () => {
    Cookies.remove(TOKEN_COOKIE);
    return {
        type: 'USER_LOGOUT'
    }
};

export const doLogin = (username, password) => {
    return dispatch => {
        const data = {
            email: username,
            password
        };

        dispatch({ type: 'USER_LOGIN_PENDING' });

        Network.POST(`${API_URL}/users/login`, data)
            .then(response => {
                Cookies.set(TOKEN_COOKIE, response.user.token);
                dispatch(userIsLoggedIn());
            })
            .catch(error => dispatch({ type: 'USER_LOGIN_REJECTED', payload: error }));
    }
};

export const userIsLoggedIn = () => {
    return dispatch => {
        dispatch(getLoggedUserInfo())
        //Aquí va cualquier otra acción que se toma cuando el usuario
        //hace login
    }
};