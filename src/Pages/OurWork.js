import React from 'react'
import date from '../Json_date/date.json'
import '../css/ourWork.css'
import { Card, Row, Col } from 'react-bootstrap'
import { motion as m } from "framer-motion/dist/framer-motion"



//show data from json file our work this clinic
function ourWork() {


    let storedTheme = localStorage.getItem("theme");


    return (

        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // initial={{ y:"100%" }}
            // animate={{ y:"0%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
        >
            <div className='styleOurWorksModel'>

                <div className={(storedTheme == "light") ? "titleOurWorkDark" : (storedTheme == "dark") ? "titleOurWork" : ""}>
                    <br />
                    <h1>Service We Perform at The Clinic</h1>
                    <p>* if you need Other Service<br /> <a href='/Location'>Click Move To Page Contact</a></p>
                </div>


                <div className='OurWorkLook'>
                    <Row xs={1} md={2} lg={3} style={{ width: "100%" }}>
                        {date.work.map((record) => (

                            <Col key={record.id}>

                                <Card
                                    style={(storedTheme === "light") ?
                                        { marginTop: "10px", background: "#424242", borderBottomRightRadius: "25px", borderBottomLeftRadius: "25px", marginTop: "12%" } :
                                        (storedTheme === "dark") ?
                                            { borderBottomRightRadius: "25px", borderBottomLeftRadius: "25px", marginTop: "12%" } : ""}>

                                    <Card.Img variant="top" src={record.path} />

                                    <Card.Body
                                        style={(storedTheme === "light") ?
                                            { color: "#ffffffab" } :
                                            (storedTheme === "dark") ?
                                                {} : ""}>

                                        <Card.Title><h3>{record.title}</h3></Card.Title>

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

        </m.div>
    )

}

export default ourWork;