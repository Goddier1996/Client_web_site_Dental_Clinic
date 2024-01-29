import React from "react";
import { Modal } from "react-bootstrap";



const MessageNotHaveTurnUser = () => {

  let storedTheme = localStorage.getItem("theme");

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
        <p>
          You Don't Have Queues ! <br />
          Go to the home page, and order by clicking the queue button. <br />
          Or <br />
          Click{" "}
          <a style={{ textDecoration: "none", fontWeight: "bold" }} href="/">
            Home Page
          </a>
        </p>
      </Modal.Body>
    </Modal.Dialog>
  );
};


export default MessageNotHaveTurnUser;