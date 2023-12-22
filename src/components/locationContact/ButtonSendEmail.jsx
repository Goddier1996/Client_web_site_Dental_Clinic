import React from 'react'
import Button from 'react-bootstrap/Button';
import "bootstrap-icons/font/bootstrap-icons.css";


const ButtonSendEmail = ({ popUpSendMessage }) => {

    return (
        <div className='UserSendEmail'>
            <Button 
                variant="primary"
                onClick={popUpSendMessage}>
                Click Send Message <i class="bi bi-send"></i>
            </Button>
        </div>
    )
}

export default ButtonSendEmail;