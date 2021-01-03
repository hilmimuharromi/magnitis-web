const initialState = {
    title: "",
    content: "",
    loading: false
}

export default function FormMateriReducer(state = initialState, action) {

    if (action.type === 'SET_TITLE') {
        return {
            ...state,
            title: action.payload
        };
    } else if (action.type === 'SET_CONTENT') {
        return {
            ...state,
            content: action.payload
        };
    } else if (action.type === 'SET_UPDATE_MATERI') {
        return {
            ...state,
            title: action.payload.title,
            content: action.payload.content,
            id: action.payload._id
        };
    } else if (action.type === 'RESET_FORM_MATERI') {
        return {
            ...state,
            title: "",
            content: "",
            id: "",
            loading: false
        };
    }
    return state
}