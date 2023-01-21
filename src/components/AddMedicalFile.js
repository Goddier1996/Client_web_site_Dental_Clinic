import React, { useState } from 'react'
import '../css/PayService.css'
import Swal from 'sweetalert2'
import { Form } from 'react-bootstrap';
import '../css/profile.css'
import { DoctorAddMedicalFileUser } from '../Api/ConnectOrAddFromApi'
import { UpdateDataUserRemoveTurn, ActiveHourInDataBase } from '../Api/DeleteUpdateDataFromApi'
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';



//here component Add Medical File User , doctor add a file to user,and user can see how much pay need and see what doctor write and docoment = this component use in profile doctor
function AddMedicalFileUser(props) {

    const [File_user, setFile_user] = useState('');
    const [textDoctor, setTextDoctor] = useState('');
    const [priceSevice, setPriceSevice] = useState('');

    let date = JSON.parse(sessionStorage.getItem("userDateMedical"));
    let storedTheme = localStorage.getItem("theme");



    const checkIfUrlLinkImageFile = urlString => {
        var urlPattern = new RegExp('(jpg|jpeg|png|webp|avif|gif|svg)')
        return !!urlPattern.test(urlString);
    }



    
    const checkInput = () => {

        let check = checkIfUrlLinkImageFile(File_user)

        if (textDoctor == '' || priceSevice == '' || isNaN(priceSevice) || check == false) {

            Swal.fire({
                icon: 'warning',
                text: 'input please value Or Price in Not number Or in not url link image !',
                toast: true,
                position: 'top-end',
                confirmButtonColor: "green",
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`
            })
            return;
        }

        else {
            addMedicalFileUser();
        }
    }




    const addMedicalFileUser = async () => {

        let d = new Date();

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

        await ActiveHourInDataBase(date.CodeHour);

        await DoctorAddMedicalFileUser(File);

        await UpdateDataUserRemoveTurn(date.User_code);

        
        Swal.fire({
            title: 'success',
            icon: 'success',
            toast: true,
            position: 'top-end',
            confirmButtonColor: "green",
            background: `${(storedTheme === "light") ? "#373E44" :
                (storedTheme === "dark") ? "" : ""}`,
            color: `${(storedTheme === "light") ? "#ffffffab" :
                (storedTheme === "dark") ? "" : ""}`,
            buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                (storedTheme === "dark") ? "" : ""}`
        }).then((result) => {

            if (result.isConfirmed) {
                sessionStorage.removeItem('userDateMedical');
                window.location.reload(false);
            }
        })
    }



    return (

        <div className={(storedTheme === "light") ? "modelPopUpSendFilePayToUserDark" : (storedTheme === "dark") ? "modelPopUpSendFilePayToUser" : ""}>

            <div className="closeModelSendFilePayToUser">
                <Button style={(storedTheme === "light") ? { background: "#424242" } :
                    (storedTheme === "dark") ? { background: "white" } : ""}
                    variant="contained"
                    onClick={props.hideModelMedicalFile} >

                    <CloseIcon style={(storedTheme === "light") ? { fontSize: "20px", color: "white" } :
                        (storedTheme === "dark") ? { fontSize: "20px", color: "black" } : ""} />
                </Button>
            </div>


            <div className='titleFileUser'>
                <h1 style={(storedTheme === "light") ? { color: "#ffffffab" } :
                    (storedTheme === "dark") ? { color: "gray" } : ""}>
                    Medical File 📁 {date.FirstName}</h1>
            </div>


            <div className={(storedTheme === "light") ? "inputMedicalDateDark" : (storedTheme === "dark") ? "inputMedicalDate" : ""}>

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
                    <Button style={{ fontSize: "13px", color: "white", background: "green" }} variant="contained"
                        onClick={checkInput} startIcon={<DoneIcon />}>
                        Success
                    </Button>
                </div>

            </div>
        </div>
    )

}


export default AddMedicalFileUser