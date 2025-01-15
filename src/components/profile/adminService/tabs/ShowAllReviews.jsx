import React from 'react'
import { Button, Table } from 'react-bootstrap';


const ShowAllReviews = ({ Reviews, DeleteItemsFromDataApi }) => {

    let CountReview = 1;
    let storedTheme = localStorage.getItem("theme");

    return (
        <>
            <Table bordered hover size="sm" variant={(storedTheme === "light") ? "dark" : (storedTheme === "dark") ? "" : ""}>
                <thead>
                    <tr>
                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                        <th style={{ width: "1%", textAlign: "center" }}>First Name</th>
                        <th style={{ width: "10%", textAlign: "center" }}>Reviews</th>
                        <th style={{ width: "1%", textAlign: "center" }}>Date Published</th>
                        <td style={{ width: "1%" }}></td>
                    </tr>
                </thead>

                {Reviews.map(Review =>
                    <tbody key={Review._id}>
                        <tr>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{CountReview++}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.FirstName}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.textReviews}</td>
                            <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.DatePublished}</td>


                            <td style={{ textAlign: "center", fontSize: "13px" }}>
                                <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(Review._id, "review")}>Block</Button>
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>
        </>
    )
}

export default ShowAllReviews;