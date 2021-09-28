import React, { useState, useEffect } from 'react';
import {
  Typography,
  Divider,
  Row,
  Col,
  Card,
  Button,
} from 'antd';
import HandlePenilaian from './HandlePenilaian';
import SinglePreview from './SinglePreview';
import axios from 'axios';
const { Title } = Typography;
const KoreksiPenilaian = ({ data, setSuccess }) => {
  const [dataNilai, setDataNilai] = useState([]);
  const [score, setScore] = useState(data.score);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScore = () => {
      let temp = 0;
      dataNilai.map((item) => {
        if (item.isEssay === false && item.userAnswer === item.trueAnswer) {
          temp += Number(item.point);
        }
        if (item.isEssay === true && item.isTrue) {
          temp += Number(item.point);
        }
        return item;
      });
      setScore(temp);
    };
    handleScore();
  }, [dataNilai]);

  useEffect(() => {
    setDataNilai(data.answer);

  }, [data]);


  const simpanKoreksi = async () => {
    setLoading(true);
    const payload = {
      answer: dataNilai,
      score: score,
    };
    console.log(payload);
    try {
      const result = await axios({
        method: 'put',
        url: `${window.env.API_URL}/resultquiz/${data._id}`,
        data: payload,
      });
      if (result) {
        setSuccess();
      }
    } catch (e) {
      console.log(e, 'error simpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {data.quiz.contents.map((item, index) => (
        <>
          <Row>
            <Card title={`Nomor = ${item.key}`}>
              <SinglePreview question={item.question} options={item.options} />
              <Divider />
              <HandlePenilaian 
              item={item}
              dataNilai={dataNilai}
              setDataNilai={setDataNilai}
               />
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
    </div>
  );
};

export default KoreksiPenilaian;
