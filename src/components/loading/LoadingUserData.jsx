import React from "react";
import  LazyLoadImg  from "../tools/lazyLoad/LazyLoadImg";


const LoadingUserData = () => {

  return (
    <div className="loadingProfileData">
      <LazyLoadImg
        type=""
        img="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!f305cw"
        width=""
        height="60"
        alt="loading"
      />
    </div>
  );
};


export default LoadingUserData;