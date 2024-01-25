import React from "react";
import  LazyLoadImg  from "../tools/lazyLoad/LazyLoadImg";


const LoadingReview = () => {

  return (
    <div className="loadingReview">
      <LazyLoadImg
        type=""
        img="https://media3.giphy.com/media/lMl2tZmYHhrJHvY4rP/200w.gif?cid=82a1493bv5vympwzpd0gt9did8lb8r9vlei1poc0gx1gw4zx&rid=200w.gif&ct=s"
        width=""
        height="170"
        alt="loading"
      />
    </div>
  );
};


export default LoadingReview;