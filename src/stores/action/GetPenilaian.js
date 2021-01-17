import axios from "axios"
const GetPenilaian = () => {
    return async (dispatch) => {
        dispatch(SetLoading(true))
        try {
            const { data, status } = await axios.get(`${window.env.API_URL}/resultquiz`)
            if (status) {
                dispatch(SetPenilaian(data))
            }
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(SetLoading(false))
        }
    }
}

const SetPenilaian = (data) => {
    return { type: 'SET_PENILAIAN', payload: data };
}
const SetLoading = (data) => {
    return { type: 'SET_LOADING_PENILAIAN', payload: data };
}

export { GetPenilaian }
