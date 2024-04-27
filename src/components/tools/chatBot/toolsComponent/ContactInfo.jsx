import React from "react";
import "../ChatBot.css";
import LazyLoadImg from "../../lazyLoad/LazyLoadImg";


const ContactInfo = () => {

  return (
    <div className="showContactInfo">
      <div style={{ marginBottom: "10px" }}>
        <LazyLoadImg
          type=""
          img="https://i.postimg.cc/BQ6m6MG7/pngwing-com-1.webp"
          width="120"
          height=""
          alt="contact"
        />
      </div>
      <p>
        {" "}
        Phone : +972 5489302343
        <br />
        Email : artium@gmail.com{" "}
      </p>
    </div>
  );
};


export default ContactInfo;