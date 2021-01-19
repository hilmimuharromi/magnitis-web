import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';
import { GetPenilaian } from "stores/action"
import { Table, Row, Button, Input, Modal, message, Space, Tooltip, Popconfirm, } from "antd"
import { DeleteOutlined, } from '@ant-design/icons';
import axios from "axios"
import moment from "moment"
import { KoreksiPenilaian } from "components/kuis"
const { Search } = Input;
const Penilaian = ({ data, loading, GetPenilaian }) => {
    const [filterData, setFilterData] = useState([])
    const [visibleKoreksi, setVisibleKoreksi] = useState(false)
    const [dataKoreksi, setDataKoreksi] = useState("")
    const [loadingDelete, setLoadingDelete] = useState(false)

    useEffect(() => {
        GetPenilaian()
        //eslint-disable-next-line
    }, [])

    const deleteNilai = async (record) => {
        setLoadingDelete(true)
        try {
            const result = await axios({
                method: "delete",
                url: `${window.env.API_URL}/resultquiz/${record._id}`,
            })
            if (result) {
                message.info("success delete nilai")
                GetPenilaian()
            }
        } catch (e) {
            console.log(e, "error delete nilai")
        } finally {
            setLoadingDelete(false)

        }

    }

    const columns = [
        {
            title: 'Nama Siswa',
            dataIndex: 'user',
            render: (text) => text.name
        },
        {
            title: 'Email Siswa',
            dataIndex: 'user',
            render: (text) => text.email
        },
        {
            title: 'Judul Kuis',
            dataIndex: 'quiz',
            render: (text) => text.title
        },
        {
            title: 'Nilai',
            dataIndex: 'score',
            render: (text) => text
        },
        {
            title: 'Waktu Ujian',
            dataIndex: 'createdAt',
            render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss")
        },
        {
            title: 'Aksi',
            dataIndex: 'operation',
            render: (text, record) => <Space>

                <Button onClick={() => {
                    setVisibleKoreksi(true)
                    setDataKoreksi(record)
                }}>Koreksi</Button>
                <Tooltip title="Delete Nilai" >
                    <Popconfirm
                        title="Anda Yakin Mau menghapus Nilai ini?"
                        onConfirm={() => deleteNilai(record)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            loading={loadingDelete}
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Tooltip>
            </Space>
        },
    ]

    const onSearch = (text) => {
        console.log(text)
        const newData = data.filter((item) => {
            return item.quiz.title.toUpperCase().includes(text.toUpperCase())
                || item.user.name.toUpperCase().includes(text.toUpperCase())
                || item.user.email.toUpperCase().includes(text.toUpperCase())
        })
        setFilterData(newData)
    }

    return (
        <>
            <Row justify="center">
                <Search style={{ width: 400, marginBottom: 10 }} placeholder="Nama / Email / Judul" onSearch={onSearch} enterButton />
            </Row>
            <Row justify="center">
                <Table
                    loading={loading}
                    bordered
                    dataSource={filterData.length > 0 ? filterData : data}
                    columns={columns}
                />
            </Row>
            <Modal width={"50%"} title="Koreksi Nilai" visible={visibleKoreksi} onCancel={() => setVisibleKoreksi(false)} footer={null} >
                <KoreksiPenilaian data={dataKoreksi} setSuccess={() => {
                    setVisibleKoreksi(false)
                    GetPenilaian()
                    message.success("sukses koreksi nilai")
                }} />
            </Modal>
        </>
    )

}


const mapStateToProps = state => {
    const { ListPenilaian } = state;
    const { data, loading } = ListPenilaian
    return {
        data,
        loading,
    };
}
const mapDispatchToProps = {
    GetPenilaian
}

export default connect(mapStateToProps, mapDispatchToProps)(Penilaian);