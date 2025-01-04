import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { compareDates } from "../../../doctorService/function/DoctorFunctionService";
import ShowMessageToUserAndDoctor from "../../../tools/ShowMessageToUserAndDoctor";
import ShowHistoryFIles from "./ShowHistoryFIles";


const HistoryMedicalFile = ({ medical_File_Is_Not_Active }) => {


  let HistoryPayFile = 1;
  let storedTheme = localStorage.getItem("theme");

  // Sorting the data by date before rendering
  const sortedData = [...medical_File_Is_Not_Active].sort(compareDates);


  return (
    <>
      {medical_File_Is_Not_Active.length ? (
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
              <th style={{ width: "3%", textAlign: "center" }}>
                Price Service
              </th>
              <th style={{ width: "3%", textAlign: "center" }}>File</th>
            </tr>
          </thead>

          {sortedData.map((File) => (
            <tbody key={File._id}>
              <ShowHistoryFIles File={File} countFiles={HistoryPayFile++} />
            </tbody>
          ))}
        </Table>
      ) : (
        <ShowMessageToUserAndDoctor
          forHowSeeThisMessage={"Message for User"}
          whichMessageShow={"Hi User you don't have medical files."}
        />
      )}
    </>
  );
};


export default HistoryMedicalFile;