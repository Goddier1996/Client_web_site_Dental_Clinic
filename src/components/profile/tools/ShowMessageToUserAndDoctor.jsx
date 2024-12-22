import React from "react";
import { Modal } from "react-bootstrap";
import LazyLoadImg from "../../../components/tools/lazyLoad/LazyLoadImg";

const ShowMessageToUserAndDoctor = ({

  whichMessageShow,
  forHowSeeThisMessage,
}) => {

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
            <b>{forHowSeeThisMessage}</b> <br />
            {whichMessageShow}
          </p>
        </div>
      </Modal.Body>
    </Modal.Dialog>
  );
};


export default ShowMessageToUserAndDoctor;