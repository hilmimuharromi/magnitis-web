import React, { useEffect, useState } from "react"
import { Button, Modal, Row, Col, Tooltip, Divider, Table, Space, Popconfirm, message } from "antd"
import { useHistory } from "react-router-dom"
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { GetListQuiz, SetUpdateKuis } from "stores/action"
import { PreviewQuiz } from "components/kuis"
import axios from 'axios';



const ListKuis = (props) => {
    const history = useHistory()

    const { data, loading, GetListQuiz, SetUpdateKuis } = props
    const [preview, setPreview] = useState(false)
    const [current, setCurrent] = useState("")

    useEffect(() => {
        GetListQuiz()
        // eslint-disable-next-line
    }, [])

    const deleteQuiz = async (item) => {
        try {
            const { data } = await axios({
                method: "delete",
                url: `${window.env.API_URL}/quiz/${item._id}`,
            })
            if (data.status) {
                GetListQuiz()
                return message.info("berhasil hapus quiz")
            }
        } catch (e) {
            return message.error("Gagal hapus quiz")
        }
    }

    const ButtonCard = (item) => {
        return (
            <Space>
                <Tooltip title="Lihat Kuis">
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setCurrent(item)
                            setPreview(true)
                        }} />
                </Tooltip>
                <Tooltip title="Edit Kuis">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            console.log(item)
                            SetUpdateKuis(item)
                            history.push("/buat-kuis")
                        }} />
                </Tooltip>
                <Tooltip title="Delete Kuis">
                    <Popconfirm
                        title="Anda Yakin Mau menghapus kuis ini?"
                        onConfirm={() => deleteQuiz(item)}
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
            </Space>
        )
    }

    const columns = [
        {
            title: 'Judul',
            dataIndex: 'title',
        },
        {
            title: 'Durasi',
            dataIndex: 'time',
            render: (text) => <p>{text} menit</p>
        },
        {
            title: 'Bisa Diulang',
            dataIndex: 'tryAgain',
            render: (text) => <p>{text ? "ya" : "tidak"}</p>
        },
        {
            title: "Aksi",
            key: "action",
            render: (text, record) => ButtonCard(record)
        }
    ]

    return (
        <>
            <Modal width={"800px"} visible={preview} onCancel={() => setPreview(false)}>
                <PreviewQuiz data={current} />
            </Modal>
            <Row style={{ marginBottom: "10px" }}>
                <Divider>
                    <h2>List Kuis</h2>
                </Divider>
            </Row>
            <Row justify="center">
                <Col>
                    <Table loading={loading} bordered dataSource={data} columns={columns} />
                </Col>
            </Row>
            {/* <h2>{JSON.stringify(data)}</h2> */}
        </>
    )
}

const mapStateToProps = state => {
    const { ListQuiz } = state;
    const { data, loading } = ListQuiz

    return {
        data: data,
        loading
    };
}
const mapDispatchToProps = {
    GetListQuiz,
    SetUpdateKuis
}

export default connect(mapStateToProps, mapDispatchToProps)(ListKuis);