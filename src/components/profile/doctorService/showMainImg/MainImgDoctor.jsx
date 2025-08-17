import React, { useEffect, useState } from "react";


const MainImgDoctor = () => {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://i.postimg.cc/sxgkDHm3/9498920-3135.jpg";
    img.onload = () => setLoaded(true);
  }, []);
    
  return (
    <div
      className="profile-header-cover"
      style={{
        backgroundImage: loaded
          ? `url(https://i.postimg.cc/sxgkDHm3/9498920-3135.jpg)`
          : ` url(https://i.postimg.cc/fbQ9hFkD/doctor-office.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: loaded ? "none" : "blur(20px)",
        transition: "filter 0.6s ease-out",
      }}
    ></div>
  );
};


export default MainImgDoctor;