import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal , Button } from "react-bootstrap";
import PayService from "./payService/PayService";



const ShowFile = ({dataFile,countFiles}) => {


  // popup pay service
  const [showPayService, setShowPayService] = useState(false);
  const handleShowPayService = () => setShowPayService(true);

    
  return (
    <>
      <>
        <tr>
          <td style={{ textAlign: "center", fontSize: "14px" }}>
            {countFiles}
          </td>
          <td style={{ textAlign: "center", fontSize: "14px" }}>
            {dataFile.Date_published}
          </td>
          <td style={{ textAlign: "center", fontSize: "14px" }}>
            {dataFile.textDoctor}
          </td>
          <td style={{ textAlign: "center", fontSize: "14px" }}>
            {dataFile.priceSevice} $
          </td>

          <td style={{ textAlign: "center", fontSize: "14px" }}>
            <Button variant="secondary" href={dataFile.File_user}>
              <i className="bi bi-file-earmark-richtext"></i>
            </Button>
          </td>

          <td style={{ textAlign: "center", fontSize: "14px" }}>
            <Button
              variant="success"
              onClick={() =>
                handleShowPayService()
              }
            >
              <i className="bi bi-credit-card"></i>
            </Button>
          </td>
        </tr>
      </>

      <Modal show={showPayService}>
            <PayService dataUserPay={dataFile} closePopUp={() => setShowPayService(false)} />
      </Modal>
    </>
  );
};


export default ShowFile;