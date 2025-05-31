import React from "react";


const MainTitleOurWork = () => {

  let storedTheme = localStorage.getItem("theme");

  return (
    <section
      className={
        storedTheme == "light"
          ? "services-headerDark"
          : storedTheme == "dark"
          ? "services-header"
          : ""
      }
    >
      <h1>Our Dental Services</h1>
      <p>
        Discover the full range of professional dental treatments we offer —
        from cleanings and cavity care to implants and orthodontics.
      </p>
    </section>
  );
};


export default MainTitleOurWork;