const initialState = {
    data: [],
}

export default function PembelajaranReducer(state = initialState, action) {

    if (action.type === 'SET_PEMBELAJARAN') {
        return {
            ...state,
            data: action.payload
        };
    }
    return state
}