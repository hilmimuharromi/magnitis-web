const initialState = {
    data: "",
    loading: false,
    error: "",
    status: false
}

export default function PagesReducer(state = initialState, action) {

    if (action.type === 'SET_DATA_PAGE') {
        return {
            ...state,
            data: action.payload
        };
    } else if (action.type === 'SET_LOADING_PAGE') {
        return {
            ...state,
            loading: action.payload
        };
    } else if (action.type === 'SET_STATUS_SIMPAN_PAGE') {
        return {
            ...state,
            status: action.payload
        };
    } else if (action.type === 'ERROR_SIMPAN_PAGE') {
        return {
            ...state,
            error: action.payload
        };
    }
    return state
}