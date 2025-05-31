import React from "react";
import { motion as m } from "framer-motion/dist/framer-motion";
import { item } from "../../../styleComponents/StyleAnimation";

const ButtonAddNewReview = ({ CheckUserConnected }) => {

  let storedTheme = localStorage.getItem("theme");

  return (
    <div className="d-grid gap-2 addReviews">
      <m.button
        variant={
          storedTheme === "light"
            ? "warning"
            : storedTheme === "dark"
            ? "success"
            : ""
        }
        variants={item}
        size="sm"
        onClick={CheckUserConnected}
      >
        Add new Review
      </m.button>
    </div>
  );
};


export default ButtonAddNewReview;