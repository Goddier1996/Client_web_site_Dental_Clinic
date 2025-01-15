import React from "react";
import Cookies from 'js-cookie';
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ActiveHourDontNeedTurn } from "../../function/UserProfileFunction";
import LazyLoadImg from "../../../../tools/lazyLoad/LazyLoadImg";



const MessageUserHaveTurn = ({ dataUser }) => {


  let storedTheme = localStorage.getItem("theme");
  // let userData = JSON.parse(sessionStorage.getItem("user"));
  let userData = Cookies.get('user-data') ? JSON.parse(Cookies.get('user-data')) : null;
  

  let history = useHistory();

  const ActiveHourIfUserDontNeedTurn = () => {
    ActiveHourDontNeedTurn(dataUser.codeHour, history, dataUser.code);
  };


  return (
    <Modal.Dialog
      className={
        storedTheme === "light"
          ? "showMyQueuesDark"
          : storedTheme === "dark"
          ? "showMyQueues"
          : ""
      }
    >
      <Modal.Body>
        <div
          style={
            storedTheme === "light"
              ? { marginTop: "-25%", color: "white" }
              : storedTheme === "dark"
              ? { marginTop: "-25%" }
              : ""
          }
        >
          <LazyLoadImg
            type=""
            img="https://i.postimg.cc/qMTjH8f1/doctor1.webp"
            width=""
            height="90"
            alt="Doctor"
          />
          <h5
            style={
              storedTheme === "light"
                ? { fontSize: "18px", color: "#ffffffab" }
                : storedTheme === "dark"
                ? { fontSize: "18px", color: "rgba(0, 0, 0, 0.58)" }
                : ""
            }
          >
            It's Your Turn {userData.FirstName}:
          </h5>
          <h5 style={{ fontSize: "16px", color: "green" }}>
            {userData.DateUserTurn}
            <br />
            <br />
            Day: {userData.Day_date}
            <br />
            Time: {userData.Hour_day}
          </h5>

          <br />
          <h5 style={{ fontSize: "14px", color: "#44A6DD" }}>
            You Saved This Turn at: {userData.DateWhenAddUserTurn}
          </h5>
          <h6
            style={
              storedTheme === "light"
                ? { fontSize: "12px", color: "white" }
                : storedTheme === "dark"
                ? { fontSize: "12px", color: "black" }
                : ""
            }
          >
            if you don`t need this queue Please cancel !
          </h6>
        </div>
      </Modal.Body>

      <Modal.Footer className="ButtonQueues">
        <Button variant="danger" onClick={() => ActiveHourIfUserDontNeedTurn()}>
          Delete Queues <i className="bi bi-x-lg"></i>
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};


export default MessageUserHaveTurn;