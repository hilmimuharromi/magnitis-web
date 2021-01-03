import React from "react"
import { Space, Typography, Divider, Tag } from "antd"
import SinglePreview from "./SinglePreview"
const { Title } = Typography;

export default function PreviewQuiz({ data }) {
    const { title, contents } = data
    return (
        <>
            {/* <Row>{title}</Row> */}
            <Divider plain>{title}</Divider>
            {contents.map((item, index) => (
                <>
                    <Space>
                        <Title level={3}>
                            <Tag color="blue">{item.key}</Tag>
                            <Tag color="#2db7f5">{item.point} Point</Tag>
                        </Title>
                        <SinglePreview question={item.question} options={item.options} />
                    </Space>
                    <Divider dashed />
                </>
            ))}
        </>
    )
}