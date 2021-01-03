import React from "react"
import { Card } from "antd"
import parse, { attributesToProps } from 'html-react-parser';
export default function PreviewMateri(props) {
    const { title, content } = props

    const options = {
        replace: domNode => {
            if (domNode.attribs && domNode.name === 'iframe') {
                const props = attributesToProps(domNode.attribs);
                console.log(props)
                return <div style={{ display: "flex", justifyContent: "center" }}><iframe title="iframe" {...props} /> </div>
            }
        }
    };

    return (
        <>
            <Card title={title} bordered={false}>
                {
                    parse(content, options)
                }
            </Card>

        </>

    )
}