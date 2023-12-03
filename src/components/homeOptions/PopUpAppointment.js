import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import CloseIcon from '@mui/icons-material/Close';
import Appointment from '../../components/addAppointment/Appointment'



const PopUpAppointment = ({ showModelAppointment, closePopUpAppointment }) => {

    let storedTheme = localStorage.getItem("theme");


    return (
        <div className='bookClick'>
            <Modal show={showModelAppointment} >

                <div className={(storedTheme === "light") ? "showModelAddAppointmentUserDark" : (storedTheme === "dark") ? "showModelAddAppointmentUser" : ""}>

                    <div className="closeModelAddAppointmentUser">

                        <Button
                            style={(storedTheme === "light") ? { background: "#424242" } :
                                (storedTheme === "dark") ? { background: "white" } : ""}
                            variant="contained"
                            onClick={closePopUpAppointment} >

                            <CloseIcon style={(storedTheme === "light") ? { fontSize: "#20px", color: "white" } :
                                (storedTheme === "dark") ? { fontSize: "#20px", color: "black" } : ""} />
                        </Button>

                    </div>

                    <div className='titleHeater'>
                        <img src='https://i.postimg.cc/J0R7Js4X/day.png' />
                    </div>

                    <Form>
                        <Appointment />
                    </Form>

                </div>
            </Modal>
        </div>
    )
}

export default PopUpAppointment;