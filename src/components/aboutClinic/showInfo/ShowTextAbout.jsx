import React from "react";
import { motion as m } from "framer-motion/dist/framer-motion";
import { item } from "../../../styleComponents/StyleAnimation";


const ShowTextAbout = () => {

  return (
    <>
      <m.p variants={item}>
        Our clinic is the leading dental care provider in Kfar Yona.
      </m.p>
      <m.p variants={item}>
        The clinic boasts a convenient location and accessible contact
        information - <a href="/Location">See Location</a>
      </m.p>
      <m.p variants={item}>
        See reviews from our valued clients - <a href="/Service">Click here</a>
      </m.p>
      <m.p variants={item}>
        We deliver excellent customer service with a consistently positive
        attitude.
      </m.p>
      <m.p variants={item}>
        We manage all aspects of dental care. Learn more about our services. -{" "}
        <a href="/OurWork">Click Me</a>
      </m.p>
    </>
  );
};


export default ShowTextAbout;