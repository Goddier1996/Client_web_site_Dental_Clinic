import React, { useEffect, useState } from "react";
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



//here we show Location the clinic , send message + show data from json file
function Location() {


  let storedTheme = localStorage.getItem("theme");

  // show popup send message custom Hook
  const { show, handleClose, handleShow } = ShowModelPopUp();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src =
      "https://i.postimg.cc/xjyYhkHX/6bb2445d-b4c0-4f8e-a551-9e2c8da4b9ca.png";
    img.onload = () => setLoaded(true);
  }, []);

  
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
          style={{
            backgroundImage: loaded
              ? `url(https://i.postimg.cc/xjyYhkHX/6bb2445d-b4c0-4f8e-a551-9e2c8da4b9ca.png)`
              : ` url(https://i.postimg.cc/SKdZSGGP/contact-page-img-main.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: loaded ? "none" : "blur(20px)",
            transition: "filter 0.6s ease-out",
          }}
        >
          <div
            className="log blurAllInfoHours"
          >
            <h3>Hours Work Clinic</h3>

            {/* show component open or close clinic */}
            <OpenOrCloseClinic />

            {/* show hours clinic */}
            <ShowHoursWork />
            <br />
          </div>
        </div>
      </section>
    </m.div>
  );
}

export default Location;
