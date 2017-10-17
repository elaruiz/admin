import { API_CATASTRO, API_PROCESSOR, API_SCRAPPER } from "../../constants/constants";
import Network from "../../constants/network";

export const checkServicesStatus = () => {
    return dispatch => {
        dispatch(getScrapperApiStatus());
        dispatch(getDataProcessorApiStatus());
        dispatch(getCatastroApiStatus());
    }
};

const getScrapperApiStatus = () => {
    return {
        type: 'SCRAPPER_API_STATUS',
        payload: Network.GET(`${API_SCRAPPER}/status`)
    }
};

const getDataProcessorApiStatus = () => {
    return {
        type: 'PROCESSOR_API_STATUS',
        payload: Network.GET(`${API_PROCESSOR}/status`)
    }
};

const getCatastroApiStatus = () => {
    return {
        type: 'CATASTRO_API_STATUS',
        payload: Network.GET(`${API_CATASTRO}/status`)
    }
};