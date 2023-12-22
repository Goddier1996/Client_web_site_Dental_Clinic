import "../css/home.css";
import React, { useState } from "react";
import Category from "../components/homeOptions/Category.jsx";
import { motion as m } from "framer-motion/dist/framer-motion";
import { container, item } from "../styleComponents/StyleAnimation";
import ButtonAppointment from "../components/homeOptions/ButtonAppointment.jsx";
import PopUpAppointment from "../components/homeOptions/PopUpAppointment.jsx";
import { CheckUserConnectedForAddTurn } from "../components/addAppointment/function/AddTurnFunctions.js";



function Home() {


  // show popup add , Appointment
  const [showModelAppointment, setShowModelAppointment] = useState(false);
  const handleShowModelAppointment = () => setShowModelAppointment(true);



  const CheckUserConnected = () => {
    CheckUserConnectedForAddTurn(() => handleShowModelAppointment());
  };



  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <div className="startImg">
        <m.div
          variants={container}
          initial="hidden"
          animate="show"
          className="content"
        >
          <m.h1 variants={item}>Welcome To</m.h1>
          <m.p variants={item}>Dental Care Clinic</m.p>
          <br />
        </m.div>
      </div>

      <div className="Click_appointment">
        <ButtonAppointment CheckUserConnectedFunc={CheckUserConnected} />

        {/* show model popup Appointment */}
        <PopUpAppointment
          showModelAppointment={showModelAppointment}
          closePopUpAppointment={() => setShowModelAppointment(false)}
        />
      </div>

      {/* show all Category from json file */}
      <Category />
    </m.div>
  );
}


export default Home;