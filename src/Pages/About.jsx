import React from "react";
import "../css/About.css";
import InfoAbout from "../components/aboutClinic/InfoAbout.jsx";
import ShowCountInfoClinic from "../components/aboutClinic/counts/ShowCountInfoClinic.jsx";


function About() {
  
  return (
    <div className="InfoAboutClinic">

      {/* show info about clinic */}
      <InfoAbout />

      {/* show all count user more... clinic */}
      <ShowCountInfoClinic />

    </div>
  );
}


export default About;