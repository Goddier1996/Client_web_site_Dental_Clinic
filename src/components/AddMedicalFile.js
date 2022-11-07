import React from 'react'
import { useState } from "react";
import '../css/PayService.css'
import Swal from 'sweetalert2'
import { API } from '../API';
import { Button, Form } from 'react-bootstrap';
import '../css/profile.css'



//here component Add Medical File User , doctor add a file to user,and user can see how much pay need and see what doctor write and docoment = this component use in profile doctor

function AddMedicalFileUser() {



    const [File_user, setFile_user] = useState('');
    const [textDoctor, setTextDoctor] = useState('');
    const [priceSevice, setPriceSevice] = useState('');


    let date = JSON.parse(sessionStorage.getItem("userDateMedical"));



    // add mew medical file to user Id , save in data base

    const addMedicalFileUser = async () => {

        let d = new Date();


        try {
            let File = {
                name: date.FirstName,
                email:date.Email,
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




    return (


        <div>

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


                <Button variant="success" onClick={addMedicalFileUser}>Success</Button>

            </div>
        </div>
    );

}



export default AddMedicalFileUser