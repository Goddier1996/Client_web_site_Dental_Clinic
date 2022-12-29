import React from 'react'
import { useState } from "react";
import '../css/PayService.css'
import Swal from 'sweetalert2'
import { API } from '../Api/API';
import { Button, Form, Modal } from 'react-bootstrap';
import '../css/profile.css'



//here component Add Medical File User , doctor add a file to user,and user can see how much pay need and see what doctor write and docoment = this component use in profile doctor
function AddMedicalFileUser(props) {

    const [File_user, setFile_user] = useState('');
    const [textDoctor, setTextDoctor] = useState('');
    const [priceSevice, setPriceSevice] = useState('');

    let date = JSON.parse(sessionStorage.getItem("userDateMedical"));



    // check if File_user was url link image
    const checkIfUrlLinkFile = urlString => {
        var urlPattern = new RegExp('(jpg|jpeg|png|webp|avif|gif|svg)')
        return !!urlPattern.test(urlString);
    }



    // check all input value
    const checkInput = async () => {

        let check = checkIfUrlLinkFile(File_user)

        if (textDoctor == '' || priceSevice == '' || isNaN(priceSevice) || check == false) {

            Swal.fire({
                icon: 'warning',
                text: 'input please value Or Price in Not number Or in not url link image !',
                toast: true,
                position: 'top-end'
            })

            return;
        }


        else {

            addMedicalFileUser()
        }


    }



    // add mew medical file to user Id , save in data base
    const addMedicalFileUser = async () => {

        let d = new Date();

        try {
            let File = {
                name: date.FirstName,
                email: date.Email,
                Publish_by: date.User_code,
                Date_published: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
                File_user: File_user,
                textDoctor: textDoctor,
                priceSevice: priceSevice,
                IsActive: "1"
            };

            await fetch(API.MEDICAL_FILE.ADD, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(File)
            });


            ActiveHour();

            // delete in user a day and hour 
            try {
                let user = {
                    Day_date: null,
                    Hour_day: null,
                    Serial_codeHour: null
                }

                await fetch(`${API.USERS.GET}/${props.userCode}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });


            } catch (error) {
                console.log(error)
            }


            Swal.fire({
                title: 'success',
                icon: 'success',
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {
                    sessionStorage.removeItem('userDateMedical');
                    window.location.reload(false);
                }
            })


        } catch (error) {
            console.log(error);
        }
    }



    //active this hour when doctor send a file to user
    const ActiveHour = async () => {

        await fetch(`${API.HOURS.GET}/active/${props.codeHour}`,
            { method: 'PATCH' }
        );
    }




    return (


        <div>

            <Modal.Header>
                <Modal.Title><h1>Medical File : {date.FirstName}</h1></Modal.Title>
            </Modal.Header>

            <div className='inputMedicalDate'>


                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea" rows={3}
                        placeholder="Patient review"
                        value={textDoctor}
                        onChange={(event) => setTextDoctor(event.target.value)}
                        autoFocus
                    />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="price Service"
                        value={priceSevice}
                        onChange={(event) => setPriceSevice(event.target.value)}
                    />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="add link file"
                        value={File_user}
                        onChange={(event) => setFile_user(event.target.value)}
                    />
                </Form.Group>

                <div className='styleButtonPosition'>
                    <Button variant="success" onClick={checkInput}>Success</Button>
                    <Button variant="secondary" onClick={props.hideModelMedicalFile}>Close</Button>
                </div>


            </div>
        </div>
    );

}


export default AddMedicalFileUser