import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { sendEmailToUserPayDebt } from "../../function/DoctorFunctionService.js";
import { doctorSendMailToUser } from "../../../../../customHook/customQueryHook.js";


const ShowUsersWhoNeedPay = ({ user, ClientHowNeedPay }) => {

  // react query
  const { mutate, isLoading: isSendMail } = doctorSendMailToUser();


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
          {!isSendMail ? (
            <Button
              style={!isSendMail ? { cursor: "not-allowed" } : {}}
              variant="success"
              disabled={isSendMail}
              type="submit"
              onClick={() => mutate(user)}
            >
              <i className="bi bi-send"></i>
            </Button>
          ) : (
            <Button variant="success">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          )}
        </td>
      </tr>
    </>
  );
};


export default ShowUsersWhoNeedPay;