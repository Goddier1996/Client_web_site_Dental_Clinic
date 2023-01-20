import React from 'react'
import date1 from '../Json_date/date.json'
import '../css/ourWork.css'
import { Card, Row, Col } from 'react-bootstrap'



//show data from json file our work this clinic

function ourWork() {

    let storedTheme = localStorage.getItem("theme");


    return (

        <div>

            <div className={(storedTheme == "light") ? "titleOurWorkDark" : (storedTheme == "dark") ? "titleOurWork" : ""}>
                <h1>here you can see our work :</h1>
            </div>


            <div className='OurWorkLook'>

                <Row xs={1} md={2} className="g-4">
                    {date1.work.map((record) => (

                        <Col key={record.id}>

                            <Card
                                style={(storedTheme === "light") ?
                                    { marginTop: "10px", background: "#424242", borderRadius: "15px", padding: "3%" } :
                                    (storedTheme === "dark") ?
                                        { marginTop: "10px", borderRadius: "15px", padding: "3%" } : ""}>

                                <Card.Img variant="top" src={record.path} />

                                <Card.Body
                                    style={(storedTheme === "light") ?
                                        { color: "#ffffffab" } :
                                        (storedTheme === "dark") ?
                                            {} : ""}>

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
    )

}

export default ourWork;