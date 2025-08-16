import React, { useEffect, useState } from "react";
import "../css/register.css";
import { motion as m } from "framer-motion/dist/framer-motion";
import UserRegister from "../components/register/UserRegister.jsx";

function Register() {


  let storedTheme = localStorage.getItem("theme");

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://i.postimg.cc/DzMNdwky/55.jpg";
    img.onload = () => setLoaded(true);
  }, []);

    
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <section className="banner1">
        <div
          className={
            storedTheme == "light"
              ? "box1 contect1Dark"
              : storedTheme == "dark"
              ? "box1 contect1"
              : ""
          }
        >
          <div
            className={
              storedTheme == "light"
                ? "log1Dark"
                : storedTheme == "dark"
                ? "log1"
                : ""
            }
          >
            <UserRegister />
          </div>
        </div>

        {/* show main img register page */}
        <div
          className="box1 image1"
          style={{
            backgroundImage: loaded
                  ? `url(https://i.postimg.cc/DzMNdwky/55.jpg)` :
               ` url(https://i.postimg.cc/027GcQD2/main-home-img.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: loaded ? "none" : "blur(20px)",
            transition: "filter 0.6s ease-out",
          }}
        ></div>
      </section>
    </m.div>
  );
}


export default Register;