import React from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { compareDates } from "../../doctorService/function/DoctorFunctionService";


const HistoryMedicalFile = ({ medical_File_Is_Not_Active }) => {

  let HistoryPayFile = 1;
  let storedTheme = localStorage.getItem("theme");

    

  // Sorting the data by date before rendering
  const sortedData = [...medical_File_Is_Not_Active].sort(compareDates);

    
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
            <th style={{ width: "3%", textAlign: "center" }}>Date Publish</th>
            <th style={{ width: "18%", textAlign: "center" }}>
              Doctor's response
            </th>
            <th style={{ width: "3%", textAlign: "center" }}>Price Service</th>
            <th style={{ width: "3%", textAlign: "center" }}>File</th>
          </tr>
        </thead>

        {sortedData.map((File) => (
          <tbody key={File._id}>
            <tr>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {HistoryPayFile++}
              </td>
              <td style={{ textAlign: "center", fontSize: "12px" }}>
                {File.Date_published}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {File.textDoctor}
              </td>
              <td style={{ textAlign: "center", fontSize: "14px" }}>
                {File.priceSevice} $
              </td>

              <td style={{ textAlign: "center", fontSize: "14px" }}>
                <Button variant="secondary" href={File.File_user}>
                  <i className="bi bi-file-earmark-richtext"></i>
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
};


export default HistoryMedicalFile;