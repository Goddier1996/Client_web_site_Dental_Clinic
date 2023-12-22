import React, { useState } from 'react'
import { Modal, Table } from 'react-bootstrap';
import PayService from '../payService/PayService'
import Button from 'react-bootstrap/Button';
import "bootstrap-icons/font/bootstrap-icons.css";



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


    return (
        <>
            <Table striped bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>
                <thead>
                    <tr>
                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
                        <th style={{ width: "18%", textAlign: "center" }}>Doctor's response</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>
                        <th style={{ width: "3%", textAlign: "center" }}>File</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Pay</th>
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
                                <Button variant="secondary" href={File.File_user}>
                                  <i class="bi bi-file-earmark-richtext"></i>
                                </Button>
                            </td>

                            <td style={{ textAlign: "center", fontSize: "14px" }}>
                                <Button variant="success" onClick={() => OpenPopUpPay(File._id, File.priceSevice, File.name)}>
                                  <i class="bi bi-credit-card"></i>
                                </Button>
                            </td>
                        </tr>
                    </tbody>

                )}
            </Table>

            <Modal show={showPayService} >
                <PayService/>
            </Modal>
        </>
    )
}

export default MedicalFilesUser;