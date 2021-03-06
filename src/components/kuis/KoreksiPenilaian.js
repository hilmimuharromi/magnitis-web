import React, { useState, useEffect } from "react"
import { Typography, Divider, Row, Col, Card, Input, Select, Button } from "antd"
import SinglePreview from "./SinglePreview"
import axios from "axios"
const { Option } = Select
const { Title } = Typography
const KoreksiPenilaian = ({ data, setSuccess }) => {
    const [dataNilai, setDataNilai] = useState(data.answer)
    const [score, setScore] = useState(data.score)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleScore = () => {
            let temp = 0
            dataNilai.map((item) => {
                if (item.isEssay === false && item.userAnswer === item.trueAnswer) {
                    temp += Number(item.point)
                }
                if (item.isEssay === true && item.isTrue) {
                    temp += Number(item.point)
                }
                return item
            })
            setScore(temp)
        }
        handleScore()
    }, [dataNilai])

    const handlePenilaian = (item) => {
        const found = dataNilai.find((check) => check.key === item.key)
        const answer = item.options.find((check) => check.key === found.userAnswer)

        return (
            <>
                <Row gutter={8} justify="center">
                    <Col style={{ justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "column", height: "100px" }}>
                        <div>
                            <Title level={4}>Jawaban Siswa : </Title>
                        </div>
                        <div>
                            <Typography>point : {found.point} </Typography>
                        </div>
                    </Col>
                    <Col>
                        {found && found.isEssay === false ?
                            <Card bordered style={{ width: "250px", padding: 0, margin: "5px", borderColor: found.userAnswer === found.trueAnswer ? "green" : "red" }}>
                                {answer.value}
                            </Card> : <Card bordered style={{ width: "100%", padding: 0, margin: "5px", borderColor: "black" }}>
                                {found.userAnswer}
                            </Card>
                        }
                    </Col>
                </Row>
                { found && found.isEssay === true ?
                    <Row justify="center" gutter={8}>
                        <Col>
                            <Input
                                defaultValue={found.point}
                                onChange={(e) => {
                                    const newData = dataNilai.map((item) => {
                                        if (item.key === found.key) {
                                            item.point = e.target.value
                                        }
                                        return item
                                    })
                                    console.log(newData)
                                    setDataNilai(newData)
                                }}
                            />
                        </Col>
                        <Col>
                            <Select
                                defaultValue={found.isTrue}
                                style={{ width: 200 }}
                                onChange={(value) => {
                                    const newData = dataNilai.map((item) => {
                                        if (item.key === found.key) {
                                            item.isTrue = value
                                        }
                                        return item
                                    })
                                    setDataNilai(newData)
                                }}
                            >
                                <Option value={true}>
                                    Benar
                                </Option>
                                <Option value={false}>
                                    Salah
                            </Option>
                            </Select>
                        </Col>
                    </Row> : <></>
                }
            </>
        )
    }


    const simpanKoreksi = async () => {
        setLoading(true)
        const payload = {
            answer: dataNilai,
            score: score
        }
        console.log(payload)
        try {
            const result = await axios({
                method: "put",
                url: `${window.env.API_URL}/resultquiz/${data._id}`,
                data: payload
            })
            if (result) {
                setSuccess()
            }
        } catch (e) {
            console.log(e, "error simpan")
        } finally {
            setLoading(false)

        }

    }


    return (
        <>
            {data.quiz.contents.map((item, index) => (
                <>
                    <Row>
                        <Card title={`Nomor = ${item.key}`} style={{ width: "800px" }}>
                            <SinglePreview question={item.question} options={item.options} />
                            <Divider />
                            {handlePenilaian(item)}
                        </Card>
                    </Row>
                    <Divider />
                </>
            ))}
            <Row justify="center" gutter={8}>
                <Col>
                    <Card bordered style={{ width: "250px", padding: 0, margin: "10px", borderColor: "blue" }}>
                        <Row justify="center" gutter={8}>
                            <Title level={4}>Score = {score}</Title>
                        </Row>
                        <Row justify="center" style={{ margin: "10px" }}>
                            <Button type="primary" loading={loading} onClick={simpanKoreksi}>Simpan Koreksi</Button>
                        </Row>
                    </Card>
                </Col>
            </Row>
            {/* {JSON.stringify(data)} */}
        </>
    )
}

export default KoreksiPenilaian