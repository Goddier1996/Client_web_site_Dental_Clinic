import React from 'react'
import { Table } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { DeleteReview } from '../../../../Api/DeleteUpdateDataFromApi'
import Swal from 'sweetalert2'



const MyComments = ({ myReview }) => {

    
    let storedTheme = localStorage.getItem("theme");
    let MyReviews = 1;


    const DeleteReviewUser = async (Id) => {

        await Swal.fire({
            title: 'you delete this Review',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            position: 'top-end',
            background: `${(storedTheme === "light") ? "#373E44" :
                (storedTheme === "dark") ? "" : ""}`,
            color: `${(storedTheme === "light") ? "#ffffffab" :
                (storedTheme === "dark") ? "" : ""}`,
            buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                (storedTheme === "dark") ? "" : ""}`
        })

        await DeleteReview(Id);
        // window.location.reload(false);
    }


    return (
        <>
            <Table striped bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>
                <thead>
                    <tr>
                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                        <th style={{ width: "18%", textAlign: "center" }}>Date Publish</th>
                        <th style={{ textAlign: "center" }}>Review</th>
                        <th style={{ width: "1%" }}></th>
                    </tr>
                </thead>

                {myReview.map(Review =>

                    <tbody key={Review._id}>
                        <tr>
                            <td style={{ textAlign: "center", fontSize: "14px" }}>{MyReviews++}</td>
                            <td style={{ textAlign: "center", fontSize: "12px" }}>{Review.DatePublished}</td>
                            <td style={{ textAlign: "center", fontSize: "14px" }}>{Review.textReviews}</td>
                            <td style={{ textAlign: "center", fontSize: "14px" }}>

                                <Button style={{ fontSize: "11px", background: "red", color: "white" }} variant="contained" onClick={() => DeleteReviewUser(Review._id)}
                                    startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>
        </>
    )
}

export default MyComments;