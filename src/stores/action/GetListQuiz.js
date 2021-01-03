import axios from "axios"
const GetListQuiz = () => {
    return async (dispatch) => {
        dispatch(SetLoading(true))
        try {
            const { data } = await axios.get(`${window.env.API_URL}/quiz`)
            if (data.status) {
                console.log("list quiz", data)
                dispatch(SetQuiz(data.data))
            }
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(SetLoading(false))
        }
    }
}

const SetQuiz = (data) => {
    return { type: 'SET_LIST_QUIZ', payload: data };
}
const SetLoading = (data) => {
    return { type: 'SET__LOADING_LIST_QUIZ', payload: data };
}

export { GetListQuiz }
