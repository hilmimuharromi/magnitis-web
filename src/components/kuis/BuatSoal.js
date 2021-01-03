import React, { useState } from "react"
import EditorContainer from "components/editor"
import { SetQuestion, SetOptionsSoal, SetPointSoal, SetContentsKuis, ResetFormSoal } from "stores/action"
import { connect } from 'react-redux';
import { Layout, Alert, Row, Button, Input, Select, Form, Card, Col, message } from "antd"
import { DeleteOutlined, EditOutlined, } from '@ant-design/icons';
const { Footer, Content } = Layout;
const { Option } = Select

const BuatSoal = (props) => {
    const {
        question,
        keyEdit,
        options,
        point,
        SetQuestion, SetOptionsSoal, SetPointSoal,
        SetContentsKuis, contents, ResetFormSoal, setFinish } = props
    const [form] = Form.useForm();
    const { resetFields, setFieldsValue } = form
    const [currentKey, setCurrentKey] = useState("")


    const tambahOption = (value) => {
        console.log(value)
        if (!value.value) return message.error("harap isi opsi jawaban")
        let oldData = options
        if (value.isTrue) {
            oldData.map((item) => {
                return item.isTrue ? item.isTrue = false : item
            })
        }
        if (!currentKey) {
            value.key = 1
            if (oldData.length > 0) {
                value.key = oldData[oldData.length - 1].key + 1
            }
            let newData = [...options, value]
            SetOptionsSoal(newData)
        } else {
            value.key = currentKey
            let newData = oldData.map((item) => {
                return item.key === currentKey ? item = value : item
            })
            SetOptionsSoal(newData)
            setCurrentKey("")
        }
        resetFields()
    }

    const deleteOpsi = (key) => {
        let newData = options.filter((item) => item.key !== key)
        return SetOptionsSoal(newData)
    }



    const onChangePoint = e => {
        const { value } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            SetPointSoal(value)
        }
    };

    const simpanSoal = () => {
        let payload = {
            point,
            question,
            options,
            key: 1
        }
        if (!keyEdit) {
            if (contents.length > 0) {
                payload.key = contents[contents.length - 1].key + 1
            }
            SetContentsKuis([...contents, payload])
        } else {
            payload.key = keyEdit
            let newData = contents.map((item) => {
                return item.key === keyEdit ? item = payload : item
            })
            SetContentsKuis(newData)
        }
        ResetFormSoal()
        setFinish()
    }




    return (
        <Layout>
            <Content style={{ padding: '0 50px', backgroundColor: "white", minHeight: "60vh" }}>
                <Form.Item label="Point" >
                    <Input
                        onChange={onChangePoint}
                        value={point}
                        placeholder={"point"}
                        style={{ width: "200px" }}
                        suffix="Point"
                    />
                </Form.Item>
                <EditorContainer
                    data={question}
                    setData={(data) => SetQuestion(data)}
                    heightEditor="200px"
                />
                <Alert message="Jika opsi kosong maka tipe soal = essay" type="info" />
                <Form
                    form={form}
                    layout="inline"
                    onFinish={tambahOption}
                    style={{ marginTop: "10px" }}
                    initialValues={{
                        isTrue: false,
                        value: ""
                    }}
                >
                    <Form.Item label="opsi" name="value">
                        <Input
                            style={{ width: "250px" }} />
                    </Form.Item>
                    <Form.Item name="isTrue" >
                        <Select
                            style={{ width: "100px" }}>
                            <Option value={true}>Benar</Option>
                            <Option value={false}>Salah</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">{currentKey ? "Update Opsi" : "Tambah Opsi"}</Button>
                    </Form.Item>
                </Form>
                <Row justify="center" gutter={8} style={{ marginTop: "10px" }}>
                    {options.map((item) => (
                        <Col>
                            <Card bordered style={{ width: "250px", padding: 0, margin: "5px", borderColor: item.isTrue ? "green" : "red" }}
                                actions={[
                                    <EditOutlined
                                        style={{ color: currentKey === item.key ? "#40a9ff" : "" }}
                                        onClick={() => {
                                            setFieldsValue({
                                                value: item.value,
                                                isTrue: item.isTrue
                                            })
                                            setCurrentKey(item.key)
                                        }} key="edit" />,
                                    <DeleteOutlined onClick={() => deleteOpsi(item.key)} key="delete" />
                                ]}
                            >
                                <Row justify={"space-between"} gutter={8}>
                                    {item.value}
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
            <Footer>
                <Row justify="center">
                    <Button type="primary" onClick={simpanSoal}>Simpan Soal</Button>
                </Row>
            </Footer>

        </Layout >
    )
}

const mapStateToProps = state => {
    const { FormSoal, FormKuis } = state;
    const { question, options, point, key } = FormSoal
    console.log("question", question)
    const { contents } = FormKuis
    return {
        question, options, point, keyEdit: key,
        contents
    };
}
const mapDispatchToProps = {
    SetQuestion,
    SetOptionsSoal,
    SetContentsKuis,
    SetPointSoal,
    ResetFormSoal
}

export default connect(mapStateToProps, mapDispatchToProps)(BuatSoal);