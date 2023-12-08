import React from 'react'
import { Button, Table } from 'react-bootstrap';



const ShowAllUsersBlocked = ({ UsersBlocked, ActiveUser }) => {

    let CountUserBlock = 1;
    let storedTheme = localStorage.getItem("theme");


    return (
        <>
            <Table bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>

                <thead>
                    <tr>
                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                        <th style={{ width: "1%", textAlign: "center" }}>Login</th>
                        <th style={{ width: "1%", textAlign: "center" }}>First Name</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Birthday</th>
                        <th style={{ width: "3%", textAlign: "center" }}>Password</th>
                        <td style={{ width: "1%" }}></td>
                    </tr>
                </thead>

                {UsersBlocked.map(user =>

                    <tbody key={user._id}>
                        <tr>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{CountUserBlock++}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>


                            <td style={{ textAlign: "center", fontSize: "14px" }}>
                                <Button size="sm" variant="success" onClick={() => ActiveUser(user._id)}>Reactive</Button>
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>
        </>
    )
}

export default ShowAllUsersBlocked;