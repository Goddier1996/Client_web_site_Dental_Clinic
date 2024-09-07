import React from "react";
import { useHistory } from "react-router-dom";


const MoveContactPageProblem = () => {

    
  const history = useHistory();

  const moveToContactPage = () => {
    history.push("/Location");
    window.location.reload(false);
  };

    
  return (
    <>
      <p>
        You have problem ?<br />
        Click move to contact page
        <br />
        <span style={{ fontSize: "25px" }}>👇</span>
      </p>

      <p className="sendMailHaveProblem" style={{ fontSize: "15px" }} onClick={() => moveToContactPage()}>
        Send Mail
      </p>
    </>
  );
};


export default MoveContactPageProblem;