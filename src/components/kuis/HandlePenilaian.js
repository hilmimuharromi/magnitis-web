// import {useState} from 'react'
import {Input, Select, Row, Col, Typography, Card} from 'antd'
const {Option} = Select
const {Title} = Typography
const HandlePenilaian = ({item, dataNilai, setDataNilai}) => {
    const found = dataNilai.find((check) => check.key === item.key);
    let isEssay = true;
    // const [ trueAnswer, setTrueAnswer] = useState('')
   
    if (item.options.length > 0) {
      isEssay = false;
    }

    const getAnswer = (f) => {
        if(!f) {
            return ('No Answer')}
        else {
            if(isEssay) {
                return(f.userAnswer)
            } else {
                const answer = item.options.find((check) => check.key === f.userAnswer);
                if (answer) {
                    return (
                        <>{answer.value}</>
                    )
                  } else {
                    return (
                      <>
                      </>
                    );
                  }

            }
        }
    }

    const getStatus = (f) => {

        if(!f) {
            return (false)}
        else {
            if(isEssay) {
                return('')
            } else {
                // const trueAnswer = item.options.find((i) => i.isTrue)
                // const answer = item.options.find((check) => check.key === f.userAnswer);
                if (f.userAnswer === f.trueAnswer) {
                    return (
                        true
                    )
                  }

            }
        }

    }

    return (
      <>
       
          <>
            <Row gutter={8} justify='start'>
              <Col
                span={4}
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Title level={5}>Jawaban Siswa </Title>
              </Col>
              <Col span={20}>
                <Card
                  bordered
                  style={{
                    minWidth: '100%',
                    padding: 0,
                    margin: '5px',
                    borderColor: getStatus(found) ? 'green' : 'black',
                  }}
                >
                  {getAnswer(found)}
                </Card>
              </Col>
            </Row>


            <Row justify='center' gutter={8}>
              <Col>
                <Input
                  defaultValue={item.point}
                  disabled={isEssay ? false : true}
                  onChange={(e) => {
                    const newData = dataNilai.map((item) => {
                      if (item.key === found.key) {
                        item.point = e.target.value;
                      }
                      return item;
                    });
                    setDataNilai(newData);
                  }}
                />
              </Col>
              <Col>
          
                <Select
                  defaultValue={getStatus(found)}
                  disabled={isEssay ? false : true}
                  style={{ width: 200 }}
                  onChange={(value) => {
                    const newData = dataNilai.map((item) => {
                      if (item.key === found.key) {
                        item.isTrue = value;
                      }
                      return item;
                    });
                    setDataNilai(newData);
                  }}
                >
                  <Option value={true}>Benar</Option>
                  <Option value={false}>Salah</Option>
                </Select>
              </Col>
            </Row>
          </>
      </>
    )
  };

  export default HandlePenilaian