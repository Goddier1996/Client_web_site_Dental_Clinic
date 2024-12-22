import React from "react";
import { Button } from "react-bootstrap";
import {sendEmailToUserPayDebt} from "../../function/DoctorFunctionService.js";


const ShowUsersWhoNeedPay = ({ user, ClientHowNeedPay }) => {

  return (
    <>
      <tr>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          {ClientHowNeedPay++}
        </td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>{user.name}</td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>{user.email}</td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          {user.Date_published}
        </td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          {user.priceSevice} $
        </td>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
           <Button
            variant="success"
            onClick={() => sendEmailToUserPayDebt(user)}
          >
            <i className="bi bi-send"></i>
          </Button>
        </td>
      </tr>
    </>
  );
};


export default ShowUsersWhoNeedPay;