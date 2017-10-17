const initialState = {
    scrapper_api: 'unknown',
    catastro_api: 'unknown',
    processor_api: 'unknown'
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SCRAPPER_API_STATUS_PENDING':
            return { ...state, scrapper_api: 'unknown' };
        case 'SCRAPPER_API_STATUS_FULFILLED':
            return { ...state, scrapper_api: 'OK' };
        case 'SCRAPPER_API_STATUS_REJECTED':
            return { ...state, scrapper_api: 'error' };

        case 'PROCESSOR_API_STATUS_PENDING':
            return { ...state, processor_api: 'unknown' };
        case 'PROCESSOR_API_STATUS_FULFILLED':
            return { ...state, processor_api: 'OK' };
        case 'PROCESSOR_API_STATUS_REJECTED':
            return { ...state, processor_api: 'error' };

        case 'CATASTRO_API_STATUS_PENDING':
            return { ...state, catastro_api: 'unknown' };
        case 'CATASTRO_API_STATUS_FULFILLED':
            return { ...state, catastro_api: 'OK' };
        case 'CATASTRO_API_STATUS_REJECTED':
            return { ...state, catastro_api: 'error' };

        default:
            return state;
    }
}