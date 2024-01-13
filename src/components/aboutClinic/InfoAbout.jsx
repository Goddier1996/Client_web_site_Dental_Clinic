import React from "react";
import { container, item } from "../../styleComponents/StyleAnimation";
import { motion as m } from "framer-motion/dist/framer-motion";


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
        <h1>About Dental Care Clinic</h1>
        <m.p variants={item}>
          (1) This Clinic was Number one in Kfar-Yona City
        </m.p>
        <m.p variants={item}>
          (2) Have a Good Location Clinic and Contact -{" "}
          <a href="/Location">See Location</a>
        </m.p>
        <m.p variants={item}>
          (3) See Customer reviews - <a href="/Service">See Review's</a>
        </m.p>
        <m.p variants={item}>
          (4) We provide excellent customer service and also a good attitude
          towards our customers
        </m.p>
        <m.p variants={item}>
          (5) We handle every area related to dental care , Read more about our
          service - <a href="/OurWork">Click Me</a>
        </m.p>
      </m.div>
  );
};


export default InfoAbout;