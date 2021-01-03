const initialState = {
    data: [{ title: "1" }, { title: "1" }, { title: "1" }],
    loading: false
}

export default function EditorReducer(state = initialState, action) {

    if (action.type === 'SET_LIST_MATERI') {
        return {
            ...state,
            data: action.payload
        };
    } else if (action.type === 'SET_LOADING_LIST_MATERI') {
        return {
            ...state,
            loading: action.payload
        };
    }
    return state
}