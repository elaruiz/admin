import Network from "../../constants/network";
import { API_URL } from "../../constants/constants";

export const getAllMessages = (page) => {
    return {
        type: 'FETCH_MESSAGES',
        payload: Network.GET(`${API_URL}/messages`)
    }
};

export const getMessageInfo = (id) => {
    return {
        type: 'GET_MESSAGE_INFO',
        payload: Network.PUT(`${API_URL}/message/${id}`, {})
    }
};

export const deleteMessage = (id) => {
    return dispatch => {
        dispatch({
            type: 'DELETE_MESSAGE_PENDING',
            payload: id
        });

        Network.DELETE(`${API_URL}/message/${id}`)
            .then(() => {
                dispatch({
                    type: 'DELETE_MESSAGE_FULFILLED',
                    payload: id
                })
            })
            .catch(error => {
                dispatch({
                    type: 'DELETE_MESSAGE_REJECTED',
                    payload: error
                });
            })
    };
};