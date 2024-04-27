import React from "react";
import "../ChatBot.css";
import LazyLoadImg from "../../lazyLoad/LazyLoadImg";


const InfoHowCreateSite = () => {

  return (
    <div className="showContactInfo">
      <div style={{ marginBottom: "10px" }}>
        <LazyLoadImg
          type=""
          img="https://i.postimg.cc/xdYHk1zj/pngwing-com-3.webp"
          width="120"
          height=""
          alt="info"
        />
      </div>
      <p>Artem Kot</p>
      <p>Artem developer and style this website.</p>
      <a href="https://portfolio-artem-kot.vercel.app/">Click visit website</a>
    </div>
  );
};


export default InfoHowCreateSite;