const initialState = {
    data: [],
    loading: false
}

export default function PetunjukReducer(state = initialState, action) {

    if (action.type === 'SET_LIST_PETUNJUK') {
        return {
            ...state,
            data: action.payload
        };
    } else if (action.type === 'SET_LOADING_LIST_PETUNJUK') {
        return {
            ...state,
            loading: action.payload
        };
    }
    return state
}