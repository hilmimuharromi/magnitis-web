import React, { useState } from "react"
import { Button, Spin, message } from "antd"
import axios from "axios"
export default function DataLampiran(props) {
    const { setFile, fileBerkas, path } = props
    // const dataUser = getUser()
    const [loading, setLoading] = useState(false)
    const hiddenFileInput = React.useRef(null)

    // const deleteFile = async (e) => {
    //     try {
    //         const result = await HttpRequest.delete({
    //             url: `${REACT_APP_HDFS}/v1/hdfs/delete?path=${fileBerkas}`
    //         })
    //         if (result) {
    //             console.log("hapus file", result)
    //         }
    //     } catch (e) {

    //     }
    //     finally {

    //     }
    // }

    const uploadFile = async (e) => {
        const file = e.target.files[0]
        if (!file) return ""
        if (fileBerkas) {
            console.log(" file berkas delete", fileBerkas)
            // deleteFile()
        }
        // if (file.type !== "application/pdf") return message.info("Hanya Format PDF")
        const formData = new FormData()
        formData.append("file", file)
        console.log(formData.get("file"))
        const dataFile = {
            name: file.name,
            url: ""
        }
        try {
            setLoading(true)
            const { data } = await axios.post({
                url: "https://api.imgbb.com/1/upload?key=68f0a2cb8234add30ae895949f18c671",
                data: formData
            })
            if (data.status === "success") {
                dataFile.url = data.item
                setFile(dataFile)
            } else {
                message.error("gagal Upload File")
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const onClick = () => {
        hiddenFileInput.current.click()
    }
    return (
        <>
            <input type="file" ref={hiddenFileInput} onChange={uploadFile} style={{ display: 'none' }} />
            <Button disabled={loading} onClick={onClick}>Upload  {loading ? <Spin size="small" /> : ""}</Button>
        </>
    )
}