import React from "react";
import { container } from "../../styleComponents/StyleAnimation";
import { motion as m } from "framer-motion/dist/framer-motion";
import MainAboutImg from "./showInfo/MainAboutImg";
import ShowTextAbout from "./showInfo/ShowTextAbout";


const InfoAbout = () => {

  let storedTheme = localStorage.getItem("theme");

  return (
    <m.div
      variants={container}
      initial="hidden"
      animate="show"
      className={
        storedTheme === "light"
          ? "titleAboutDark"
          : storedTheme === "dark"
          ? "titleAbout"
          : ""
      }
    >
      {/* component show main img */}
      <MainAboutImg />

      {/* component show text about clinic */}
      <ShowTextAbout />
    </m.div>
  );
};


export default InfoAbout;