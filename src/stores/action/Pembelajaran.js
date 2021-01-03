import axios from "axios"

const GetPembelajaran = () => {
    return async (dispatch) => {
        dispatch(SetLoading(true))
        try {
            const { data } = await axios.get(`${window.env.API_URL}/playlist/Magnitis`)
            if (data.status) {
                const contents = data.data.contents
                let dataFix = []
                contents.map((item) => {
                    let payload = {
                        _id: item.flag === "post" ? item.post._id : item.quiz._id,
                        flag: item.flag,
                        title: item.flag === "post" ? item.post.title : item.quiz.title
                    }
                    return dataFix.push(payload)
                })
                dispatch(SetPembelajaran(dataFix))
                console.log("list pembelajaran", dataFix)
            }
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(SetLoading(false))
        }
    }
}




const SetPembelajaran = (data) => {
    return { type: 'SET_PEMBELAJARAN', payload: data };
}

const SetLoading = (data) => {
    return { type: 'SET_LOADING_PEMBELAJARAN', payload: data };
}

export {
    SetPembelajaran,
    GetPembelajaran
}