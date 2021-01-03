import axios from "axios"
const GetListMateri = () => {
    return async (dispatch) => {
        dispatch(SetLoading(true))
        try {
            const { data } = await axios.get(`${window.env.API_URL}/posts`)
            if (data.status) {
                console.log("list materi", data)
                dispatch(SetMateri(data.data))
            }
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(SetLoading(false))
        }
    }
}

const SetMateri = (data) => {
    return { type: 'SET_LIST_MATERI', payload: data };
}
const SetLoading = (data) => {
    return { type: 'SET__LOADING_LIST_MATERI', payload: data };
}

export { GetListMateri }
