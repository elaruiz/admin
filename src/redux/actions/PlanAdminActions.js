import Network from '../../constants/network';
import { API_URL } from '../../constants/constants';

export const getAllPlans = () => {
    return {
        type: 'FETCH_PLANS',
        payload: Network.GET(`${API_URL}/plans`)
    }
};

export const savePlan = (plan) => {
    let data = { ...plan };
    delete(data.id);
    delete(data.created_at);
    delete(data.updated_at);
    delete(data.deleted_at);

    if (plan.id === -1) {
        return {
            type: 'CREATE_PLAN',
            payload: Network.POST(`${API_URL}/plans`, data)
        }
    } else {
        return {
            type: 'UPDATE_PLAN',
            payload: Network.PUT(`${API_URL}/plans/${plan.id}`, data)
        }
    }
};

export const getPlanInfo = (id) => {
    if (id !== 0) {
        return {
            type: 'GET_PLAN_INFO',
            payload: Network.GET(`${API_URL}/plan/${id}`)
        }
    } else {
        return {
            type: 'GET_NEW_PLAN_INFO'
        };
    }
};

export const deletePlan = (id) => {
    return dispatch => {
        dispatch({
            type: 'DELETE_PLAN_PENDING',
            payload: id
        });

        Network.DELETE(`${API_URL}/plans/${id}`)
            .then(() => {
                dispatch({
                    type: 'DELETE_PLAN_FULFILLED',
                    payload: id
                })
            })
            .catch(error => {
                dispatch({
                    type: 'DELETE_PLAN_REJECTED',
                    payload: error
                });
            })
    };
};