const initialState = {
    list: [],
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    saving: false,
    saved: false,
    user: {
        id: null,
        name: '',
        email: ''
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'RESET_SAVING_STATE':
            return { ...state, saving: false, saved: false, user: {...initialState.user}, error: null };

        case 'GET_NEW_USER_INFO':
            return {...state, user: {...initialState.user, id: -1}};

        //region FETCH_USERS
        case 'FETCH_USERS_PENDING':
            return { ...state, loading: true, error: null };
        case 'FETCH_USERS_FULFILLED': {
            const { data } = payload;
            return { ...state, loading: false, error: null, list: data, totalPages: 1, currentPage: 1};
        }
        case 'FETCH_USERS_REJECTED':
            return { ...state, loading: false, error: payload };
        //endregion

        //region CREATE_USER
        case 'CREATE_USER_PENDING':
            return { ...state, saving: true, error: null };
        case 'CREATE_USER_FULFILLED':
            return { ...state, saving: false, saved: true, error: null, list: state.list.concat(payload.user.data) };
        case 'CREATE_USER_REJECTED':
            return { ...state, saving: false, saved: false, error: payload };
        //endregion

        //region UPDATE_USER
        case 'UPDATE_USER_PENDING':
            return { ...state, saving: true, error: null };
        case 'UPDATE_USER_FULFILLED': {
            const { data } = payload;
            let list = state.list.concat();
            list.forEach((user, i) => {
                if (user.id === data.id) {
                    list[i] = data;
                }
            });
            return { ...state, saving: false, saved: true, error: null, list: list };
        }
        case 'UPDATE_USER_REJECTED':
            return { ...state, saving: false, saved: false, error: payload };
        //endregion

        //region GET_USER_INFO
        case 'GET_USER_INFO_PENDING':
            return {
                ...state,
                loading: true,
                error: null,
                user: { ...initialState.user }
            };
        case 'GET_USER_INFO_FULFILLED':
            return { ...state, loading: false, user: payload };
        case 'GET_USER_INFO_REJECTED':
            return { ...state, loading: false, user: { ...initialState.user } };
        //endregion

        //region DELETE_USER
        case 'DELETE_USER_PENDING': {
            let list = state.list.concat();
            list.forEach(user => {
                if(user.id === payload){
                    user['deleting'] = true;
                }
            });
            return {...state, list};
    }
        case 'DELETE_USER_FULFILLED':
            return {...state, list: state.list.filter(user => user.id !== payload)};
        case 'DELETE_USER_REJECTED': {
            let list = state.list.concat();
            list.forEach(user => {
                user['deleting'] = false;
            });
            return {...state, list};
        }
        //endregion

        default:
            return state;
    }
}
