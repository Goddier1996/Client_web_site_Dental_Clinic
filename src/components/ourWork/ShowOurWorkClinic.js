import React from 'react'
import { Card, Col } from 'react-bootstrap'



const ShowOurWorkClinic = ({ infoOurWork }) => {

    const { id, path, title, text } = infoOurWork;

    let storedTheme = localStorage.getItem("theme");


    return (
        <div>
            <Col key={id}>

                <Card
                    style={(storedTheme === "light") ?
                        { marginTop: "10px", background: "#424242", borderBottomRightRadius: "25px", borderBottomLeftRadius: "25px", marginTop: "12%" } :
                        (storedTheme === "dark") ?
                            { borderBottomRightRadius: "25px", borderBottomLeftRadius: "25px", marginTop: "12%" } : ""}>

                    <Card.Img variant="top" src={path} />

                    <Card.Body
                        style={(storedTheme === "light") ?
                            { color: "#ffffffab" } :
                            (storedTheme === "dark") ?
                                {} : ""}>

                        <Card.Title><h3>{title}</h3></Card.Title>

                        <Card.Text>
                            {text}
                        </Card.Text>
                    </Card.Body>

                </Card>
            </Col>
        </div>
    )
}

export default ShowOurWorkClinic;