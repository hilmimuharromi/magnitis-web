import React, { useEffect, useState } from "react"
import { Button, Modal, Row, Col, Tooltip, Table, Space, message } from "antd"
import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { GetListQuiz, SetPembelajaran } from "stores/action"
import { PreviewQuiz } from "components/kuis"

const ListKuis = (props) => {
    const { data, loading, GetListQuiz, SetPembelajaran, dataPembelajaran } = props
    const [preview, setPreview] = useState(false)
    const [current, setCurrent] = useState("")

    useEffect(() => {
        GetListQuiz()
        // eslint-disable-next-line
    }, [])

    const pilih = (item) => {
        const check = dataPembelajaran.find(element => element._id === item._id)
        if (check) {
            return message.info("data sudah ada")
        } else {
            let payload = {
                _id: item._id,
                flag: "quiz",
                title: item.title
            }
            SetPembelajaran([...dataPembelajaran, payload])
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
                <Tooltip title="Pilih">
                    <Button
                        icon={<CheckOutlined />}
                        onClick={() => {
                            pilih(item)
                        }} />
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
            <Row justify="center">
                <Col>
                    <Table loading={loading} bordered dataSource={data} columns={columns} />
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => {
    const { ListQuiz, Pembelajaran } = state;
    const { data, loading } = ListQuiz

    return {
        data: data,
        loading,
        dataPembelajaran: Pembelajaran.data
    };
}
const mapDispatchToProps = {
    GetListQuiz,
    SetPembelajaran
}

export default connect(mapStateToProps, mapDispatchToProps)(ListKuis);