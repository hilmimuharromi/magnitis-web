import React, { useState } from "react"
import { Button, Spin, message, Input, Modal, Image, Popconfirm, Tag } from "antd"
import axios from "axios"
export default function DataLampiran(props) {
    const { item, setFile, deleteItem } = props
    const [loading, setLoading] = useState(false)
    const hiddenFileInput = React.useRef(null)
    const [preview, setPreview] = useState(false)

    const uploadFile = async (e) => {
        const file = e.target.files[0]
        if (!file) return ""
        const formData = new FormData()
        formData.append("image", file)
        const dataFile = {
            number: item.number,
            imageUrl: ""
        }
        try {
            setLoading(true)
            const { data, status } = await axios({
                method: "post",
                url: "https://api.imgbb.com/1/upload?key=68f0a2cb8234add30ae895949f18c671",
                data: formData
            })
            if (status) {
                // console.log(data, "result upload")
                dataFile.imageUrl = data.data.image.url
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
            <div style={{ display: "flex", justifyContent: "start" }}>
                <Tag style={{ margin: "5px" }} color="blue">{item.number}</Tag>
                <div style={{ margin: "5px" }}>
                    <Input value={item.imageUrl} disabled width={400} />
                </div>
                <div style={{ margin: "5px" }}>
                    <input type="file" ref={hiddenFileInput} onChange={uploadFile} style={{ display: 'none' }} />
                    <Button disabled={loading} onClick={onClick}>Upload  {loading ? <Spin size="small" /> : ""}</Button>
                </div>
                <div style={{ margin: "5px" }}>
                    <Button onClick={() => setPreview(true)}>Preview</Button>
                </div>
                <div style={{ margin: "5px" }}>
                    <Popconfirm
                        title="Yakin Hapus gambar ini?"
                        onConfirm={() => deleteItem(item.number)}
                        // onCancel={cancel}
                        okText="Ya"
                        cancelText="Tidak"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </div>
            </div>
            <Modal visible={preview} onCancel={() => setPreview(false)}>
                <Image
                    width={"100%"}
                    src={item.imageUrl}
                />

            </Modal>
        </>
    )
}