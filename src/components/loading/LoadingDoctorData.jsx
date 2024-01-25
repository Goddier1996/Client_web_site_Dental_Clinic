import React from "react";
import  LazyLoadImg  from "../tools/lazyLoad/LazyLoadImg";


const LoadingDoctorData = () => {

  return (
    <div className="loadingReview">
      <LazyLoadImg
        type=""
        img="https://i.postimg.cc/pLT9cd9Z/12.png"
        width=""
        height="170"
        alt="loading"
      />
    </div>
  );
};


export default LoadingDoctorData;