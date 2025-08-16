import "../css/home.css";
import React, { useEffect, useState } from "react";
import Category from "../components/homeOptions/Category.jsx";
import { motion as m } from "framer-motion/dist/framer-motion";
import { container, item } from "../styleComponents/StyleAnimation";
import PopUpAppointment from "../components/homeOptions/PopUpAppointment.jsx";
import { ShowModelPopUp } from "../customHook/showPopUp.js";
import { CheckUserConnectedForAddTurn } from "../components/addAppointment/function/AddTurnFunctions.js";
import ButtonAppointment from "../components/homeOptions/ButtonAppointment.jsx";


function Home() {

  const {
    showShowTurn,
    handleCloseShowTurn,
    handleShowShowTurn,
  } = ShowModelPopUp();


  const CheckUserConnected = () => {
    CheckUserConnectedForAddTurn(() => handleShowShowTurn());
  };

  

  // State to manage image loading
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://i.postimg.cc/7Z6z0YvG/2022.jpg";
    img.onload = () => setLoaded(true);
  }, []);



  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <div
        className="startImg"
        style={{
          backgroundImage: loaded
            ? `
              linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
            url(https://i.postimg.cc/7Z6z0YvG/2022.jpg)`
            : `
            linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
            url(https://i.postimg.cc/dtvC4jCy/main-home-img.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: loaded ? "none" : "blur(20px)",
          transition: "filter 0.6s ease-out",
        }}
      >
        <m.div
          variants={container}
          initial="hidden"
          animate="show"
          className="content"
        >
          <m.h1 variants={item}>Leading dental care</m.h1>
          <m.p variants={item}>for a healthier smile</m.p>
          <div className="Click_appointment">
            <ButtonAppointment CheckUserConnectedFunc={CheckUserConnected} />

            {/* show model popup Appointment */}
            <PopUpAppointment
              showModelAppointment={showShowTurn}
              closePopUpAppointment={() => handleCloseShowTurn()}
            />
          </div>
        </m.div>
      </div>

      {/* show all Category from json file */}
      <Category />
    </m.div>
  );
}


export default Home;