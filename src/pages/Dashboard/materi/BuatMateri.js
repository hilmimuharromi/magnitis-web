import React, { useState } from "react"
import { connect } from 'react-redux';
import EditorContainer from "components/editor"
import PreviewMateri from "components/previewMateri"
import { Row, Col, Input, Button, Divider, Modal, message } from "antd"
import { SetTitle, SetContent, SetUpdateMateri, ResetFormMateri } from "stores/action"
import axios from 'axios';


const BuatMateri = (props) => {
    const {
        content,
        SetContent,
        title,
        SetTitle,
        dataUser,
        id, ResetFormMateri
    } = props
    const [preview, setPreview] = useState(false)
    const [loading, setLoading] = useState(false)

    const reset = () => {
        SetContent("")
        SetTitle("")
    }

    const simpanData = async () => {
        setLoading(true)
        let payload = {
            title,
            content,
            flagMateri: true,
            userId: dataUser.userId
        }
        console.log(payload)
        try {
            const { data } = await axios({
                method: "post",
                url: `${window.env.API_URL}/post`,
                data: payload
            })
            if (data.status) {
                console.log(data)
                ResetFormMateri()
                return message.success(` berhasil Simpan Materi`)
            }
        } catch (e) {
            console.log("error login", e)
            let { data } = e.response
            if (data.message) {
                return message.error(data.message)
            } else {
                return message.error("gagal simpan")
            }
        } finally {
            setLoading(false)
        }
    }

    const updateData = async () => {
        setLoading(true)
        let payload = {
            postId: id,
            title,
            content,
            flagMateri: true,
            userId: dataUser.userId
        }
        console.log(payload)
        try {
            const { data } = await axios({
                method: "put",
                url: `${window.env.API_URL}/post`,
                data: payload
            })
            if (data.status) {
                console.log(data)
                // reset()
                ResetFormMateri()
                return message.success(` berhasil Update Materi`)
            }
        } catch (e) {
            console.log("error login", e)
            let { data } = e.response
            if (!data) return message.error("gagal simpan")
            if (data.message) {
                return message.error(data.message)
            } else {
                return message.error("gagal simpan")
            }
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Modal visible={preview} onCancel={() => setPreview(false)} width="600px">
                <PreviewMateri title={title} content={content} />
            </Modal>
            <Row style={{ marginBottom: "10px" }}>
                <Divider>
                    <h2>Buat Materi</h2>
                </Divider>
            </Row>
            <Row justify="center">
                <Col span={14}>
                    {/* <CoverUpload /> */}
                    <Input
                        value={title}
                        onChange={(e) => {
                            console.log(e.target.value)
                            SetTitle(e.target.value)
                        }}
                        placeholder={"Judul"}
                        style={{ width: "100%" }}
                    />
                    <EditorContainer
                        data={content}
                        setData={(data) => SetContent(data)} />

                    <Row justify="start" gutter={8}>
                        <Col span={10}>
                            <Button danger onClick={() => reset()}>Reset Form</Button>
                        </Col>
                        <Col>
                            <Row justify="start" gutter={8}>
                                <Col>
                                    <Button onClick={() => setPreview(true)}>Preview</Button>
                                </Col>
                                <Col>
                                    <Button loading={loading} type="primary" onClick={() => id ? updateData() : simpanData()}>Simpan</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => {
    const { FormMateri, User } = state;
    const { title, content, id } = FormMateri
    const { data } = User
    console.log("data state", FormMateri)

    return {
        content,
        title,
        id,
        dataUser: data,
    };
}
const mapDispatchToProps = {
    SetContent,
    SetTitle, SetUpdateMateri, ResetFormMateri
}

export default connect(mapStateToProps, mapDispatchToProps)(BuatMateri);