import React, { useState, useEffect } from "react"
import { connect, useDispatch } from 'react-redux';
import EditorContainer from "components/editor"
import PreviewMateri from "components/previewMateri"
import { Row, Col, Button, Divider, Modal, message, Skeleton } from "antd"
import { GetPage, SetStatusSimpanPage, SimpanPage, SetDataPage } from "stores/action"


const Pendahuluan = (props) => {
    const dispatch = useDispatch()
    const {
        dataPendahuluan, loading, statusSimpan, GetPage, SetStatusSimpanPage, SimpanPage, SetDataPage
    } = props
    const [preview, setPreview] = useState(false)

    useEffect(() => {
        GetPage("pendahuluan")
        // eslint-disable-next-line
    }, [])

    const handleSimpan = () => {
        const payload = {
            title: "pendahuluan",
            content: dataPendahuluan
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
                <PreviewMateri title={"pendahuluan"} content={dataPendahuluan} />
            </Modal>
            <Row style={{ marginBottom: "10px" }}>
                <Divider>
                    <h2>Pendahuluan</h2>
                </Divider>
            </Row>
            <Row justify="center">
                <Col span={14}>
                    {loading ? <>Loading ....</> :
                        <EditorContainer
                            data={dataPendahuluan}
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
        dataPendahuluan: data,
        loading,
        statusSimpan: status

    };
}
const mapDispatchToProps = {
    GetPage, SetStatusSimpanPage, SimpanPage, SetDataPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Pendahuluan);