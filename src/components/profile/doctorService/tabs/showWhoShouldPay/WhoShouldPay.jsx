import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Table } from "react-bootstrap";
import { compareDates } from "../../function/DoctorFunctionService";
import ShowUsersWhoNeedPay from "./ShowUsersWhoNeedPay";
import ShowMessageToUserAndDoctor from "../../../tools/ShowMessageToUserAndDoctor";


const WhoShouldPay = ({ medical_File_All_users }) => {

  let storedTheme = localStorage.getItem("theme");
  let ClientHowNeedPay = 1;

  // Sorting the data by date before rendering
  const sortedData = [...medical_File_All_users].sort(compareDates);

  return (
    <>
      {medical_File_All_users.length ? (
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
              <th style={{ width: "5%", textAlign: "center" }}>
                Date of visit
              </th>
              <th style={{ width: "4%", textAlign: "center" }}>Need Pay</th>
              <th style={{ width: "4%", textAlign: "center" }}>Send Email</th>
            </tr>
          </thead>

          {sortedData.map((user) => (
            <tbody key={user._id} className="viewDateUser">
              <ShowUsersWhoNeedPay
                user={user}
                ClientHowNeedPay={ClientHowNeedPay++}
              />
            </tbody>
          ))}
        </Table>
      ) : (
        <ShowMessageToUserAndDoctor
          forHowSeeThisMessage={"Message for Doctor"}
          whichMessageShow={"Hi Doctor you don't have clients who need to pay."}
        />
      )}
    </>
  );
};


export default WhoShouldPay;