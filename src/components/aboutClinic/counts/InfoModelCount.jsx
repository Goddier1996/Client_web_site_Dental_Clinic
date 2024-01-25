import React from "react";
import Spinner from "react-bootstrap/Spinner";
import  LazyLoadImg  from "../../tools/lazyLoad/LazyLoadImg";



const InfoModelCount = ({ type, count, img, loading }) => {


  let storedTheme = localStorage.getItem("theme");

  return (
    <div className="a-box">
      <div className="img">
        <div className="img-inner">
          <div className="inner-skew">
            <LazyLoadImg img={img} width="" height="140" alt="icon" />
          </div>
        </div>
      </div>

      <div
        className={
          storedTheme === "light"
            ? "textDark"
            : storedTheme === "dark"
            ? "text"
            : ""
        }
      >
        <h3>{type} :</h3>
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            variant="success"
          />
        ) : (
          <p>{count}</p>
        )}
      </div>
    </div>
  );
};


export default InfoModelCount;