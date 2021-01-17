import React, { useState, useEffect } from "react"
import ButtonUpload from "../../../components/ButtonUpload"
import { Button, Row, Col, message } from "antd"
import { connect } from 'react-redux';
import { GetListPetunjuk, SetPetunjuk } from "stores/action"
import axios from "axios"

const PetunjukPenggunaan = ({ data, loading, GetListPetunjuk, SetPetunjuk }) => {
    const [loadingSimpan, setLoadingSimpan] = useState(false)


    useEffect(() => {
        GetListPetunjuk()
        //eslint-disable-next-line
    }, [])

    const setFile = (file) => {
        const newData = data.map((item) => {
            return item.number === file.number ? item = file : item
        })
        SetPetunjuk(newData)
    }

    const deleteItem = number => {
        const filterData = data.filter((item) => item.number !== number)
        const newData = filterData.map((item, index) => {
            item.number = index + 1
            return item
        })
        SetPetunjuk(newData)
    }

    const handleTambah = () => {
        let number = 1
        let lastFile = data.length - 1
        if (data.length > 0) {
            number = data[lastFile].number + 1
        }
        let file = {
            number,
            imageUrl: ""
        }
        SetPetunjuk([...data, file])
    }

    const savePetunjuk = async () => {
        setLoadingSimpan(true)
        let dataSImpan = data
        try {
            const { data } = await axios({
                method: "post",
                url: `${window.env.API_URL}/petunjuk`,
                data: dataSImpan
            })
            if (data) {
                console.log(data)
                message.success("Berhasil Simpan")
                GetListPetunjuk()
            }
        } catch (e) {
            console.log("error simpan petunujuk", e)
            message.error("gagal Simpan")
        } finally {
            setLoadingSimpan(false)
        }
    }

    if (loading) {
        return (
            <Row justify="center">
                <p>Loading .....</p>
            </Row>
        )
    }


    return (
        <>
            <h2>
                Petunjuk Penggunaan
            </h2>
            {data.map((item) => (
                <ButtonUpload
                    key={item.number}
                    item={item}
                    setFile={(file) => setFile(file)}
                    deleteItem={deleteItem}
                />
            ))}
            <Row gutter={8}>
                <Col>
                    <Button onClick={handleTambah}>Tambah Gambar</Button>
                </Col>
                <Col>
                    <Button loading={loadingSimpan} type="primary" onClick={savePetunjuk} >Simpan Petunjuk</Button>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => {
    const { ListPetunjuk } = state;
    const { data, loading } = ListPetunjuk
    return {
        data,
        loading,
    };
}
const mapDispatchToProps = {
    GetListPetunjuk, SetPetunjuk
}

export default connect(mapStateToProps, mapDispatchToProps)(PetunjukPenggunaan);