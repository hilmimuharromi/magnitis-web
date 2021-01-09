import axios from "axios"


const SimpanPage = (payload) => {
    return async (dispatch) => {
        dispatch(SetLoading(true))
        try {
            const { data } = await axios({
                method: "post",
                url: `${window.env.API_URL}/page`,
                data: payload
            })
            if (data.status) {
                dispatch(GetPage(payload.title))
                dispatch(SetStatusSimpanPage(true))
            }
        } catch (e) {

            console.log("error login", e)
        } finally {
            dispatch(SetStatusSimpanPage(false))
            // dispatch(SetLoading(false))
        }
    }
}


const GetPage = (title) => {
    return async (dispatch) => {
        dispatch(SetLoading(true))
        try {
            const { data } = await axios.get(`${window.env.API_URL}/page/${title}`)
            if (data.status) {
                console.log("get page", data)
                dispatch(SetDataPage(data.data.content))
            }
        } catch (e) {
            dispatch(SetDataPage("<p>/<p>"))

            console.log(e)
        } finally {
            dispatch(SetLoading(false))
        }
    }
}


const SetDataPage = (data) => {
    return { type: 'SET_DATA_PAGE', payload: data };
}
const SetStatusSimpanPage = (data) => {
    return { type: 'SET_STATUS_SIMPAN_PAGE', payload: data };
}

const SetLoading = (data) => {
    return { type: 'SET_LOADING_PAGE', payload: data };
}



export {
    GetPage,
    SimpanPage,
    SetDataPage,
    SetStatusSimpanPage
}