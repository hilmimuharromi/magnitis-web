import React, { useState } from "react"
import { connect } from 'react-redux';
import { ListSoal, BuatSoal } from "components/kuis"
import { Divider, Row, Col, Input, Button, Select, Form, Modal, message } from "antd"
import { SetTitleKuis, SetTimeKuis, SetTryAgainKuis, SetContentsKuis, SetCurrentSoal, ResetFormSoal, ResetFormKuis } from "stores/action"
import axios from 'axios';

const { Option } = Select

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const BuatKuis = (props) => {
    const {
        SetTitleKuis, SetTimeKuis, SetTryAgainKuis, ResetFormSoal,
        title, contents, tryAgain, time, FormSoal, userId, quizId, ResetFormKuis } = props
    const [buatSoal, SetBuatSoal] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm();
    const { resetFields, } = form


    const onChangeTime = e => {
        const { value } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            SetTimeKuis(value)
        } else {
            return
        }
    };


    const simpanKuis = async (value) => {
        let payload = { ...value, time, contents: contents, userId, quizId }
        let method = quizId ? "put" : "post"
        console.log(payload)
        try {
            const { data } = await axios({
                method: method,
                url: `${window.env.API_URL}/quiz`,
                data: payload
            })
            if (data.status) {
                console.log(data)
                // ResetFormMateri()
                ResetFormKuis()
                resetFields()
                if (method === "put") {
                    return message.success(` berhasil Update Quiz`)
                } else {
                    return message.success(` berhasil Simpan Quiz`)
                }

            }
        } catch (e) {
            console.log("error login", e)
            let { data } = e.response
            if (data.message) {
                return message.error(data.message)
            } else {
                return message.error("gagal simpan quiz")
            }
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            <Row style={{ marginBottom: "10px" }}>
                <Divider>
                    <h2>Buat Kuis</h2>
                </Divider>
            </Row>
            <Row justify="start" gutter={8}>
                <Col span={12}>
                    <Form
                        form={form}
                        onFinish={simpanKuis}
                        initialValues={{
                            title: title,
                            tryAgain: tryAgain
                        }}
                        {...layout}
                        layout={"horizontal"}>
                        <Form.Item label="Nama Kuis" name="title">
                            <Input
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    SetTitleKuis(e.target.value)
                                }}
                                placeholder={"Judul"}
                                style={{ width: "400px" }}
                            />
                        </Form.Item>
                        <Form.Item label="Waktu Pengerjaan">
                            <Input
                                onChange={onChangeTime}
                                value={time}
                                placeholder={"Waktu"}
                                style={{ width: "200px" }}
                                suffix="Menit"
                            />
                        </Form.Item>
                        <Form.Item label="Bisa Diulang ?" name="tryAgain">
                            <Select
                                // value={tryAgain}
                                onChange={(value) => SetTryAgainKuis(value)}
                                style={{ width: "200px" }}>
                                <Option value={true}>Ya</Option>
                                <Option value={false}>Tidak</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Simpan Kuis
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12}>
                    <Button onClick={() => {
                        SetBuatSoal(true)
                        if (FormSoal.key) {
                            ResetFormSoal()
                        }
                    }}>Tambah Soal</Button>
                    <ListSoal SetBuatSoal={(data) => SetBuatSoal(data)} />
                </Col>
            </Row>
            {buatSoal ?
                <Modal
                    width="700px"
                    visible={buatSoal}
                    onCancel={() => SetBuatSoal(false)}
                    footer={null}
                >
                    <BuatSoal setFinish={() => SetBuatSoal(false)} />
                </Modal> : ""
            }
        </>
    )
}

const mapStateToProps = state => {
    const { FormKuis, User, FormSoal } = state;
    const { title, contents, tryAgain, time, id } = FormKuis
    const { data } = User
    return {
        title, contents, tryAgain, time, FormSoal, userId: data.userId, quizId: id
    };
}
const mapDispatchToProps = {
    SetTitleKuis,
    SetTimeKuis,
    SetTryAgainKuis,
    SetContentsKuis,
    SetCurrentSoal,
    ResetFormSoal,
    ResetFormKuis
}

export default connect(mapStateToProps, mapDispatchToProps)(BuatKuis);