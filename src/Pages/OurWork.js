import React from 'react'
import date1 from '../Json_date/date.json'
import '../css/ourWork.css'
import { Card, Row, Col } from 'react-bootstrap'



//show from jsom file a what to do in this clinic service

function ourWork() {


    let storedTheme = localStorage.getItem("theme");



    if (storedTheme === "light") {

        return (
            <div>

                <div className='titleOurWorkDark'>
                    <h1>here you can see our work :</h1>
                </div>

                <div className='OurWorkLook'>

                    <Row xs={1} md={2} className="g-4">
                        {date1.work.map((record) => (

                            <Col key={record.id}>
                                <Card style={{ marginTop: "10px", background: "#424242", borderRadius: "15px", padding: "3%" }}>
                                    <Card.Img variant="top" src={record.path} />
                                    <Card.Body style={{ color: "#ffffffab" }}>
                                        <Card.Title><h3>{record.title} :</h3></Card.Title>
                                        <Card.Text>
                                            {record.text}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }



    else {

        return (
            <div>

                <div className='titleOurWork'>
                    <h1>here you can see our work :</h1>
                </div>

                <div className='OurWorkLook'>

                    <Row xs={1} md={2} className="g-4">
                        {date1.work.map((record) => (

                            <Col key={record.id}>
                                <Card style={{ marginTop: "10px", borderRadius: "15px", padding: "3%" }}>
                                    <Card.Img variant="top" src={record.path} />
                                    <Card.Body>
                                        <Card.Title><h3>{record.title} :</h3></Card.Title>
                                        <Card.Text>
                                            {record.text}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }

}

export default ourWork;