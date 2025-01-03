import React from "react";
import { Modal } from "react-bootstrap";
import LazyLoadImg from "../../../../tools/lazyLoad/LazyLoadImg";


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
            img="https://i.postimg.cc/J7D24mzt/message.png"
            width=""
            height="90"
            alt="message"
          />
          <p style={{ marginTop: "0%" }}>
            You Don't Have Queues ! <br />
            Go to the home page, and order by clicking the queue button. <br />
            Or <br />
            Click{" "}
            <a style={{ textDecoration: "none", fontWeight: "bold" }} href="/">
              Home Page
            </a>
          </p>
        </div>
      </Modal.Body>
    </Modal.Dialog>
  );
};


export default MessageNotHaveTurnUser;