import React from "react";
import { useHistory } from "react-router-dom";
import LazyLoadImg from "../../tools/lazyLoad/LazyLoadImg";



const MoveContactPageProblem = () => {

    
  const history = useHistory();

  const moveToContactPage = () => {
    history.push("/Location");
    window.location.reload(false);
  };

    
  return (
    <>
      <p>
        you have problem change password ?<br />
        Click move to page contact (Send Mail)
        <br />
        <span style={{ fontSize: "25px" }}>👇</span>
      </p>

      <div onClick={() => moveToContactPage()}>
        <LazyLoadImg
          type=""
          img="https://i.postimg.cc/3J5v3RQ7/1.webp"
          width=""
          height=""
          alt="contact"
        />
      </div>
    </>
  );
};


export default MoveContactPageProblem;