import React, { useEffect } from "react"
import { connect } from 'react-redux';
import { useHistory, Link } from "react-router-dom"
import { SetUser, SetLoading } from "stores/action/User"
import { Row, Col, Form, Input, Button, Card, message } from 'antd';
import axios from "axios"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login = (props) => {
    const { loading, SetLoading, SetUser, dataUser } = props
    const history = useHistory()

    useEffect(() => {
        if (dataUser) {
            history.push("/")
        }
        // eslint-disable-next-line
    }, [dataUser])

    const onFinish = async (values) => {
        console.log('Success:', values);
        SetLoading(true)
        const { email, password } = values
        try {
            const { data } = await axios({
                method: "post",
                url: `${window.env.API_URL}/login`,
                data: {
                    email,
                    password,
                    role: "1"
                }
            })
            if (data.status) {
                console.log(data)
                SetUser(data.data)
                return message.success(`halo ${data.data.name}, anda berhasil login`)
            }
        } catch (e) {
            console.log("error login", e)
            let { data } = e.response
            if (data.message) {
                return message.error(data.message)
            } else {
                return message.error("gagal Login")
            }
        } finally {
            SetLoading(false)
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        return message.error("Mohon lengkapi data")
    };
    return (
        <Row justify="center" style={{ justifyContent: "center", alignContent: "center", height: "80vh" }}>
            <Col>
                <Card title="Login">
                    <Form
                        {...layout}
                        name="login"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your Mail!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <Link to="/register">belum punya akun? daftar disini</Link>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => {
    const { User } = state;
    const { data, loading } = User
    console.log("data state user", User)

    return {
        dataUser: data,
        loading
    };
}
const mapDispatchToProps = {
    SetUser,
    SetLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);