const initialState = {
    list: [],
    loading: false,
    loadingMessage: false,
    error: null,
    message: {
        id: null,
        sender: '',
        email: ''
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        //region FETCH_MESSAGES
        case 'FETCH_MESSAGES_PENDING':
            return { ...state, list: [], loading: true, error: null };
        case 'FETCH_MESSAGES_FULFILLED':
            return { ...state, list: payload.data, loading: false };
        case 'FETCH_MESSAGES_REJECTED':
            return { ...state, list: [], loading: false, error: payload };
        //endregion

        //region GET_MESSAGE_INFO
        case 'GET_MESSAGE_INFO_PENDING':
            return { ...state, loadingMessage: true, message: { ...initialState.message }, error: null };
        case 'GET_MESSAGE_INFO_FULFILLED':
            return { ...state, loadingMessage: false, message: payload.data, error: null };
        case 'GET_MESSAGE_INFO_REJECTED':
            return { ...state, loadingMessage: false, message: { ...initialState.message }, error: payload };
        //endregion

        //region DELETE_MESSAGE
        case 'DELETE_MESSAGE_PENDING': {
            let list = state.list.concat();
            list.forEach(msg => {
                if(msg.id === payload){
                    msg['deleting'] = true;
                }
            });
            return { ...state, list }
        }
        case 'DELETE_MESSAGE_FULFILLED': {
            return { ...state, list: state.list.filter(msg => msg.id !== payload) };
        }
        case 'DELETE_MESSAGE_REJECTED':{
            let list = state.list.concat();
            list.forEach(msg => {
                msg['deleting'] = false;
            });
            return {...state, list};
        }
        //endregion

        default:
            return state;
    }
}