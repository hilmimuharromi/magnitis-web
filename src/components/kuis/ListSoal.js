import React, { useState } from "react"
import { Table, Space, Button, Modal } from "antd"
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import SinglePreview from "./SinglePreview"
import { connect } from 'react-redux';
import { SetContentsKuis, SetCurrentSoal, ResetFormSoal } from "stores/action"
const ListSoal = (props) => {
    const { contents, SetCurrentSoal, SetBuatSoal, SetContentsKuis, ResetFormSoal } = props
    const [dataPreview, setDataPreview] = useState("")
    const [lihat, setLihat] = useState(false)


    const deleteSoal = (key) => {
        let newData = contents.filter((item) => item.key !== key)
        let fixData = newData.map((item, index) => {
            item.key = index + 1
            return item
        })
        SetContentsKuis(fixData)
    }


    const columns = [
        {
            title: 'Nomor',
            dataIndex: 'key',
        },
        {
            title: 'Tipe',
            dataIndex: 'options',
            render: (text) => <p>{text.length > 0 ? "Pilihan" : "Essay"}</p>
        },
        {
            title: 'Point',
            dataIndex: 'point',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        setDataPreview(record)
                        setLihat(true)

                    }} icon={<EyeOutlined />} />
                    <Button
                        onClick={() => {
                            ResetFormSoal()
                            SetCurrentSoal(record)
                            SetBuatSoal(true)
                            console.log(record.key)
                        }}
                        icon={<EditOutlined />} />
                    <Button onClick={() => deleteSoal(record.key)} danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ]
    return (
        <>
            <Modal width={"700px"} visible={lihat} onCancel={() => setLihat(false)}>
                <SinglePreview question={dataPreview.question} options={dataPreview.options} />
            </Modal>
            <Table
                style={{ marginTop: "10px" }}
                bordered
                columns={columns}
                title={() => 'List Soal'}
                dataSource={contents} />
        </>
    )
}

const mapStateToProps = state => {
    const { FormKuis, } = state;
    const { contents } = FormKuis
    return {
        contents,
    };
}
const mapDispatchToProps = {
    SetCurrentSoal,
    SetContentsKuis,
    ResetFormSoal
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSoal);