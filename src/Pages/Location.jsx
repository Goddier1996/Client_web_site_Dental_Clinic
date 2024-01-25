import React from "react";
import "../css/loction.css";
import { Modal } from "react-bootstrap";
import SendEmail from "../components/locationContact/sendEmail/SendEmail.jsx";
import { motion as m } from "framer-motion/dist/framer-motion";
import { container } from "../styleComponents/StyleAnimation.js";
import ContactInfo from "../components/locationContact/ContactInfo.jsx";
import ShowHoursWork from "../components/locationContact/hoursWork/ShowHoursWork.jsx";
import ButtonSendEmail from "../components/locationContact/sendEmail/ButtonSendEmail.jsx";
import CalcDistanceToClinic from "../components/locationContact/map/CalcDistanceToClinic.jsx";
import ShowMap from "../components/locationContact/map/ShowMap.jsx";
import OpenOrCloseClinic from "../components/locationContact/hoursWork/OpenOrCloseClinic.jsx";
import { ShowModelPopUp } from "../customHook/showPopUp.js";
import  LazyLoadImg  from "../components/tools/lazyLoad/LazyLoadImg.jsx";



//here we show Location the clinic , send message + show data from json file
function Location() {


  let storedTheme = localStorage.getItem("theme");

  // show popup send message custom Hook
  const { show, handleClose, handleShow } = ShowModelPopUp();


  return (
    <m.div variants={container} initial="hidden" animate="show">
      <section className="bannerLoction">
        <div
          className={
            storedTheme == "light"
              ? "boxLoctionDark"
              : storedTheme == "dark"
              ? "boxLoction"
              : ""
          }
        >
          <h3>Contact</h3>
          {/* contact component */}
          <ContactInfo />

          {/* Button send mail */}
          <ButtonSendEmail popUpSendMessage={handleShow} />

          {/* pop up show email input value and send */}
          <Modal show={show} onHide={() => handleClose()}>
            <SendEmail hideModelSendMessage={() => handleClose()} />
          </Modal>

          {/* here show distance go to clinic from user location */}
          <CalcDistanceToClinic />

          {/* show map component */}
          <ShowMap />
        </div>

        <div
          className={
            storedTheme == "light"
              ? "box contectDark"
              : storedTheme == "dark"
              ? "box contect"
              : ""
          }
        >
          <div
            className={
              storedTheme == "light"
                ? "logDark"
                : storedTheme == "dark"
                ? "log"
                : ""
            }
          >
            <h3>Hours Work Clinic</h3>

            {/* show component open or close clinic */}
            <OpenOrCloseClinic />

            {/* show hours clinic */}
            <ShowHoursWork />

            <div style={{ marginTop: "80px", marginBottom: "80px" }}>
              <LazyLoadImg
                type=""
                img="https://i.postimg.cc/wTLhkftp/88.webp"
                width="140"
                height=""
                alt="clock"
              />
            </div>
          </div>
        </div>
      </section>
    </m.div>
  );
}


export default Location;