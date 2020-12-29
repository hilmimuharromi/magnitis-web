import React from "react"
import EditorContainer from "components/editor"
import { Row, Col, Input, Card } from "antd"
export default function BuatMateri() {
    return (
        <>
            <Row>
                <h2>Buat Materi</h2>
            </Row>
            <Row justify="start">
                <Col span={3}>
                    <p>Judul</p>
                </Col>
                <Col span={3}>
                    <Input style={{ width: "400px" }} />
                </Col>
            </Row>
            <Row justify="start">
                <Col span={12}>
                    {/* <Card> */}
                    <EditorContainer />
                    {/* </Card> */}
                </Col>
            </Row>

        </>
    )
}