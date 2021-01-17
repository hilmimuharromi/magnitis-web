import React from "react"
import { Card, Row, Col } from "antd"
import parse, { attributesToProps } from 'html-react-parser';
export default function SinglePreview(props) {
    const { question, options } = props

    const optionParse = {
        replace: domNode => {
            if (domNode.attribs && domNode.name === 'iframe') {
                const props = attributesToProps(domNode.attribs);
                console.log(props)
                return <div style={{ display: "flex", justifyContent: "center" }}><iframe title="iframe" {...props} /> </div>
            }
        }
    };

    const CardOptions = () => {
        if (options.length > 0) {
            return (
                <Row justify="center" gutter={8} style={{ marginTop: "10px" }}>
                    {options.map((item) => (
                        <Col>
                            <Card bordered style={{ width: "250px", padding: 0, margin: "5px", borderColor: item.isTrue ? "green" : "red" }}
                            >
                                <Row justify={"space-between"} gutter={8}>
                                    {item.value}
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )
        } else {
            return ""
        }

    }

    return (
        <>
            <Card style={{ width: "700px" }} bordered>
                {
                    parse(question, optionParse)
                }
            </Card>
            <CardOptions />

        </>

    )
}