import "../css/home.css";
import React from "react";
import Category from "../components/homeOptions/Category.jsx";
import { motion as m } from "framer-motion/dist/framer-motion";
import { container, item } from "../styleComponents/StyleAnimation";


function Home() {

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
          <m.h1 variants={item}>Leading dental care</m.h1>
          <m.p variants={item}>for a healthier smile</m.p>
          <br />
        </m.div>
      </div>

      {/* show all Category from json file */}
      <Category />
    </m.div>
  );
}


export default Home;