import React from 'react'
import ButtonMui from '@mui/material/Button';
import RobotBox from '../ReCAPTCHA/RobotBox';



const ModelPopUpSaveTurn = ({ capVal, saveDateUser, closePopUpRobotBoxUserExit, setCapVal }) => {

    let storedTheme = localStorage.getItem("theme");


    return (

        <div className='showRobotBoxAppoinment'>

            <div className='gifImageRobot'>
                <img src='https://i.postimg.cc/bvjTR4mC/robot.gif' />
            </div>

            {/* check box if user don't robot */}
            <div>
                <RobotBox activeRobotBox={setCapVal} />
            </div>


            <div className='appointmentRobotBoxButton' style={!capVal ? { cursor: "not-allowed" } : {}}>

                <ButtonMui
                    onClick={saveDateUser}
                    disabled={!capVal}
                    variant="contained"
                    style={(storedTheme === "light") ? { fontSize: "13px", color: "white" } :
                        (storedTheme === "dark") ? { fontSize: "13px", color: "white" } : ""}
                >
                    {capVal ?
                        "Click And We Save Turn"
                        : "Save Turn"
                    }
                </ButtonMui>

                <ButtonMui
                    onClick={closePopUpRobotBoxUserExit}
                    variant="contained"
                    style={(storedTheme === "light") ? { background: "red", fontSize: "13px", color: "white" } :
                        (storedTheme === "dark") ? { background: "red", fontSize: "13px", color: "white" } : ""}
                >
                    Close
                </ButtonMui>
            </div>

        </div>

    )
}

export default ModelPopUpSaveTurn;