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
        <h1>About Our Dental Clinic</h1>
        <m.p variants={item}>
          (1) This clinic is number one in Kfar-Yona.
        </m.p>
        <m.p variants={item}>
          (2) The clinic has a great location and contact information -{" "}
          <a href="/Location">See Location</a>
        </m.p>
        <m.p variants={item}>
          (3) See the customer reviews - <a href="/Service">See</a>
        </m.p>
        <m.p variants={item}>
          (4) We provide excellent customer service and maintain a positive attitude towards our customers.
        </m.p>
        <m.p variants={item}>
          (5) We handle all aspects of dental care. Read more about our services - <a href="/OurWork">Click Me</a>
        </m.p>
      </m.div>
  );
};


export default InfoAbout;