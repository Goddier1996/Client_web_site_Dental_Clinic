import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";


const RobotBox = ({ activeRobotBox }) => {

    return (
        <div className="checkBox">
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA || ""}
                onChange={activeRobotBox}
            />
        </div>
    )
}

export default RobotBox;