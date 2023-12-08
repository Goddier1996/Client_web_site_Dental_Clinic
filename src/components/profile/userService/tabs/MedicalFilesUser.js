import React, { useState } from 'react'
import { Modal, Table } from 'react-bootstrap';
import PayService from '../PayService'
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachFileIcon from '@mui/icons-material/AttachFile';



const MedicalFilesUser = ({ medical_File }) => {

    
    let CountReview = 1;
    let storedTheme = localStorage.getItem("theme");

    // popup pay service
    const [showPayService, setShowPayService] = useState(false);
    const handleShowPayService = () => setShowPayService(true);



    //open pop up pay service , save the data to sessionStorage , to use in component PayService
    const OpenPopUpPay = (Serial_code, priceSevice, FirstName) => {

        handleShowPayService();

        let PayDetails = { Serial_code: Serial_code, priceSevice: priceSevice, userName: FirstName }

        sessionStorage.setItem("PayDetails", JSON.stringify(PayDetails))
    }



    // send this function to PayService component
    const hideModelPayService = () => {

        sessionStorage.removeItem("PayDetails");
        window.location.reload(false);
    }



    return (
        <>
            <Table striped bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>
                <thead>
                    <tr>
                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                        <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>
                        <td style={{ width: "1%" }}></td>
                        <td style={{ width: "1%" }}></td>
                    </tr>
                </thead>

                {medical_File.map(File =>

                    <tbody key={File._id}>
                        <tr>
                            <td style={{ textAlign: "center", fontSize: "14px" }}>{CountReview++}</td>
                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.Date_published}</td>
                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice} $</td>

                            <td style={{ textAlign: "center", fontSize: "14px" }}>
                                <Button style={{ fontSize: "11px", background: "gray", color: "white" }} variant="contained" href={File.File_user} startIcon={<AttachFileIcon />}>
                                    File
                                </Button>
                            </td>

                            <td style={{ textAlign: "center", fontSize: "14px" }}>
                                <Button style={{ fontSize: "11px" }} variant="contained" onClick={() => OpenPopUpPay(File._id, File.priceSevice, File.name)} startIcon={<PaymentIcon />}>
                                    Pay
                                </Button>
                            </td>
                        </tr>
                    </tbody>

                )}
            </Table>

            <Modal show={showPayService} onHide={hideModelPayService} >
                <PayService hideModelPayService={hideModelPayService} />
            </Modal>
        </>
    )
}

export default MedicalFilesUser;