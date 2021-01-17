const initialState = {
    data: [],
    loading: false
}

export default function PenilaiankReducer(state = initialState, action) {

    if (action.type === 'SET_PENILAIAN') {
        return {
            ...state,
            data: action.payload
        };
    } else if (action.type === 'SET_LOADING_PENILAIAN') {
        return {
            ...state,
            loading: action.payload
        };
    }
    return state
}