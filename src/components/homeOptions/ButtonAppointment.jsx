import React from 'react'
import { Button } from 'react-bootstrap'



const ButtonAppointment = ({ CheckUserConnectedFunc }) => {

    let storedTheme = localStorage.getItem("theme");

    return (
        <div className="d-grid gap-2 click">
            <Button
                variant={(storedTheme === "light") ? "warning" :
                    (storedTheme === "dark") ? "success" : ""}
                style={(storedTheme === "light") ? { color: "rgba(0, 0, 0, 0.58)" } :
                    (storedTheme === "dark") ? { color: "#ffffff" } : ""}
                size="sm"
                onClick={CheckUserConnectedFunc}>
                Click me - Book an Appointment <img style={{ height: "30px" }} src='https://i.postimg.cc/66Fz9GsM/11.webp' alt='add new turn' />
            </Button>
        </div>
    )
}

export default ButtonAppointment;