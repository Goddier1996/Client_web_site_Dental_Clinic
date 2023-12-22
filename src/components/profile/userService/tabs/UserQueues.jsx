import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { ActiveHourDontNeedTurn } from "../function/UserProfileFunction";


const UserQueues = ({ day, data_user }) => {


  let storedTheme = localStorage.getItem("theme");
  let userData = JSON.parse(sessionStorage.getItem("user"));

  let history = useHistory();

    
  const ActiveHourIfUserDontNeedTurn = () => {
    
    ActiveHourDontNeedTurn(data_user.codeHour, history, data_user.code);
  };

    
    
  return (
    <>
      <Modal.Dialog
        className={
          storedTheme === "light"
            ? "showMyQueuesDark"
            : storedTheme === "dark"
            ? "showMyQueues"
            : ""
        }
      >
        {day == null ? (
          <>
            <Modal.Body>
              <p>
                You Don't Have Queues ! <br />
                Go to the home page, and order by clicking the queue button.{" "}
                <br />
                Or <br />
                Click{" "}
                <a
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                  href="/"
                >
                  Home Page
                </a>
              </p>
            </Modal.Body>
          </>
        ) : day != null ? (
          <>
            <Modal.Body>
              <div
                style={
                  storedTheme === "light"
                    ? { marginTop: "-20%", color: "white" }
                    : storedTheme === "dark"
                    ? { marginTop: "-20%" }
                    : ""
                }
              >
                <h6>Your Queues :</h6>
                <br />
                Day : {userData.Day_date}
                <br />
                Hour : {userData.Hour_day}
                <br />
                <br />
                <h6
                  style={
                    storedTheme === "light"
                      ? { fontSize: "13px", color: "white" }
                      : storedTheme === "dark"
                      ? { fontSize: "13px", color: "black" }
                      : ""
                  }
                >
                  if you don`t need this queue Please cancel !
                </h6>
              </div>
            </Modal.Body>

            <Modal.Footer className="ButtonQueues">
              <Button
                style={{
                  fontSize: "12px",
                  color: "white",
                  background: "green",
                }}
                variant="contained"
                onClick={() => ActiveHourIfUserDontNeedTurn()}
                startIcon={<CloseIcon />}
              >
                Delete Queues
              </Button>
            </Modal.Footer>
          </>
        ) : (
          ""
        )}
      </Modal.Dialog>
    </>
  );
};


export default UserQueues;