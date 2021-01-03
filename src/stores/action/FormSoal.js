const SetQuestion = (data) => {
    console.log("set question", data)
    return { type: 'SET_QUESTION', payload: data };
}


const SetPointSoal = (data) => {
    return { type: 'SET_POINT', payload: data };
}

const SetOptionsSoal = (data) => {
    return { type: 'SET_OPTIONS', payload: data };
}

const SetCurrentSoal = (data) => {
    return { type: 'SET_CURRENT_SOAL', payload: data };
}

const ResetFormSoal = (data) => {
    return { type: 'RESET_FORM_SOAL', payload: data };
}

export {
    SetQuestion,
    SetPointSoal,
    SetOptionsSoal,
    SetCurrentSoal,
    ResetFormSoal
}