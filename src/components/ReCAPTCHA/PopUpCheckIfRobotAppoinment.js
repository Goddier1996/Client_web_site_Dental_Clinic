import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";



const PopUpCheckIfRobotAppoinment = (props) => {

    return (

        <div className='showRobotBoxAppoinment'>

            <div className='gifImageRobot'>
                <img src='https://i.postimg.cc/bvjTR4mC/robot.gif' />
            </div>

            {/* check box if user dont robot */}
            <div>
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA || ""}
                    onChange={(val) => props(val)}
                />
            </div>
        </div>
    )
}

export default PopUpCheckIfRobotAppoinment;