import axios from "axios"
const GetListPetunjuk = () => {
    return async (dispatch) => {
        dispatch(SetLoading(true))
        try {
            const { data, status } = await axios.get(`${window.env.API_URL}/petunjuk`)
            if (status) {
                dispatch(SetPetunjuk(data))
            }
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(SetLoading(false))
        }
    }
}

const SetPetunjuk = (data) => {
    return { type: 'SET_LIST_PETUNJUK', payload: data };
}
const SetLoading = (data) => {
    return { type: 'SET_LOADING_LIST_PETUNJUK', payload: data };
}

export { GetListPetunjuk, SetPetunjuk }
