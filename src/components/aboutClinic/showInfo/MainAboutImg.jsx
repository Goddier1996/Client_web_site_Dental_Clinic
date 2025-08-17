import React, { useEffect, useState } from "react";


const MainAboutImg = () => {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://i.postimg.cc/jSfqHBh2/about-imgg.jpg";
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <div className="placeImgAbout">
      <div
        className="imgAbout"
        style={{
          backgroundImage: loaded
            ? `url(https://i.postimg.cc/jSfqHBh2/about-imgg.jpg)`
            : ` url(https://i.postimg.cc/xTRd5BWq/about-img.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: loaded ? "none" : "blur(20px)",
          transition: "filter 0.6s ease-out",
        }}
      ></div>
    </div>
  );
};


export default MainAboutImg;