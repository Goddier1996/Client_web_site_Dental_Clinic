import React from 'react'
import { Table } from 'react-bootstrap';
import ShowFile from './ShowFile';



const MedicalFilesUser = ({ medical_File }) => {

    
    let CountReview = 1;
    let storedTheme = localStorage.getItem("theme");

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
                        <ShowFile dataFile={File} countFiles={CountReview++} />
                    </tbody>
                )}
            </Table>
        </>
    )
}


export default MedicalFilesUser;