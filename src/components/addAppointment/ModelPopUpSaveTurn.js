import React from 'react'
import ButtonMui from '@mui/material/Button';
import RobotBox from '../ReCAPTCHA/RobotBox';
import { useState } from 'react';



const ModelPopUpSaveTurn = ({ capVal, saveDateUser, closePopUpRobotBoxUserExit, setCapVal }) => {


    let storedTheme = localStorage.getItem("theme");

    const [userSaveTurn, setUserSaveTurn] = useState("");


    const saveDayAndHour = () => {

        setUserSaveTurn("user Click Save Turn");

        setTimeout(() => {
            saveDateUser();
        }, 2000);
    }


    return (

        <div className='showRobotBoxAppoinment'>

            <div className={!userSaveTurn ? 'gifImageRobot' : 'gifImageUserSaveData'}>

                {!userSaveTurn ?
                    <img src='https://i.postimg.cc/bvjTR4mC/robot.gif' />
                    :
                    <img src="https://i.postimg.cc/TwLD8KBC/saveTurn.gif" />
                }
            </div>

            {/* check box if user don't robot */}
            <div>
                {!userSaveTurn ?
                    <RobotBox activeRobotBox={setCapVal} />
                    : ""
                }
            </div>


            <div className='appointmentRobotBoxButton' style={!capVal || userSaveTurn ? { cursor: "not-allowed" } : {}}>

                {!userSaveTurn ?
                    <>
                        <ButtonMui
                            onClick={saveDayAndHour}
                            disabled={!capVal || userSaveTurn}
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
                            disabled={userSaveTurn}
                            variant="contained"
                            style={(storedTheme === "light") ? { background: "red", fontSize: "13px", color: "white" } :
                                (storedTheme === "dark") ? { background: "red", fontSize: "13px", color: "white" } : ""}
                        >
                            Close
                        </ButtonMui>
                    </>
                    :
                    <div className='saveUserTurn'>
                        <p>Please Wait , We Save Your Turn</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default ModelPopUpSaveTurn;