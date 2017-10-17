import { API_URL } from '../../constants/constants';
import Network from '../../constants/network';

export const getAllUsers = (page) => {
    return {
        type:'FETCH_USERS',
        payload: Network.GET(`${API_URL}/users`)
    }
};

export const saveUser = (user) => {
    let data = {...user};
    delete(data.id);
    delete(data.created_at);
    delete(data.updated_at);
    delete(data.deleted_at);
    delete(data.last_login);
    delete(data.admin);

    if(user.id === -1){
        return {
            type: 'CREATE_USER',
            payload: Network.POST(`${API_URL}/users`, data)
        }
    }else{
        return {
            type: 'UPDATE_USER',
            payload: Network.PUT(`${API_URL}/user/${user.id}`, data)
        }
    }
};

export const getUserInfo = (id) => {
    if(id !== 0) {
        return {
            type: 'GET_USER_INFO',
            payload: Network.GET(`${API_URL}/user/${id}`)
        }
    }else{
        return {
            type: 'GET_NEW_USER_INFO'
        };
    }
};

export const deleteUser = (id) => {
    return dispatch => {
        dispatch({
            type: 'DELETE_USER_PENDING',
            payload: id
        });

        Network.DELETE(`${API_URL}/user/${id}`)
            .then(() => {
                dispatch({
                    type: 'DELETE_USER_FULFILLED',
                    payload: id
                })
            })
            .catch(error => {
                dispatch({
                    type: 'DELETE_USER_REJECTED',
                    payload: error
                });
            })
    };
};