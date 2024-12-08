import React from "react";
import { Button } from "react-bootstrap";


const AllUsersNeedSendFile = ({
  dataShowAllUsers,
  CountClient,
  updateDayHour,
}) => {


  return (
    <>
      <tr>
        <td style={{ textAlign: "center", fontSize: "14px" }}>{CountClient}</td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          {dataShowAllUsers.FirstName}
        </td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          {dataShowAllUsers.Email}
        </td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          {dataShowAllUsers.DateUserTurn}
        </td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          {dataShowAllUsers.Hour_day}
        </td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          {dataShowAllUsers.DateWhenAddUserTurn}
        </td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          <Button
            variant="success"
            onClick={() => updateDayHour(dataShowAllUsers)}
          >
            <i className="bi bi-file-earmark-richtext"></i>
          </Button>
        </td>
      </tr>
    </>
  );
};


export default AllUsersNeedSendFile;