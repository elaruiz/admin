const initialState = {
    user: null,
    loading: false,
    loadingInfo: false,
    error: null
};

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case 'USER_LOGOUT':

            return { ...state, loading: false, error: null, user: null };

        //region USER_LOGIN
        case 'USER_LOGIN_PENDING':
            return {...state, loading: true, loaded: false, error: null};
        case 'USER_LOGIN_FULFILLED':
            return {...state, loading: false, loaded: true, error: null};
        case 'USER_LOGIN_REJECTED':
            return {...state, loading: false, loaded: false, error: payload};
        //endregion

        //region USER_INFO
        case 'LOGGED_USER_INFO_PENDING':
            return {...state, loadingInfo: true, loaded: true};
        case 'LOGGED_USER_INFO_FULFILLED':
            return {...state, loadingInfo: false, loaded: true, error: null, user: payload};
        case 'LOGGED_USER_INFO_REJECTED':
            return {...state, loadingInfo: false, loaded: false, error: payload, user: null};
        //endregion

        default:
            return state;
    }
}