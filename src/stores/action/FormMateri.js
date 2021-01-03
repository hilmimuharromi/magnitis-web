const SetUpdateMateri = (data) => {
    return { type: 'SET_UPDATE_MATERI', payload: data };
}

const ResetFormMateri = (data) => {
    return { type: 'RESET_FORM_MATERI', payload: data };
}

const SetTitle = (data) => {
    return { type: 'SET_TITLE', payload: data };
}

const SetContent = (data) => {
    return { type: 'SET_CONTENT', payload: data };
}



export {
    SetTitle,
    SetContent,
    SetUpdateMateri,
    ResetFormMateri
}