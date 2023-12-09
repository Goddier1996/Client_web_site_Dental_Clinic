import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';


const ButtonSendEmail = ({ popUpSendMessage }) => {

    let storedTheme = localStorage.getItem("theme");


    return (
        <div className='UserSendEmail'>
            <Button style={(storedTheme == "light") ? { background: "green" } : (storedTheme == "dark") ? { background: "contained" } : ""}
                variant="contained"
                onClick={popUpSendMessage}
                startIcon={<EmailIcon />}>
                Click Send Message
            </Button>
        </div>
    )
}

export default ButtonSendEmail;