import React from "react";


const MainTitleReviews = () => {

  let storedTheme = localStorage.getItem("theme");

  return (
    <section
      className={
        storedTheme === "light"
          ? "reviews-headerDark"
          : storedTheme === "dark"
          ? "reviews-header"
          : ""
      }
    >
      <h1>What Our Patients Say</h1>
      <p>
        See what real patients think about their experience at our dental
        clinic.
      </p>
    </section>
  );
};


export default MainTitleReviews;