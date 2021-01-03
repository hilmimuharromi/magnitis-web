const initialState = {
    data: "",
    reset: false
}

export default function EditorReducer(state = initialState, action) {

    if (action.type === 'SET_EDITOR') {
        return {
            ...state,
            data: action.payload
        };
    } else if (action.type === 'RESET_EDITOR') {
        return {
            ...state,
            data: action.payload
        };
    }
    return state
}