import React, { useEffect, useState } from "react"
import { Button, Modal, Row, Col, Tooltip, Table, Space, message } from "antd"
import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { GetListMateri, SetPembelajaran } from "stores/action"
import PreviewMateri from "components/previewMateri"

const ListMateri = (props) => {

    const { data, loading, SetPembelajaran, dataPembelajaran } = props
    const [preview, setPreview] = useState(false)
    const [current, setCurrent] = useState("")

    useEffect(() => {
        GetListMateri()
        // eslint-disable-next-line
    }, [])

    const pilih = (item) => {
        const check = dataPembelajaran.find(element => element._id === item._id)
        if (check) {
            return message.info("data sudah ada")
        } else {
            let payload = {
                _id: item._id,
                flag: "post",
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
            title: "Aksi",
            key: "action",
            render: (text, record) => ButtonCard(record)
        }
    ]

    return (
        <>
            <Modal width={"800px"} visible={preview} onCancel={() => setPreview(false)}>
                <PreviewMateri title={current.title} content={current.content} />
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
    const { ListMateri, Pembelajaran } = state;
    const { data, loading } = ListMateri

    return {
        data: data,
        loading,
        dataPembelajaran: Pembelajaran.data
    };
}
const mapDispatchToProps = {
    GetListMateri,
    SetPembelajaran
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMateri);