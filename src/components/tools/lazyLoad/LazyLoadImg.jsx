import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


const LazyLoadImg = ({ type, img, width, height, alt }) => {

  return (
    <LazyLoadImage
      src={img}
      width={width ? width * 1 : ""}
      height={height ? height * 1 : ""}
      effect={type == "category" ? "" : "blur"}
      alt={alt}
    />
  );
};


export default LazyLoadImg;