import React from "react";
import { Button } from "react-bootstrap";


const ShowHistoryFIles = ({ File, countFiles }) => {
  return (
    <>
      <tr>
        <td style={{ textAlign: "center", fontSize: "14px" }}>
          {countFiles++}
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
    </>
  );
};


export default ShowHistoryFIles;