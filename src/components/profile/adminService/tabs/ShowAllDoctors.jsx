import React from 'react'
import { Button, Table } from 'react-bootstrap';



const ShowAllDoctors = ({ Doctors, DeleteItemsFromDataApi }) => {


    let CountDoctor = 1;
    let storedTheme = localStorage.getItem("theme");


    return (
        <>
            <Table bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>

                <thead>
                    <tr>
                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Login</th>
                        <th style={{ width: "4%", textAlign: "center" }}>First Name</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                        <td style={{ width: "1%" }}></td>
                    </tr>
                </thead>

                {Doctors.map(doctor =>

                    <tbody key={doctor._id}>
                        <tr>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{CountDoctor++}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.User_Login}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.FirstName}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.Email}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.User_password}</td>


                            <td style={{ textAlign: "center", fontSize: "14px" }}>
                                <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(doctor._id, "user")}>Block</Button>
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>
        </>
    )
}

export default ShowAllDoctors;