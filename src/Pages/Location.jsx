import React, { useState } from "react";
import "../css/loction.css";
import { Modal , Card } from "react-bootstrap";
import SendEmail from "../components/locationContact/sendEmail/SendEmail.jsx";
import { motion as m } from "framer-motion/dist/framer-motion";
import { container } from "../styleComponents/StyleAnimation.js";
import ContactInfo from "../components/locationContact/ContactInfo.jsx";
import ShowHoursWork from "../components/locationContact/hoursWork/ShowHoursWork.jsx";
import ButtonSendEmail from "../components/locationContact/sendEmail/ButtonSendEmail.jsx";
import CalcDistanceToClinic from "../components/locationContact/map/CalcDistanceToClinic.jsx";
import ShowMap from "../components/locationContact/map/ShowMap.jsx";
import OpenOrCloseClinic from "../components/locationContact/hoursWork/OpenOrCloseClinic.jsx";



//here we show Location the clinic , send message + show data from json file
function Location() {


  let storedTheme = localStorage.getItem("theme");

    
  // show popup send message
  const [showSendMessage, setShowSendMessage] = useState(false);

  const popUpSendMessage = () => {
    setShowSendMessage(true);
  };

    
    
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
          <ContactInfo />

          <br />

          {/* Button send mail */}
          <ButtonSendEmail popUpSendMessage={popUpSendMessage} />

          {/* pop up show email input value and send */}
          <Modal
            show={showSendMessage}
            onHide={() => setShowSendMessage(false)}
          >
            <SendEmail hideModelSendMessage={() => setShowSendMessage(false)} />
          </Modal>

          {/* here show distance go to clinic from user location */}
          <CalcDistanceToClinic />

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

            <OpenOrCloseClinic />

            <ShowHoursWork />

            <br />
            <br />
            <Card.Img
              variant="top"
              src="https://i.postimg.cc/wTLhkftp/88.webp"
              alt="clock"
            />
            <br />
            <br />
          </div>
        </div>
      </section>
    </m.div>
  );
}


export default Location;