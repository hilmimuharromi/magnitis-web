const initialState = {
    question: "",
    options: [],
    point: 0,
    key: ""
}

export default function FormMateriReducer(state = initialState, action) {

    if (action.type === 'SET_QUESTION') {
        return {
            ...state,
            question: action.payload
        };
    } else if (action.type === 'SET_POINT') {
        return {
            ...state,
            point: action.payload,
        };
    } else if (action.type === 'SET_OPTIONS') {
        return {
            ...state,
            options: action.payload,
        };
    } else if (action.type === 'SET_CURRENT_SOAL') {
        return {
            ...state,
            question: action.payload.question,
            key: action.payload.key,
            options: action.payload.options,
            point: action.payload.point,
        };
    } else if (action.type === 'RESET_FORM_SOAL') {
        return {
            ...state,
            question: "",
            options: [],
            point: 0,
            key: ""
        };
    }
    return state
}