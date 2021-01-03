const SetUpdateKuis = (data) => {
    return { type: 'SET_UPDATE_KUIS', payload: data };
}

const ResetFormKuis = (data) => {
    return { type: 'RESET_FORM_KUIS', payload: data };
}

const SetTitleKuis = (data) => {
    return { type: 'SET_TITLE_KUIS', payload: data };
}

const SetContentsKuis = (data) => {
    return { type: 'SET_CONTENTS_KUIS', payload: data };
}

const SetTimeKuis = (data) => {
    return { type: 'SET_TIME_KUIS', payload: data };
}

const SetTryAgainKuis = (data) => {
    return { type: 'SET_TRYAGAIN_KUIS', payload: data };
}




export {
    SetTitleKuis,
    SetContentsKuis,
    SetUpdateKuis,
    ResetFormKuis,
    SetTimeKuis,
    SetTryAgainKuis
}
