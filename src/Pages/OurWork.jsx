import React from "react";
import data from "../Json_date/date.json";
import "../css/ourWork.css";
import { Row } from "react-bootstrap";
import { motion as m } from "framer-motion/dist/framer-motion";
import ShowOurWorkClinic from "../components/ourWork/ShowOurWorkClinic.jsx";


//show data from json file our work this clinic
function ourWork() {

  let storedTheme = localStorage.getItem("theme");

    
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <div
        className={
          storedTheme == "light"
            ? "titleOurWorkDark"
            : storedTheme == "dark"
            ? "titleOurWork"
            : ""
        }
      >
        <br />
        <h1>Service We Perform at The Clinic</h1>
      </div>

      <div className="OurWorkLook">
        <Row xs={1} md={2} lg={3} style={{ width: "100%" }}>
          {data.work.map((record) => (
              <ShowOurWorkClinic key={record.id} infoOurWork={record} />
          ))}
        </Row>
      </div>
    </m.div>
  );
}


export default ourWork;