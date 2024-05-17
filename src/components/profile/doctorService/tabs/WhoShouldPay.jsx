import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Table, Button } from "react-bootstrap";
import { compareDates } from "../function/DoctorFunctionService";


const WhoShouldPay = ({ medical_File_All_users }) => {


  let storedTheme = localStorage.getItem("theme");
  let ClientHowNeedPay = 1;

  // Sorting the data by date before rendering
  const sortedData = [...medical_File_All_users].sort(compareDates);

    
  return (
    <>
      <Table
        striped
        bordered
        hover
        size="sm"
        variant={
          storedTheme === "light" ? "dark" : storedTheme === "dark" ? "" : ""
        }
      >
        <thead>
          <tr>
            <th style={{ width: "1%", textAlign: "center" }}>#</th>
            <th style={{ width: "8%", textAlign: "center" }}>Name client</th>
            <th style={{ width: "10%", textAlign: "center" }}>Email</th>
            <th style={{ width: "5%", textAlign: "center" }}>Date of visit</th>
            <th style={{ width: "4%", textAlign: "center" }}>Need Pay</th>
            <th style={{ width: "4%", textAlign: "center" }}>Send Email</th>
          </tr>
        </thead>

        {sortedData.map((user) => (
          <tbody key={user._id} className="viewDateUser">
            <tr>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {ClientHowNeedPay++}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {user.name}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {user.email}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {user.Date_published}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {user.priceSevice} $
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                <Button
                  variant="success"
                  onClick={() => (window.location = "https://mail.google.com")}
                >
                  <i className="bi bi-send"></i>
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
};


export default WhoShouldPay;