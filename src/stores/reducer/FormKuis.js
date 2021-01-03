const initialState = {
    title: "",
    contents: [],
    tryAgain: false,
    time: 60,
    loading: false,
    id: ""
}

export default function FormMateriReducer(state = initialState, action) {

    if (action.type === 'SET_TITLE_KUIS') {
        return {
            ...state,
            title: action.payload
        };
    } else if (action.type === 'SET_CONTENTS_KUIS') {
        return {
            ...state,
            contents: action.payload
        };
    } else if (action.type === 'SET_TRYAGAIN_KUIS') {
        return {
            ...state,
            tryAgain: action.payload
        };
    } else if (action.type === 'SET_TIME_KUIS') {
        return {
            ...state,
            time: action.payload
        };
    } else if (action.type === 'SET_UPDATE_KUIS') {
        return {
            ...state,
            title: action.payload.title,
            contents: action.payload.contents,
            id: action.payload._id,
            tryAgain: action.payload.tryAgain,
            time: action.payload.time,
        };
    } else if (action.type === 'RESET_FORM_KUIS') {
        return {
            ...state,
            title: "",
            contents: [],
            tryAgain: false,
            time: 60,
            id: "",
            loading: false
        };
    } else if (action.type === 'SET_LOADING_KUIS') {
        return {
            ...state,
            loading: action.payload
        };
    }
    return state
}