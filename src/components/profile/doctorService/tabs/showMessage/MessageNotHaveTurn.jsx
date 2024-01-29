import React from "react";
import { Modal } from "react-bootstrap";


const MessageNotHaveTurn = () => {

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
          <b>Message for Doctor</b> <br />
          Hi Doctor you don't have queues.
        </p>
      </Modal.Body>
    </Modal.Dialog>
  );
};


export default MessageNotHaveTurn;