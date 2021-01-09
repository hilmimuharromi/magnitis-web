import React, { useState, useEffect } from "react"
import { connect, useDispatch } from 'react-redux';
import EditorContainer from "components/editor"
import PreviewMateri from "components/previewMateri"
import { Row, Col, Button, Divider, Modal, message, Skeleton } from "antd"
import { GetPage, SetStatusSimpanPage, SimpanPage, SetDataPage } from "stores/action"


const KiKd = (props) => {
    const dispatch = useDispatch()
    const {
        data, loading, statusSimpan, GetPage, SetStatusSimpanPage, SimpanPage, SetDataPage
    } = props
    const [preview, setPreview] = useState(false)

    useEffect(() => {
        GetPage("ki-kd")
        // eslint-disable-next-line
    }, [])

    const handleSimpan = () => {
        const payload = {
            title: "ki-kd",
            content: data
        }
        SimpanPage(payload)
    }

    if (statusSimpan) {
        message.success("berhasil simpan")
        dispatch(SetStatusSimpanPage(false))
    }

    if (loading) {
        return (
            <Row justify="center">
                <Skeleton />
            </Row>
        )
    }

    return (
        <>
            <Modal visible={preview} onCancel={() => setPreview(false)} width="600px">
                <PreviewMateri title={"KI / KD"} content={data} />
            </Modal>
            <Row style={{ marginBottom: "10px" }}>
                <Divider>
                    <h2>KI / KD</h2>
                </Divider>
            </Row>
            <Row justify="center">
                <Col span={14}>
                    {loading ? <>Loading ....</> :
                        <EditorContainer
                            data={data}
                            setData={(data) => SetDataPage(data)} />
                    }
                    <Row justify="start" gutter={8}>
                        {/* <Col span={10}>
                            <Button danger>Reset Form</Button>
                        </Col> */}
                        <Col>
                            <Row justify="start" gutter={8}>
                                <Col>
                                    <Button onClick={() => setPreview(true)}>Preview</Button>
                                </Col>
                                <Col>
                                    <Button loading={loading} type="primary" onClick={handleSimpan} >Simpan</Button>
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
    const { Pages } = state;
    const { data, loading, status } = Pages
    return {
        data,
        loading,
        statusSimpan: status

    };
}
const mapDispatchToProps = {
    GetPage, SetStatusSimpanPage, SimpanPage, SetDataPage
}

export default connect(mapStateToProps, mapDispatchToProps)(KiKd);