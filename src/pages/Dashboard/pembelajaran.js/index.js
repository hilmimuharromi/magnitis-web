import React, { useEffect } from "react"
import { connect } from 'react-redux';
import { Row, Col, Divider, Button, Tabs, message } from "antd"
import { TableKuis, ListPembelajaran, TableMateri } from "components/pembelajaran"
import axios from 'axios';
import { GetPembelajaran } from "stores/action"

const { TabPane } = Tabs;
const Pembelajaran = (props) => {
    const { data, userId, GetPembelajaran } = props

    useEffect(() => {
        GetPembelajaran()
        // eslint-disable-next-line
    }, [])

    const simpanPembelajaran = async () => {
        let payload = {
            title: "Magnitis",
            contents: [],
            userId
        }
        data.map((item, index) => {
            let content = {}
            content.key = index
            content.flag = item.flag
            if (item.flag === "post") {
                content.post = item._id
                // content.quiz = ""
            } else if (item.flag === "quiz") {
                content.quiz = item._id
                // content.post = ""
            }
            payload.contents.push(content)
            content = {}
            return item
        })
        console.log(payload)

        try {
            const { data } = await axios({
                method: "post",
                url: `${window.env.API_URL}/playlist`,
                data: payload
            })
            if (data.status) {
                console.log(data)
                GetPembelajaran()
                return message.success(` berhasil Simpan Pembelajaran`)
            }
        } catch (e) {
            console.log("error login", e)
            return message.error("gagal simpan Pembelajaran")
        } finally {
            // setLoading(false)
        }



    }

    return (
        <>
            <Divider>
                <h2>Pembelajaran</h2>
            </Divider>
            <Row justify="space-between" gutter={8}>
                <Col span={10}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Materi" key="1">
                            <TableMateri />
                        </TabPane>
                        <TabPane tab="Kuis" key="2">
                            <TableKuis />
                        </TabPane>
                    </Tabs>
                </Col>
                <Col>
                    <ListPembelajaran />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            onClick={simpanPembelajaran}
                            style={{
                                marginTop: "5px",
                                width: "300px",
                                backgroundColor: "#17C9FF",
                                boxShadow: "25px 25px 50px rgba(0, 0, 0, 0.15)",
                                border: "4px dashed rgba(0,0,0,0)",
                                borderRadius: "40px",
                                padding: 0,
                                minHeight: "50px",
                                cursor: "pointer"
                            }}>
                            <h6 style={{ color: "#FFFFFF", fontSize: "20px", padding: 0 }}>
                                Simpan
                    </h6>
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )

}

const mapStateToProps = state => {
    const { Pembelajaran, User } = state;
    const { data } = Pembelajaran

    return {
        data: data,
        userId: User.data.userId
    };
}
const mapDispatchToProps = {
    GetPembelajaran
    // GetListQuiz,
    // SetUpdateKuis
}

export default connect(mapStateToProps, mapDispatchToProps)(Pembelajaran);