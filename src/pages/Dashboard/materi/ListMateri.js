import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';
import { Card, Button, Modal, Row, Col, Tooltip, Divider, Popconfirm, message } from "antd"
import { useHistory } from "react-router-dom"
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PreviewMateri from "components/previewMateri"
import { GetListMateri, SetUpdateMateri } from "stores/action"
import axios from 'axios';

const ListMateri = (props) => {
    const history = useHistory()
    const { data, loading, GetListMateri, SetUpdateMateri } = props
    const [preview, setPreview] = useState(false)
    const [current, setCurrent] = useState("")

    useEffect(() => {
        GetListMateri()
        // eslint-disable-next-line
    }, [])

    const deleteMateri = async (item) => {
        try {
            const { data } = await axios({
                method: "delete",
                url: `${window.env.API_URL}/post/${item._id}`,
            })
            if (data.status) {
                GetListMateri()
                return message.info("berhasil hapus Materi")
            }
        } catch (e) {
            return message.error("Gagal hapus materi")
        }
    }

    const ButtonCard = (item) => {
        return (
            <Row justify="space-between" gutter={8}>
                <Tooltip title="Lihat Materi">
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setCurrent(item)
                            setPreview(true)
                        }} />
                </Tooltip>
                <Tooltip title="Edit Materi">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            console.log(item)
                            SetUpdateMateri(item)
                            history.push("/buat-materi")
                        }} />
                </Tooltip>
                <Tooltip title="Delete Materi">
                    <Popconfirm
                        title="Anda Yakin Mau menghapus materi ini?"
                        onConfirm={() => deleteMateri(item)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                console.log(item)
                            }} />
                    </Popconfirm>
                </Tooltip>
            </Row>
        )
    }
    return (
        <>
            <Modal width={"700px"} visible={preview} onCancel={() => setPreview(false)}>
                <PreviewMateri title={current.title} content={current.content} />
            </Modal>
            <Row style={{ marginBottom: "10px" }}>
                <Divider>
                    <h2>List Materi</h2>
                </Divider>
            </Row>
            <Row justify={"center"} gutter={8}>
                {
                    data.map((item) => (
                        <Col>
                            <Card loading={loading} style={{ width: "200px" }} title={item.title}>
                                {ButtonCard(item)}
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            {/* {JSON.stringify(current)} */}
        </>
    )
}

const mapStateToProps = state => {
    const { ListMateri } = state;
    const { data, loading } = ListMateri

    return {
        data: data,
        loading
    };
}
const mapDispatchToProps = {
    GetListMateri,
    SetUpdateMateri
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMateri);