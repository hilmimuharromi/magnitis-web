import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';
import { GetPenilaian } from "stores/action"
import { Table, Row, Button, Input, Modal, Card, Col } from "antd"
import moment from "moment"
import { KoreksiPenilaian } from "components/kuis"
const { Search } = Input;
const Penilaian = ({ data, loading, GetPenilaian }) => {
    const [filterData, setFilterData] = useState([])
    const [visibleKoreksi, setVisibleKoreksi] = useState(false)
    const [dataKoreksi, setDataKoreksi] = useState("")

    useEffect(() => {
        GetPenilaian()
        //eslint-disable-next-line
    }, [])

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
            render: (text, record) => <Button onClick={() => {
                setVisibleKoreksi(true)
                setDataKoreksi(record)
            }}>Koreksi</Button>
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
                    bordered
                    dataSource={filterData.length > 0 ? filterData : data}
                    columns={columns}
                />
            </Row>
            <Modal width={"50%"} title="Koreksi Nilai" visible={visibleKoreksi} onCancel={() => setVisibleKoreksi(false)} footer={null} >
                <KoreksiPenilaian data={dataKoreksi} />
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