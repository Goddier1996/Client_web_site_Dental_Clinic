import React from "react";
import { Table } from "react-bootstrap";
import ShowFile from "./ShowFile";
import { compareDates } from "../../../doctorService/function/DoctorFunctionService";
import ShowMessageToUser from "../../../tools/ShowMessageToUserAndDoctor";
import LazyLoadImg from "../../../../tools/lazyLoad/LazyLoadImg";


const MedicalFilesUser = ({ medical_File }) => {


  let CountReview = 1;
  let storedTheme = localStorage.getItem("theme");

  // Sorting the data by date before rendering
  const sortedData = [...medical_File].sort(compareDates);


  return (
    <>
      <div className="medicalFilesUser">
        <LazyLoadImg
          type=""
          img="https://i.postimg.cc/521KpxMM/Pngtree-credit-card-payment-icon-20605762.png"
          width=""
          height="100"
          alt="medicalFilesUser"
        />
      </div>

      {medical_File.length ? (
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
              <th style={{ width: "3%", textAlign: "center" }}>Pay</th>
            </tr>
          </thead>

          {sortedData.map((File) => (
            <tbody key={File._id}>
              <ShowFile dataFile={File} countFiles={CountReview++} />
            </tbody>
          ))}
        </Table>
      ) : (
        <ShowMessageToUser
          forHowSeeThisMessage={"Message for User"}
          whichMessageShow={"Hi User you don't have medical files."}
        />
      )}
    </>
  );
};


export default MedicalFilesUser;