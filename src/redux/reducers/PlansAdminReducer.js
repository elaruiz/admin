const initialState = {
    list: [],
    loading: false,
    error: null,
    saving: false,
    saved: false,
    plan: {
        id: null,
        name: '',
        description: '',
        reports: 1,
        price: 0,
        currency: 'eur',
        interval_time: 'day',
        interval_count: 1
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'RESET_SAVING_STATE':
            return { ...state, saving: false, saved: false, plan: {...initialState.plan }, error: null };

        case 'GET_NEW_PLAN_INFO':
            return {...state, plan: {...initialState.plan, id: -1}};

        //region FETCH_PLANS
        case 'FETCH_PLANS_PENDING':
            return { ...state, loading: true, error: null };
        case 'FETCH_PLANS_FULFILLED':
            return { ...state, loading: false, error: null, list: payload.data };
        case 'FETCH_PLANS_REJECTED':
            return { ...state, loading: false, error: payload, list: [] };
        //endregion

        //region CREATE_PLAN
        case 'CREATE_PLAN_PENDING':
            return { ...state, saving: true, error: null };
        case 'CREATE_PLAN_FULFILLED':
            return { ...state, saving: false, saved: true, error: null, list: state.list.concat(payload.data) };
        case 'CREATE_PLAN_REJECTED':
            return { ...state, saving: false, saved: false, error: payload };
        //endregion

        //region UPDATE_PLAN
        case 'UPDATE_PLAN_PENDING':
            return { ...state, saving: true, error: null };
        case 'UPDATE_PLAN_FULFILLED': {
            const { data } = payload;
            let list = state.list.concat();
            list.forEach((plan, i) => {
                if (plan.id === data.id) {
                    list[i] = data;
                }
            });
            return { ...state, saving: false, saved: true, error: null, list: list };
        }
        case 'UPDATE_PLAN_REJECTED':
            return { ...state, saving: false, saved: false, error: payload };
        //endregion

        //region GET_PLAN_INFO
        case 'GET_PLAN_INFO_PENDING':
            return {
                ...state,
                loading: true,
                error: null,
                plan: { ...initialState.plan }
            };
        case 'GET_PLAN_INFO_FULFILLED':
            return { ...state, loading: false, plan: payload.data };
        case 'GET_PLAN_INFO_REJECTED':
            return { ...state, loading: false, plan: { ...initialState.plan } };
        //endregion

        //region DELETE_PLAN
        case 'DELETE_PLAN_PENDING': {
            let list = state.list.concat();
            list.forEach(plan => {
                if(plan.id === payload){
                    plan['deleting'] = true;
                }
            });
            return {...state, list: list};
        }
        case 'DELETE_PLAN_FULFILLED':
            return {...state, list: state.list.filter(plan => plan.id !== payload)};
        case 'DELETE_PLAN_REJECTED': {
            let list = state.list.concat();
            list.forEach(plan => {
                plan['deleting'] = false;
            });
            return {...state, list: list};
        }
        //endregion

        default:
            return state;
    }
}