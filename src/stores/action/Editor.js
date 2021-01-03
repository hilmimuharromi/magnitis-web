const SetEditor = (data) => {
    return {
        type: 'SET_EDITOR', payload: data
    };
}

const ResetEditor = (data) => {
    return {
        type: 'RESET_EDITOR', payload: data
    };
}



export {
    SetEditor,
    ResetEditor
}