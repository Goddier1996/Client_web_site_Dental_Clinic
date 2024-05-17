import React from "react";
import { Table } from "react-bootstrap";
import ShowFile from "./ShowFile";
import { compareDates } from "../../../doctorService/function/DoctorFunctionService";


const MedicalFilesUser = ({ medical_File }) => {


  let CountReview = 1;
  let storedTheme = localStorage.getItem("theme");

  // Sorting the data by date before rendering
  const sortedData = [...medical_File].sort(compareDates);

    
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
            <th style={{ width: "3%", textAlign: "center" }}>Pay</th>
          </tr>
        </thead>

        {sortedData.map((File) => (
          <tbody key={File._id}>
            <ShowFile dataFile={File} countFiles={CountReview++} />
          </tbody>
        ))}
      </Table>
    </>
  );
};


export default MedicalFilesUser;