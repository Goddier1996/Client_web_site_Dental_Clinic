import { Card, Row } from 'react-bootstrap'
import '../css/home.css'
import React from 'react'
import date1 from '../Json_date/date.json'


//here component we take category from json file and show in Home Page
function Category() {

    return (

        <>
            <div className='categoryLook'>

                <Row xs={1} md={3} className="g-4" style={{ width: "93%" }}>

                    {date1.category1.map((record, i) =>

                        <div key={i} className='choise'>

                            <Card style={{ border: "none", background: "none" }}>
                                <Card.Img variant="top" src={record.path} />
                                <div className='title'>
                                    
                                        <a style={{ textDecoration: "none",color:"#ffffff" }}
                                            href={record.link}>{record.name}
                                        </a>
                                    
                                </div>
                            </Card>
                        </div>
                    )}
                </Row>
            </div>
        </>
    );
}

export default Category;